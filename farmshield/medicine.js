// ===============================
// FarmShield AI - Medicine Management
// ===============================

let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// Elements
const form = document.getElementById("medicineForm");
const showForm = document.getElementById("showForm");
const saveMedicine = document.getElementById("saveMedicine");

// Show/Hide Form
showForm.onclick = function () {
    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
};

// Save Medicine
saveMedicine.onclick = function () {

    let animalID = document.getElementById("animalID").value;
    let animalType = document.getElementById("animalType").value;
    let medicineName = document.getElementById("medicineName").value;
    let category = document.getElementById("category").value;
    let dosage = document.getElementById("dosage").value;
    let date = document.getElementById("date").value;
    let withdrawal = document.getElementById("withdrawal").value;
    let givenBy = document.getElementById("givenBy").value;

    if (
        animalID === "" ||
        medicineName === "" ||
        dosage === "" ||
        date === "" ||
        givenBy === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    medicines.push({
        animalID,
        animalType,
        medicineName,
        category,
        dosage,
        date,
        withdrawal,
        givenBy,
        status: "Given"
    });

    localStorage.setItem("medicines", JSON.stringify(medicines));

    displayMedicines();

    form.reset();

    form.style.display = "none";

    alert("Medicine Record Saved!");
};

// Display Table
function displayMedicines(list = medicines) {

    let table = document.getElementById("medicineTable");

    table.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Animal ID</th>
        <th>Animal</th>
        <th>Medicine</th>
        <th>Category</th>
        <th>Dosage</th>
        <th>Date</th>
        <th>Withdrawal</th>
        <th>Given By</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    `;

    let antibiotics = 0;
    let vaccines = 0;
    let vitamins = 0;
    let dewormers = 0;

    list.forEach((m, index) => {

        if (m.category === "Antibiotic") antibiotics++;
        if (m.category === "Vaccine") vaccines++;
        if (m.category === "Vitamin") vitamins++;
        if (m.category === "Dewormer") dewormers++;

        table.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${m.animalID}</td>

            <td>${m.animalType}</td>

            <td>${m.medicineName}</td>

            <td>${m.category}</td>

            <td>${m.dosage}</td>

            <td>${m.date}</td>

            <td>${m.withdrawal} Days</td>

            <td>${m.givenBy}</td>

            <td>${m.status}</td>

            <td>

            <button class="deleteBtn"
            onclick="deleteMedicine(${index})">

            Delete

            </button>

            </td>

        </tr>
        `;
    });

    // Dashboard Cards
    document.getElementById("totalMedicine").innerHTML = medicines.length;
    document.getElementById("antibioticCount").innerHTML = antibiotics;
    document.getElementById("vaccineCount").innerHTML = vaccines;

    let compliance = document.getElementById("compliance");

    if (antibiotics <= 5) {
        compliance.innerHTML = "🟢 Good";
        compliance.className = "good";
    } else if (antibiotics <= 10) {
        compliance.innerHTML = "🟡 Moderate";
        compliance.className = "warning";
    } else {
        compliance.innerHTML = "🔴 High Risk";
        compliance.className = "danger";
    }

    updateAlerts(antibiotics, vaccines, vitamins, dewormers);
}

// Delete
function deleteMedicine(index) {

    if (confirm("Delete this record?")) {

        medicines.splice(index, 1);

        localStorage.setItem(
            "medicines",
            JSON.stringify(medicines)
        );

        displayMedicines();
    }
}

// Search
document.getElementById("searchMedicine").addEventListener("keyup", function () {

    let text = this.value.toLowerCase();

    let filtered = medicines.filter(m =>

        m.medicineName.toLowerCase().includes(text) ||

        m.animalType.toLowerCase().includes(text) ||

        m.category.toLowerCase().includes(text) ||

        m.animalID.toLowerCase().includes(text)

    );

    displayMedicines(filtered);

});

// Filter
document.getElementById("filterCategory").addEventListener("change", function () {

    let value = this.value;

    if (value === "All") {

        displayMedicines();

    } else {

        let filtered = medicines.filter(m => m.category === value);

        displayMedicines(filtered);

    }

});

// Alerts
function updateAlerts(antibiotics, vaccines, vitamins, dewormers) {

    let alerts = document.getElementById("alerts");

    alerts.innerHTML = "";

    if (antibiotics > 10) {

        alerts.innerHTML +=
        "<li>🔴 High Antibiotic Usage Detected</li>";

    }

    if (vaccines < 2) {

        alerts.innerHTML +=
        "<li>🟡 Vaccination Coverage is Low</li>";

    }

    if (medicines.length === 0) {

        alerts.innerHTML +=
        "<li>⚠ No Medicine Records Found</li>";

    }

    if (alerts.innerHTML === "") {

        alerts.innerHTML =
        "<li>🟢 All Medicine Records are Compliant</li>";

    }

}

// Load when page opens
displayMedicines();