console.log("📄 Chargement du script eleve.js...");

// 🔹 Vérification et récupération du nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("👤 Nom de l'élève sélectionné :", studentName);

// Vérifier si un nom d'élève a bien été trouvé
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 URL de l'API Google Sheets
const spreadsheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg";  // Mets ici l'ID de ton fichier Google Sheets
const sheetName = "Compétences";  // Mets ici le nom exact de ta feuille
const apiURL = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

console.log("🌍 API URL :", apiURL);

// 🔹 Récupération des données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        console.log("✅ Vérification : eleve.js est bien chargé !");
        
        // Nettoyage du format JSON renvoyé par Google Sheets
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        const rows = jsonData.table.rows;

        console.log("📊 Données brutes reçues :", rows);

        // Vérifier si les données existent
        if (!rows || rows.length === 0) {
            console.warn("⚠️ Aucune donnée trouvée dans la feuille !");
            document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
            return;
        }

        // 🔹 Extraction des en-têtes
        const headers = jsonData.table.cols.map(col => col.label);
        console.log("📊 Colonnes détectées :", headers);

        // Trouver la colonne de l'élève
        const studentIndex = headers.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn(`⚠️ Aucun élève trouvé avec ce nom : ${studentName}`);
            document.getElementById("student-data").innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom : <strong>${studentName}</strong>.</p>`;
            return;
        }

        // 🔹 Création du tableau HTML
        let tableHTML = `<table border="1">
                            <tr>
                                <th>Compétence</th>
                                <th>Niveau</th>
                            </tr>`;

        // Ajout des compétences et niveaux
        rows.forEach(row => {
            const competence = row.c[0]?.v || "Inconnue";  // Première colonne : compétence
            const niveau = row.c[studentIndex]?.v || "Non évalué";  // Colonne correspondant à l'élève
            
            tableHTML += `<tr>
                            <td>${competence}</td>
                            <td>${niveau}</td>
                          </tr>`;
        });

        tableHTML += "</table>";
        document.getElementById("student-data").innerHTML = tableHTML;

        console.log("✅ Affichage des compétences terminé !");
    })
    .catch(error => {
        console.error("❌ Erreur lors du chargement des données :", error);
        document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
    });

