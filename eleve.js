console.log("Chargement du script eleve.js...");

// 🔹 Récupération du nom de l'élève dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); // Ex: "Alex"

console.log("Nom de l'élève sélectionné :", studentName);

// Vérifier si un nom d'élève est bien trouvé
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
    document.getElementById("student-data").innerHTML = `<p>❌ Aucun élève sélectionné.</p>`;
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 URL de l'API Google Sheets
const SHEET_ID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg";  // Remplace par TON ID
const API_URL_COMPETENCES = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq=SELECT *&sheet=Compétences`;

// Fonction pour récupérer les compétences
async function fetchCompetences() {
    try {
        const response = await fetch(API_URL_COMPETENCES);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47, text.length - 2));

        const table = jsonData.table.cols.map(col => col.label);
        const rows = jsonData.table.rows.map(row => row.c.map(cell => cell ? cell.v : ""));

        console.log("Données des compétences :", rows);

        // 🔹 Trouver la colonne de l'élève
        const studentIndex = table.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn("⚠️ Élève non trouvé dans la feuille Compétences !");
            document.getElementById("student-data").innerHTML = `<p>⚠️ Aucune donnée trouvée pour ${studentName}.</p>`;
            return;
        }

        // 🔹 Générer le tableau des compétences
        let tableHTML = `<table border="1"><tr><th>Compétence</th><th>Niveau</th></tr>`;
        rows.forEach(row => {
            if (row[0]) {
                let niveau = row[studentIndex] || "Non évalué";
                let couleur = getCouleurNiveau(niveau);
                tableHTML += `<tr><td>${row[0]}</td><td style="background-color:${couleur};">${niveau}</td></tr>`;
            }
        });
        tableHTML += `</table>`;
        document.getElementById("student-data").innerHTML = tableHTML;

    } catch (error) {
        console.error("❌ Erreur lors du chargement des compétences :", error);
        document.getElementById("student-data").innerHTML = `<p>❌ Impossible de charger les compétences.</p>`;
    }
}

// 🔹 Fonction pour assigner des couleurs aux niveaux
function getCouleurNiveau(niveau) {
    switch (niveau.toLowerCase()) {
        case "expert": return "#4CAF50";  // Vert
        case "averti": return "#2196F3";  // Bleu
        case "débrouillé": return "#FFC107";  // Jaune
        case "novice": return "#F44336";  // Rouge
        default: return "#E0E0E0";  // Gris
    }
}

// 🔹 Charger les données
fetchCompetences();
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        console.log("Données brutes reçues :", data); // 🔍 Vérifier si les données contiennent les élèves
    });

