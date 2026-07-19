// ===================================
// FarmShield AI - Alerts Page
// ===================================

// Load stored data
let animals = JSON.parse(localStorage.getItem("animals")) || [];
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let riskHistory = JSON.parse(localStorage.getItem("riskHistory")) || [];

let alerts = [];
let recommendations = [];

// ---------- Animal Alerts ----------

// ---------- Animal Alerts ----------

if (animals.length === 0) {

    alerts.push({
        priority: "🔴 Critical",
        status: "Active",
        message: "No animals are registered."
    });

    recommendations.push("Register animals first.");

}
else{

    let sickAnimals = animals.filter(a => a.health === "Sick").length;

    if(sickAnimals > 0){

        alerts.push({

            priority:"🔴 Critical",

            status:"Active",

            message:sickAnimals + " sick animal(s) detected."

        });

        recommendations.push(
        "Immediately isolate sick animals and consult a veterinarian."
        );

    }

}

// ---------- Medicine Alerts ----------

if (medicines.length === 0) {

    alerts.push({
        priority: "🟡 Warning",
        status: "Pending",
        message: "No medicine records available."
    });

    recommendations.push("Record medicines administered to animals.");
}

// Count Medicines

let antibiotics =
medicines.filter(m=>m.category=="Antibiotic").length;

// Vaccines
let vaccines = medicines.filter(m => m.category === "Vaccine").length;

let vitamins =
medicines.filter(m=>m.category=="Vitamin").length;

let dewormers =
    medicines.filter(m => m.category == "Dewormer").length;
if (antibiotics > 10) {

    alerts.push({
        priority: "🔴 Critical",
        status: "Active",
        message: "High antibiotic usage detected."
    });

    recommendations.push(
        "Reduce unnecessary antibiotic usage."
    );

}


// ---------- Risk Assessment ----------

if (riskHistory.length === 0) {

    alerts.push({
        priority: "🟡 Warning",
        status: "Pending",
        message: "No biosecurity assessment completed."
    });

    recommendations.push("Complete a risk assessment.");
}
else{

    let latest = riskHistory[riskHistory.length - 1];

    if (latest.score < 50) {

        alerts.push({
            priority: "🔴 Critical",
            status: "Active",
            message: "High disease risk detected."
        });

        recommendations.push("Improve farm hygiene and isolate sick animals.");

    }

    else if (latest.score < 80) {

        alerts.push({
            priority: "🟡 Warning",
            status: "Pending",
            message: "Biosecurity needs improvement."
        });

        recommendations.push("Improve quarantine and sanitation.");

    }

    else {

        alerts.push({
            priority: "🟢 Normal",
            status: "Resolved",
            message: "Farm biosecurity is satisfactory."
        });

    }

}

// ---------- If everything is good ----------

sickAnimals = animals.filter(a=>a.health=="Sick").length;

if(
animals.length>0 &&
medicines.length>0 &&
riskHistory.length>0 &&
antibiotics<=10 &&
sickAnimals==0
) {

    alerts.push({

        priority: "🟢 Normal",

        status: "Resolved",

        message: "Farm is operating normally."

    });

}

// ---------- Fill Table ----------

let table = document.getElementById("alertTable");

let critical = 0;
let warning = 0;
let normal = 0;

alerts.forEach(alert => {

    if (alert.priority.includes("Critical")) critical++;
    if (alert.priority.includes("Warning")) warning++;
    if (alert.priority.includes("Normal")) normal++;

    let statusClass = "";

    if (alert.status === "Active")
        statusClass = "active";

    if (alert.status === "Pending")
        statusClass = "pending";

    if (alert.status === "Resolved")
        statusClass = "resolved";

    table.innerHTML += `

<tr>

<td>${alert.priority}</td>

<td>${alert.message}</td>

<td><span class="${statusClass}">${alert.status}</span></td>

<td>${new Date().toLocaleString()}</td>

</tr>

`;

});

// ---------- Cards ----------

document.getElementById("totalAlerts").innerHTML = alerts.length;

document.getElementById("criticalAlerts").innerHTML = critical;

document.getElementById("warningAlerts").innerHTML = warning;

document.getElementById("normalAlerts").innerHTML = normal;

// ---------- Recommendations ----------

let list = document.getElementById("recommendationList");

list.innerHTML = "";

if (recommendations.length === 0) {

    list.innerHTML =
    "<li>✅ Excellent! No recommendations at this time.</li>";

}
else{

    recommendations.forEach(item => {

        list.innerHTML += `<li>${item}</li>`;

    });

}
