document.addEventListener("DOMContentLoaded", async function () {
    console.log("🔄 Chargement des données...");

    // 🔹 Déclaration de studentName avant toute utilisation
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('name'); // Récupération du nom de l'élève

    if (!studentName) {
        console.error("❌ Aucun élève spécifié dans l'URL.");
        document.getElementById("student-data").innerHTML = "<p>Erreur : Nom d'élève non trouvé.</p>";
        return;
    }

    console.log("👤 Élève sélectionné :", studentName);

    // 🔹 URL de ton fichier JSON Google Sheets (à remplacer)
    const apiURL = "https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json";

    try {
        console.log("📡 Récupération des données...");
        const response = await fetch(apiURL);
        const text = await response.text();

        console.log("📄 Réponse brute :", text);

        // 🔹 Extraction correcte du JSON
        const jsonData = JSON.parse(text.substr(47).slice(0, -2));
        console.log("✅ JSON extrait :", jsonData);

        let studentData = document.getElementById("student-data");
        studentData.innerHTML = ""; // Vider l'affichage précédent

        let studentFound = false;

        // 🔹 Ignorer la première ligne qui contient les titres
        jsonData.table.rows.slice(1).forEach(row => {
            if (row.c[0]?.v === studentName) {
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
            studentData.innerHTML = `<p>Aucune donnée trouvée pour l'élève 

