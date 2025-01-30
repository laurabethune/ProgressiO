console.log("🔄 Chargement du script eleve.js...");

// 🔹 Récupération du nom de l'élève dans l'URL
const urlParams = new URLSearchParams(window.location.search);

console.log("👤 Nom de l'élève sélectionné :", studentName);
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 Définition de l'URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";

// 🔹 Fonction pour récupérer les données du Google Sheets
async function fetchCompetences() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        
        // Nettoyage du JSON pour obtenir un objet exploitable
        const jsonData = JSON.parse(text.substring(47, text.length - 2));
        const rows = jsonData.table.rows;

        console.log("📊 Données des compétences :", rows);

        // Récupération des en-têtes (noms des élèves)
        const headers = jsonData.table.cols.map(col => col.label);
        console.log("📝 En-têtes des colonnes :", headers);

        // Trouver l'index de la colonne de l'élève sélectionné
        const studentIndex = headers.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn(`⚠️ Élève ${studentName} non trouvé dans la feuille Compétences !`);
            document.getElementById("student-data").innerHTML = `<p>⚠️ Impossible de trouver l'élève ${studentName}.</p>`;
            return;
        }

        // Générer le tableau des compétences avec les niveaux
        let tableHTML = "<table border='1'><tr><th>Compétence</th><th>Niveau</th></tr>";
        rows.forEach(row => {
            const competence = row.c[0]?.v || "❌ Erreur"; // Colonne A = compétence
            const niveau = row.c[studentIndex]?.v || "Non évalué"; // Colonne correspondante à l'élève
            tableHTML += `<tr><td>${competence}</td><td>${niveau}</td></tr>`;
        });
        tableHTML += "</table>";

        // Affichage
        document.getElementById("student-data").innerHTML = tableHTML;

    } catch (error) {
        console.error("❌ Erreur lors du chargement des compétences :", error);
        document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
    }
}

// 🔹 Exécution de la fonction
fetchCompetences();
