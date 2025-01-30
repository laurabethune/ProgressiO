console.log("📄 Chargement du script eleve.js...");

// 🔹 Récupération du nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("👤 Nom de l'élève sélectionné :", studentName);

// Vérifier si un nom d'élève a bien été trouvé
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 URL de l'API Google Sheets (remplace avec ton propre ID de fichier)
const spreadsheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg";
const sheetName = "Compétences";  // Remplace par le nom exact de ta feuille
const apiURL = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

console.log("🌍 API URL :", apiURL);

// 🔹 Récupération des données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        console.log("✅ Vérification : eleve.js est bien chargé !");
        
        // Nettoyage de la réponse pour récupérer le JSON
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        const rows = jsonData.table.rows;

        console.log("📊 Données brutes reçues :", rows);

        // Vérifier si les données existent
        if (!rows || rows.length === 0) {
            console.warn("⚠️ Aucune donnée trouvée dans la feuille !");
            document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
            return;
        }

        // 🔹 Détection des colonnes
        const headers = jsonData.table.cols.map(col => col.label);
        console.log("📊 Colonnes détectées :", headers);

        // Trouver l'index de l'élève dans les colonnes
        const studentIndex = headers.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn(`⚠️ Aucun élève trouvé avec ce nom : ${studentName}`);
            document.getElementById("student-data").innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom : <strong>${studentName}</strong>.</p>`;
            return;
        }

        // 🔹 Création du tableau des compétences
        let tableHTML = `<table border="1">
                            <tr>
                                <th>Compétence</th>
                                <th>Niveau</th>
                            </tr>`;

        // Lire les données et ajouter au tableau
        rows.forEach(row => {
            const competence = row.c[0]?.v || "Inconnue";  // Colonne 1 : Compétence
            const niveau = row.c[studentIndex]?.v || "Non évalué";  // Colonne de l'élève
            
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
