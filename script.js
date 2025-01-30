// Remplace ceci par ton ID Google Sheets
const sheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg"; // Mets ici ton vrai ID Google Sheets
const sheetName = "Feuille1"; 

// URL de l'API Google Sheets
const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&sheet=${sheetName}`;

// Fonction pour récupérer la liste des élèves et l'afficher
async function loadStudentsList() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const jsonData = JSON.parse(text.substr(47).slice(0, -2)); // Convertit en JSON

        let studentsList = document.getElementById("students-list");
        studentsList.innerHTML = ""; // Vide la liste avant de la remplir

        jsonData.table.rows.forEach(row => {
            let studentName = row.c[0]?.v || "Inconnu"; // Récupère le nom de l'élève
            let listItem = document.createElement("li");
            listItem.innerHTML = `<a href="eleve.html?name=${encodeURIComponent(studentName)}">${studentName}</a>`;
            studentsList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Charger la liste des élèves au démarrage
loadStudentsList();
