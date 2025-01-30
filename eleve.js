console.log("🚀 Chargement du script eleve.js...");

// 1️⃣ Récupération du paramètre `name` dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get("name");

console.log("🔍 Paramètres URL détectés :", window.location.search);
console.log("📌 Nom de l'élève récupéré :", studentName);

// 2️⃣ Vérification et affichage du nom de l'élève
if (studentName) {
    document.getElementById("student-name").textContent = studentName;
} else {
    console.error("❌ Aucun élève détecté dans l'URL.");
    document.getElementById("student-data").innerHTML = "<p>⚠️ Élève non trouvé.</p>";
}

// 3️⃣ Définition de l'URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json";

console.log("🌐 API URL :", apiURL);

// 4️⃣ Récupération des données depuis Google Sheets
fetch(apiURL)
    .then(response => response.text())
    .then(data => {
        console.log("✅ Données brutes reçues :", data);
        
        // Nettoyage des données Google Sheets
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        console.log("📊 Données JSON traitées :", jsonData);

        // Chercher les infos de l'élève
        const rows = jsonData.table.rows;
        const studentData = rows.find(row => row.c[0].v === studentName);

        if (studentData) {
            document.getElementById("student-data").innerHTML = `
                <p>Compétence 1 : ${studentData.c[1].v}</p>
                <p>Compétence 2 : ${studentData.c[2].v}</p>
                <p>Compétence 3 : ${studentData.c[3].v}</p>
                <p>Badges : ${studentData.c[4].v}</p>
            `;
        } else {
            document.getElementById("student-data").innerHTML = "<p>⚠️ Aucune donnée trouvée pour cet élève.</p>";
        }
    })
    .catch(error => {
        console.error("❌ Erreur lors de la récupération des données :", error);
        document.getElementById("student-data").innerHTML = "<p>⚠️ Impossible de charger les données.</p>";
    });


