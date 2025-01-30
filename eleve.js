console.log("Chargement du script eleve.js...");

// 1️⃣ Récupérer le nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

console.log("Nom de l'élève sélectionné :", studentName);

// Sélection de l'élément où afficher les données
const studentTitle = document.getElementById("student-name");
const studentData = document.getElementById("student-data");

// 2️⃣ Vérifier si le nom d'élève est bien fourni
if (!studentName) {
    studentTitle.innerText = "Aucun élève sélectionné";
    studentData.innerHTML = `<p style="color:red;">⚠️ Aucun élève trouvé dans l'URL.</p>`;
    throw new Error("Nom d'élève manquant dans l'URL.");
}

// 3️⃣ API Google Sheets (à remplacer avec ton ID)
const sheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg";
const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

// 4️⃣ Charger les données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        // Nettoyage des données JSON (Google Sheets rajoute un préfixe inutile)
        const jsonData = JSON.parse(data.substring(47).slice(0, -2));
        console.log("Données reçues :", jsonData);

        const rows = jsonData.table.rows;
        const cols = jsonData.table.cols.map(col => col.label);

        // Vérifier que le tableau contient bien des données
        if (!rows || rows.length === 0) {
            studentData.innerHTML = `<p style="color:red;">⚠️ Impossible de charger les données.</p>`;
            return;
        }

        // Construire un objet avec les données par élève
        let studentsData = {};
        rows.forEach(row => {
            const competence = row.c[0]?.v; // Colonne 1 = compétence

            // Stocker les niveaux des élèves
            for (let i = 1; i < cols.length; i++) {
                const student = cols[i]; // Nom de l'élève en colonne
                const level = row.c[i]?.v || "Non évalué"; // Niveau

                if (!studentsData[student]) studentsData[student] = {};
                studentsData[student][competence] = level;
            }
        });

        console.log("Données formatées :", studentsData);

        // Vérifier si l'élève existe dans la liste
        if (!studentsData[studentName]) {
            studentData.innerHTML = `<p style="color:red;">⚠️ Aucun élève trouvé avec ce nom.</p>`;
            return;
        }

        studentTitle.innerText = studentName;

        // 5️⃣ Générer le tableau HTML des compétences
        let tableHTML = `<table border="1" cellpadding="5">
            <thead>
                <tr>
                    <th>Compétence</th>
                    <th>Niveau</th>
                </tr>
            </thead>
            <tbody>`;

        Object.entries(studentsData[studentName]).forEach(([competence, niveau]) => {
            tableHTML += `<tr>
                <td>${competence}</td>
                <td>${niveau}</td>
            </tr>`;
        });

        tableHTML += `</tbody></table>`;
        studentData.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error("Erreur API :", error);
        studentData.innerHTML = `<p style="color:red;">❌ Erreur lors de la récupération des données.</p>`;
    });
