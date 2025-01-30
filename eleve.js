console.log("🚀 Chargement du script eleve.js...");

// ✅ Vérifie si l'URL contient bien "name=..."
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); // Récupère la valeur du paramètre "name"

console.log("🔍 Paramètres URL détectés :", window.location.search);
console.log("📌 Nom de l'élève récupéré :", studentName);

// Vérification et affichage dans la page
if (!studentName) {
    console.error("❌ Aucun élève trouvé dans l'URL !");
    alert("Erreur : Aucun élève détecté. Vérifiez l'URL.");
} else {
    console.log("✅ Élève détecté :", studentName);
    document.body.innerHTML += `<h1>Bienvenue, ${studentName} !</h1>`;
}

// ✅ Déclare aussi l'URL API
const apiURL = "https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json";
console.log("🌐 API URL :", apiURL);

