console.log("🔄 Chargement du script eleve.js...");


const studentName = urlParams.get('name');
console.log("👤 Nom de l'élève sélectionné :", studentName);

if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 Définition de l'URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";

async function fetchCompetences() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47, text.length - 2));
        const rows = jsonData.table.rows;

        console.log("📊 Données brutes reçues :", jsonData);

        if (!jsonData.table.cols || jsonData.table.cols.length === 0) {
            console.error("❌ Erreur : Les colonnes sont vides. Vérifie que la feuille Google Sheets est bien remplie !");
            document.getElementById("student-data").innerHTML = `<p>⚠️ Problème de récupération des données. Vérifie que la feuille est bien publique.</p>`;
            return;
        }

        const headers = jsonData.table.cols.map(col => col.label);
        console.log("📝 En-têtes des colonnes détectées :", headers);

        const studentIndex = headers.indexOf(studentName);
        if (studentIndex === -1) {
            console.warn(`⚠️ Aucun élève trouvé avec ce nom : ${studentName}`);
            document.getElementById("student-data").innerHTML = `<p>⚠️ Aucun élève trouvé avec ce nom : <b>${studentName}</b>. Vérifie l'orthographe et la feuille Google Sheets.</p>`;
            return;
        }

        let tableHTML = "<table border='1'><tr><th>Compétence</th><th>Niveau</th></tr>";
        rows.forEach(row => {
            const competence = row.c[0]?.v || "❌ Erreur";
            const niveau = row.c[studentIndex]?.v || "Non évalué";
            tableHTML += `<tr><td>${competence}</td><td>${niveau}</td></tr>`;
        });
        tableHTML += "</table>";

        document.getElementById("student-data").innerHTML = tableHTML;

    } catch (error) {
        console.error("❌ Erreur lors du chargement des compétences :", error);
        document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
    }
}

fetchCompetences();
