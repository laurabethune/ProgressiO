// Récupérer l’ID du Google Sheets
const sheetID = "1ABC123XYZ456"; // Remplace par ton vrai ID Google Sheets
const sheetName = "Feuille1"; 

// URL de l'API Google Sheets
const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&sheet=${sheetName}`;

// Récupérer le nom de l’élève depuis l’URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get("name");

document.getElementById("student-name").innerText = studentName;

// Fonction pour charger les compétences d’un élève
async function loadStudentData() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const jsonData = JSON.parse(text.substr(47).slice(0, -2)); // Convertit en JSON

        let studentData = document.getElementById("student-data");
        studentData.innerHTML = ""; // Efface l’ancien contenu

        jsonData.table.rows.forEach(row => {
            if (row.c[0]?.v === studentName) { // Vérifie si c’est l’élève sélectionné
                studentData.innerHTML = `<table border="1">
                    <tr><th>Compétence 1</th><th>Compétence 2</th><th>Compétence 3</th><th>Badges</th></tr>
                    <tr>
                        <td>${row.c[1]?.v || "❌"}</td>
                        <td>${row.c[2]?.v || "❌"}</td>
                        <td>${row.c[3]?.v || "❌"}</td>
                        <td>${row.c[4]?.v || "-"}</td>
                    </tr>
                </table>`;
            }
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Charger les compétences de l’élève au démarrage
loadStudentData();
