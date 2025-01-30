console.log("📌 Chargement du script eleve.js...");

// 🔹 Récupérer le nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("👤 Élève sélectionné :", studentName);

if (!studentName) {
    console.error("❌ Aucun élève sélectionné !");
    document.getElementById("student-name").innerText = "Aucun élève sélectionné.";
} else {
    document.getElementById("student-name").innerText = studentName;
}

// 🔹 Remplace ici par TON ID de Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";

async function fetchStudentData() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        
        let data = json.table.rows;
        let studentDataDiv = document.getElementById("student-data");

        let studentIndex = json.table.cols.findIndex(col => col.label === studentName);

        if (studentIndex === -1) {
            console.warn("⚠️ Élève non trouvé :", studentName);
            studentDataDiv.innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom : <strong>${studentName}</strong></p>`;
            return;
        }

        // 🔹 Construire le tableau des compétences
        let tableHTML = "<table border='1'><tr><th>Compétence</th><th>Niveau</th></tr>";

        data.forEach(row => {
            let competence = row.c[0]?.v || "Inconnue";
            let niveau = row.c[studentIndex]?.v || "Non évalué";
            tableHTML += `<tr><td>${competence}</td><td>${niveau}</td></tr>`;
        });

        tableHTML += "</table>";
        studentDataDiv.innerHTML = tableHTML;

    } catch (error) {
        console.error("❌ Erreur lors du chargement des données :", error);
        document.getElementById("student-data").innerHTML = "<p>Erreur de chargement des données.</p>";
    }
}

// Charger les données de l'élève au démarrage
fetchStudentData();
