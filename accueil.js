console.log("🚀 Chargement du script accueil.js...");

// URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";

console.log("🌐 API URL :", apiURL);

fetch(apiURL)
    .then(response => response.text())
    .then(dataText => {
        const jsonData = JSON.parse(dataText.substring(47).slice(0, -2)); // Nettoyage du JSON Google Sheets

        console.log("🛠️ Données JSON brutes :", jsonData);

        if (!jsonData.table.cols || jsonData.table.cols.length === 0) {
            console.warn("⚠️ Aucune donnée trouvée dans la feuille !");
            document.getElementById("student-list").innerHTML = "<p>⚠️ Aucun élève trouvé !</p>";
            return;
        }

        // Extraction des en-têtes (les noms des élèves sont à partir de la colonne 2)
        const headers = jsonData.table.cols.map(col => col.label.trim());
        console.log("📊 En-têtes récupérées :", headers);

        // Générer la liste des élèves (en ignorant la première colonne qui est "Compétence")
        let studentListHTML = "<ul>";
        for (let i = 1; i < headers.length; i++) { // Commence à 1 pour ignorer "Compétence"
            if (headers[i]) { // Vérifie que le nom de l'élève existe
                studentListHTML += `<li><a href="eleve.html?name=${encodeURIComponent(headers[i])}">${headers[i]}</a></li>`;
            }
        }
        studentListHTML += "</ul>";

        document.getElementById("student-list").innerHTML = studentListHTML;
    })
    .catch(error => {
        console.error("❌ Erreur lors de la récupération des données :", error);
        document.getElementById("student-list").innerHTML = "<p>❌ Erreur lors du chargement des élèves.</p>";
    });
