console.log("Chargement du script eleve.js...");

// 🔹 Récupération du nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); 

console.log("Nom de l'élève sélectionné :", studentName);

// Vérification si un nom a bien été détecté
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
    document.getElementById("student-data").innerHTML = `<p>⚠️ Aucun élève détecté.</p>`;
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 ID de ton Google Sheets
const sheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg";
const sheetName = "Feuille1"; // Remplace par le nom de l’onglet si nécessaire
const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

console.log("API URL :", apiURL);

// 🔹 Fonction pour charger les données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        // Nettoyer la réponse pour qu'elle soit un JSON valide
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        console.log("Données brutes reçues :", jsonData);

        const rows = jsonData.table.rows;
        let cols = jsonData.table.cols.map(col => col.label);

        console.log("Colonnes détectées :", cols);

        // Vérifier si l'élève existe bien dans les données
        const studentIndex = cols.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn(`⚠️ Aucun élève trouvé avec ce nom : ${studentName}`);
            document.getElementById("student-data").innerHTML = `
                <p>⚠️ Aucun élève trouvé avec ce nom.</p>
            `;
            return;
        }

        // Construire le tableau HTML des compétences
        let tableHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Compétence</th>
                        <th>Niveau</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach(row => {
            const competence = row.c[0]?.v || "Inconnue"; // Nom de la compétence
            const niveau = row.c[studentIndex]?.v || "Non évalué"; // Niveau de l'élève

            // Ajouter la ligne au tableau
            tableHTML += `
                <tr>
                    <td>${competence}</td>
                    <td>${niveau}</td>
                </tr>
            `;
        });

        tableHTML += "</tbody></table>";

        // Insérer dans la page HTML
        document.getElementById("student-data").innerHTML = tableHTML;
    })
    .catch(error => {
        console.error("❌ Erreur de chargement des données :", error);
        document.getElementById("student-data").innerHTML = `<p>⚠️ Impossible de charger les données.</p>`;
    });
