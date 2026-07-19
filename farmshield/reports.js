// =======================================
// FarmShield AI - Reports Page
// =======================================

// Read Data

let animals = JSON.parse(localStorage.getItem("animals")) || [];
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let riskHistory = JSON.parse(localStorage.getItem("riskHistory")) || [];

// -------------------------
// Summary Cards
// -------------------------

document.getElementById("reportAnimals").innerHTML = animals.length;
document.getElementById("reportMedicines").innerHTML = medicines.length;
document.getElementById("reportRisk").innerHTML = riskHistory.length;

// -------------------------
// Healthy & Sick Animals
// -------------------------

let healthy = 0;
let sick = 0;

animals.forEach(animal => {

    if(animal.health){

        if(animal.health.toLowerCase()=="healthy")
            healthy++;

        else if(animal.health.toLowerCase()=="sick")
            sick++;
    }

});

document.getElementById("healthyCount").innerHTML = healthy;
document.getElementById("sickCount").innerHTML = sick;

// -------------------------
// Antibiotic Records
// -------------------------

let antibiotics = medicines.filter(m =>
m.category &&
m.category.toLowerCase()=="antibiotic"
).length;

document.getElementById("antibioticRecords").innerHTML = antibiotics;

// -------------------------
// Compliance Status
// -------------------------

let compliance = "";

if(antibiotics<=5){

    compliance="🟢 Good";

}
else if(antibiotics<=10){

    compliance="🟡 Moderate";

}
else{

    compliance="🔴 High Risk";

}

document.getElementById("reportCompliance").innerHTML = compliance;

// -------------------------
// Latest Risk Assessment
// -------------------------

if(riskHistory.length>0){

    let latest=riskHistory[riskHistory.length-1];

    document.getElementById("latestRiskScore").innerHTML=
    latest.score+"%";

    document.getElementById("latestRiskLevel").innerHTML=
    latest.risk;

}

// -------------------------
// Recent Medicines
// -------------------------

let medicineTable=document.getElementById("reportMedicineTable");

let latestMedicines=medicines.slice(-5).reverse();

latestMedicines.forEach(m=>{

medicineTable.innerHTML+=`

<tr>

<td>${m.animal||"-"}</td>

<td>${m.medicine||"-"}</td>

<td>${m.category||"-"}</td>

<td>${m.date||"-"}</td>

</tr>

`;

});

// -------------------------
// Recent Risk Assessments
// -------------------------

let riskTable=document.getElementById("riskReportTable");

let latestRisks=riskHistory.slice(-5).reverse();

latestRisks.forEach(r=>{

riskTable.innerHTML+=`

<tr>

<td>${r.date}</td>

<td>${r.farmer}</td>

<td>${r.farm}</td>

<td>${r.score}%</td>

<td>${r.risk}</td>

</tr>

`;

});

// -------------------------
// Overall Farm Status
// -------------------------

let status=document.getElementById("overallStatus");

if(animals.length==0){

status.innerHTML=
"🔴 No animals have been registered.";

}

else if(riskHistory.length==0){

status.innerHTML=
"🟡 Risk assessment has not been completed yet.";

}

else{

let latest=riskHistory[riskHistory.length-1];

if(latest.score>=80){

status.innerHTML=
"🟢 Farm is operating normally. Biosecurity measures are effective and disease risk is low.";

}

else if(latest.score>=50){

status.innerHTML=
"🟡 Farm is operating with moderate biosecurity. Improve hygiene, vaccination, and quarantine practices.";

}

else{

status.innerHTML=
"🔴 Farm is at HIGH RISK. Immediate action is required. Improve biosecurity, isolate sick animals, and consult a veterinarian.";

}

}