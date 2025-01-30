console.log("🚀 Chargement du script eleve.js...");

// Récupérer le nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("🧑‍🎓 Élève détecté :", studentName);

if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
    document.getElementById("student-data").innerHTML = "<p>⚠️ Aucun élève sélectionné.</p>";
}

// URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";
console.log("🌐 API URL :", apiURL);

fetch(apiURL)
    .then(response => response.text())
    .then(dataText => {
        const jsonData = JSON.parse(dataText.substring(47).slice(0, -2)); // Nettoyage du JSON Google Sheets
        console.log("📊 Données reçues :", jsonData);

        if (!jsonData.table.cols || jsonData.table.cols.length === 0 || !jsonData.table.rows) {
            console.warn("⚠️ Aucune donnée trouvée !");
            document.getElementById("student-data").innerHTML = "<p>⚠️ Aucun élève trouvé.</p>";
            return;
        }

        // Récupérer les en-têtes (titres des colonnes)
        const headers = jsonData.table.cols.map(col => col.label.trim());
        console.log("📋 En-têtes détectées :", headers);

        // Trouver la colonne de l'élève sélectionné
        const studentIndex = headers.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn("⚠️ Élève non trouvé dans la feuille !");
            document.getElementById("student-data").innerHTML = `<p>⚠️ Élève '${studentName}' non trouvé.</p>`;
            return;
        }

        // Construire le tableau des compétences
        let tableHTML = "<table border='1'><tr><th>Compétence</th><th>Niveau</th></tr>";
        jsonData.table.rows.forEach(row => {
            const competence = row.c[0] ? row.c[0].v : "Inconnu"; // Colonne 1 = Compétence
            const niveau = row.c[studentIndex] ? row.c[studentIndex].v : "Non évalué"; // Colonne élève
            tableHTML += `<tr><td>${competence}</td><td>${niveau}</td></tr>`;
        });
        tableHTML += "</table>";

        document.getElementById("student-data").innerHTML = tableHTML;
        document.getElementById("student-name").textContent = studentName;
    })
    .catch(error => {
        console.error("❌ Erreur lors de la récupération des données :", error);
        document.getElementById("student-data").innerHTML = "<p>❌ Erreur lors du chargement des compétences.</p>";
    });

