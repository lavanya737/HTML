// ======================================
// FarmShield AI Dashboard
// ======================================

// Read data from localStorage

let animals = JSON.parse(localStorage.getItem("animals")) || [];
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let riskHistory = JSON.parse(localStorage.getItem("riskHistory")) || [];

// ---------- TOP CARDS ----------

// Total Animals
document.getElementById("totalAnimals").innerHTML = animals.length;

// Total Medicines
document.getElementById("totalMedicines").innerHTML = medicines.length;

// Total Risk Assessments
document.getElementById("totalRisk").innerHTML = riskHistory.length;

// ---------- HEALTHY / SICK ----------

let healthy = 0;
let sick = 0;

animals.forEach(animal => {

    let status = "";

    if(animal.health){
        status = animal.health.toLowerCase();
    }

    if(status === "healthy"){
        healthy++;
    }
    else if(status === "sick"){
        sick++;
    }

});

document.getElementById("healthyAnimals").innerHTML = healthy;
document.getElementById("sickAnimals").innerHTML = sick;

// ---------- ANTIBIOTICS ----------

let antibioticCount = medicines.filter(m =>
    m.category &&
    m.category.toLowerCase() === "antibiotic"
).length;

document.getElementById("antibioticCount").innerHTML = antibioticCount;

// ---------- COMPLIANCE ----------

let compliance = document.getElementById("complianceStatus");

if(antibioticCount <= 5){

    compliance.innerHTML = "🟢 Good";
    compliance.className = "good";

}
else if(antibioticCount <= 10){

    compliance.innerHTML = "🟡 Moderate";
    compliance.className = "warning";

}
else{

    compliance.innerHTML = "🔴 High Risk";
    compliance.className = "danger";

}

// ---------- RECENT ALERTS ----------

let alertBox = document.getElementById("dashboardAlerts");

alertBox.innerHTML = "";

let totalAlerts = 0;

function addAlert(message){

    alertBox.innerHTML += "<li>" + message + "</li>";
    totalAlerts++;

}

// Animal Alerts

if(animals.length === 0){

    addAlert("🔴 No animals registered.");

}

if(sick > 0){

    addAlert("🟡 " + sick + " sick animal(s) require attention.");

}

// Medicine Alerts

if(medicines.length === 0){

    addAlert("🟡 No medicine records found.");

}

if(antibioticCount > 10){

    addAlert("🔴 High antibiotic usage detected.");

}

// Risk Alerts

if(riskHistory.length === 0){

    addAlert("🟡 No risk assessment completed.");

}
else{

    let latest = riskHistory[riskHistory.length - 1];

    if(latest.score >= 80){

        addAlert("🟢 Farm biosecurity is satisfactory.");

    }
    else if(latest.score >= 50){

        addAlert("🟡 Biosecurity needs improvement.");

    }
    else{

        addAlert("🔴 High disease risk detected.");

    }

}

if(totalAlerts === 0){

    addAlert("🟢 Farm is operating normally.");

}

document.getElementById("totalAlerts").innerHTML = totalAlerts;

// ---------- MEDICINE TABLE ----------

let medicineTable = document.getElementById("medicineTable");

// Show latest 5 records

let latestMedicines = medicines.slice(-5).reverse();

latestMedicines.forEach(m => {

    medicineTable.innerHTML += `

<tr>

<td>${m.animal || "-"}</td>

<td>${m.medicine || "-"}</td>

<td>${m.category || "-"}</td>

<td>${m.date || "-"}</td>

</tr>

`;

});

// ---------- LATEST RISK ----------

if(riskHistory.length > 0){

    let latest = riskHistory[riskHistory.length - 1];

    document.getElementById("latestDate").innerHTML = latest.date;
    document.getElementById("latestFarmer").innerHTML = latest.farmer;
    document.getElementById("latestFarm").innerHTML = latest.farm;
    document.getElementById("latestScore").innerHTML = latest.score + "%";
    document.getElementById("latestRisk").innerHTML = latest.risk;

}
const ctx = document.getElementById("animalChart");

new Chart(ctx, {

type: "pie",

data: {

labels: ["Healthy", "Sick"],

datasets: [{

data: [healthy, sick],

backgroundColor: [

"#4CAF50",

"#F44336"

]

}]

}

});