console.log("Chargement du script eleve.js...");
console.log("Nom de l'élève sélectionné :", studentName);
console.log("API URL :", apiURL);

// Remplace ceci par ton ID Google Sheets
const sheetID = "1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg"; // Mets ici ton vrai ID Google Sheets
const sheetName = "Feuille1"; 

// URL de l'API Google Sheets
const apiURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&sheet=${sheetName}`;

// Récupérer le nom de l’élève depuis l’URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get("name");

document.getElementById("student-name").innerText = studentName;

// Fonction pour charger les compétences de l'élève sélectionné
async function loadStudentData() {
    try {
        console.log("🔄 Tentative de récupération des données...");
        const response = await fetch(apiURL);
        const text = await response.text();
        
        console.log("📄 Réponse reçue :", text); // Vérification

        const jsonData = JSON.parse(text.substr(47).slice(0, -2)); // Convertit en JSON

        let studentData = document.getElementById("student-data");
        studentData.innerHTML = ""; // Efface l’ancien contenu

        let studentFound = false;

        // 🔹 On saute la première ligne qui contient les titres des colonnes
        jsonData.table.rows.slice(1).forEach(row => { 
            if (row.c[0]?.v === studentName) { // Vérifie si c’est l’élève sélectionné
                studentFound = true;
                studentData.innerHTML = `<table border="1">
                    <tr><th>Compétence 1</th><th>Compétence 2</th><th>Compétence 3</th><th>Badges</th></tr>
                    <tr>
                        <td>${row.c[1]?.v || "❌"}</td>
                        <td>${row.c[2]?.v || "❌"}</td>
                        <td>${row.c[3]?.v || "❌"}</td>
                        <td>${row.c[4]?.v || "-"}</td>
                    </tr>
                </table>`;
            }
        });

        if (!studentFound) {
            console.warn("⚠️ Aucun élève trouvé !");
            studentData.innerHTML = "<p>Aucune donnée trouvée pour cet élève.</p>";
        }

    } catch (error) {
        console.error("🚨 Erreur lors de la récupération des données :", error);
        document.getElementById("student-data").innerHTML = "<p>Erreur de chargement des compétences. Vérifiez l'ID Google Sheets et les permissions.</p>";
    }
}


// Charger les compétences de l’élève au d
