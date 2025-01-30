console.log("🚀 Chargement du script eleve.js...");

// 🔹 Récupération du nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("🧑‍🎓 Nom de l'élève sélectionné :", studentName);

if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
    document.getElementById("student-data").innerHTML = "<p>⚠️ Aucun élève trouvé dans l'URL !</p>";
    return;
}

// 🔹 URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";

console.log("🌐 API URL :", apiURL);

// 🔹 Récupération des données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(dataText => {
        const jsonData = JSON.parse(dataText.substring(47).slice(0, -2)); // Nettoyage du JSON Google Sheets

        console.log("🛠️ Données JSON brutes :", jsonData);

        // Vérifier que le tableau contient bien des données
        if (!jsonData.table.rows || jsonData.table.rows.length === 0) {
            console.warn("⚠️ Aucune donnée trouvée dans la feuille !");
            document.getElementById("student-data").innerHTML = "<p>⚠️ Aucune donnée trouvée dans la feuille !</p>";
            return;
        }

        // 🔹 Extraction des en-têtes (la première ligne)
        const headers = jsonData.table.cols.map(col => col.label.trim());
        console.log("📊 En-têtes récupérées :", headers);

        // Trouver l'index de l'élève dans les colonnes
        const studentIndex = headers.indexOf(studentName);

        if (studentIndex === -1) {
            console.warn(`⚠️ Aucun élève trouvé avec le nom : ${studentName}`);
            document.getElementById("student-data").innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom : <strong>${studentName}</strong></p>`;
            return;
        }

        console.log(`✅ Élève trouvé à la colonne ${studentIndex}`);

        // 🔹 Construction du tableau HTML
        let studentDataHTML = "<table border='1'><tr><th>Compétence</th><th>Niveau</th></tr>";

        jsonData.table.rows.forEach(row => {
            const competence = row.c[0]?.v || "❓ Compétence inconnue"; // Colonne 1 = Compétence
            const niveau = row.c[studentIndex]?.v || "❌ Non évalué"; // Colonne de l'élève

            studentDataHTML += `<tr><td>${competence}</td><td>${niveau}</td></tr>`;
        });

        studentDataHTML += "</table>";
        document.getElementById("student-data").innerHTML = studentDataHTML;
    })
    .catch(error => console.error("❌ Erreur lors de la récupération des données :", error));
