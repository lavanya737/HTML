// ===================================
// FarmShield AI - Animals Page
// ===================================

// Load saved animals
let animals = JSON.parse(localStorage.getItem("animals")) || [];
let editIndex = -1;

// Show Add Animal Form
document.getElementById("addAnimal").onclick = function () {
    document.getElementById("animalForm").style.display = "block";
};

// Save Animal
document.getElementById("saveAnimal").onclick = function () {

    let type = document.getElementById("animalType").value;
    let breed = document.getElementById("breed").value;
    let age = document.getElementById("age").value;
    let health = document.getElementById("health").value;

    if (breed.trim() === "" || age.trim() === "") {
        alert("Please fill all fields!");
        return;
    }

    let animal = {
        animal: type,
        breed: breed,
        age: age,
        health: health
    };

    // Add or Update
    if (editIndex === -1) {
        animals.push(animal);
    } else {
        animals[editIndex] = animal;
        editIndex = -1;
    }

    // Save
    localStorage.setItem("animals", JSON.stringify(animals));

    // Refresh table
    displayAnimals();

    // Reset Form
    document.getElementById("animalType").value = "Chicken";
    document.getElementById("breed").value = "";
    document.getElementById("age").value = "";
    document.getElementById("health").value = "Healthy";

    document.getElementById("animalForm").style.display = "none";

    alert("Animal Saved Successfully!");
};

// Display Animals
function displayAnimals() {

    let table = document.getElementById("animalTable");

    table.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Animal</th>
        <th>Breed</th>
        <th>Age</th>
        <th>Health</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    `;

    animals.forEach((animal, index) => {

        table.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${animal.animal}</td>

            <td>${animal.breed}</td>

            <td>${animal.age}</td>

            <td>${animal.health}</td>

            <td>✔ Active</td>

            <td>

                <button onclick="editAnimal(${index})">✏ Edit</button>

                <button onclick="deleteAnimal(${index})">🗑 Delete</button>

            </td>

        </tr>
        `;

    });

}

// Edit Animal
function editAnimal(index){

    editIndex = index;

    document.getElementById("animalType").value = animals[index].animal;
    document.getElementById("breed").value = animals[index].breed;
    document.getElementById("age").value = animals[index].age;
    document.getElementById("health").value = animals[index].health;

    document.getElementById("animalForm").style.display = "block";

}

// Delete Animal
function deleteAnimal(index){

    let confirmDelete = confirm("Are you sure you want to delete this animal?");

    if(confirmDelete){

        animals.splice(index,1);

        localStorage.setItem("animals",JSON.stringify(animals));

        displayAnimals();

        alert("Animal Deleted Successfully!");

    }

}

// Load animals when page opens
displayAnimals();