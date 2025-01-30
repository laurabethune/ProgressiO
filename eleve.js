console.log("Chargement du script eleve.js...");

// Récupération du nom de l'élève dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); 

console.log("Nom de l'élève sélectionné :", studentName);

// Vérifier si un nom d'élève a été trouvé
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";
console.log("API URL :", apiURL);

fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        // Nettoyage des données pour extraire uniquement le JSON
        const jsonData = JSON.parse(data.substring(47, data.length - 2));

        // Récupération des lignes du tableau
        const rows = jsonData.table.rows;

        // Recherche des compétences de l'élève
        let studentFound = false;
        let studentDataDiv = document.getElementById("student-data");
        let studentNameHeader = document.getElementById("student-name");

        studentNameHeader.innerText = studentName;

        rows.forEach(row => {
            let name = row.c[0]?.v;
            if (name === studentName) {
                studentFound = true;
                let competence1 = row.c[1]?.v || "Non renseigné";
                let competence2 = row.c[2]?.v || "Non renseigné";
                let competence3 = row.c[3]?.v || "Non renseigné";
                let badges = row.c[4]?.v || "Aucun badge";

                // Conversion des niveaux
                const levelMapping = {
                    "✔️": "Expert",
                    "❌": "Novice",
                    "🔸": "Débrouillé",
                    "⭐": "Averti"
                };

                competence1 = levelMapping[competence1] || competence1;
                competence2 = levelMapping[competence2] || competence2;
                competence3 = levelMapping[competence3] || competence3;

                // Affichage des compétences
                studentDataDiv.innerHTML = `
                    <ul>
                        <li><strong>Compétence 1 :</strong> ${competence1}</li>
                        <li><strong>Compétence 2 :</strong> ${competence2}</li>
                        <li><strong>Compétence 3 :</strong> ${competence3}</li>
                        <li><strong>Badges :</strong> ${badges}</li>
                    </ul>
                `;
            }
        });

        if (!studentFound) {
            studentDataDiv.innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom.</p>`;
        }
    })
    .catch(error => {
        console.error("Erreur lors du chargement des données :", error);
        document.getElementById("student-data").innerHTML = `<p>⚠️ Impossible de charger les données.</p>`;
    });
