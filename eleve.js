console.log("Chargement du script eleve.js...");

// 🔹 Déclaration de studentName AVANT son utilisation
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); // Récupération du nom de l'élève dans l'URL

console.log("Nom de l'élève sélectionné :", studentName);

// Vérifier si un nom d'élève a bien été trouvé
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
} else {
    console.log("✅ Élève détecté :", studentName);
}

// 🔹 Déclare aussi apiURL avant de l'afficher
const apiURL = "https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json";
console.log("API URL :", apiURL);


        if (!studentFound) {
            console.warn("⚠️ Aucun élève trouvé !");
            studentData.innerHTML = `<p>Aucune donnée trouvée pour l'élève 

