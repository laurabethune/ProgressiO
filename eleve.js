document.addEventListener("DOMContentLoaded", async function () {
    console.log("🔄 Chargement des données...");
    
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('name'); // Récupération du nom de l'élève depuis l'URL

    if (!studentName) {
        console.error("❌ Aucun élève spécifié dans l'URL.");
        document.getElementById("student-data").innerHTML = "<p>Erreur : Nom d'élève non trouvé.</p>";
        return;
    }

    try {
        console.log("📡 Récupération des données...");
        const response = await fetch(apiURL);
        const text = await response.text();

        console.log("📄 Réponse brute :", text);

        // Extraction des données JSON en contournant la structure spécifique de Google Sheets
        const jsonData = JSON.parse(text.substr(47).slice(0, -2));

        console.log("✅ JSON extrait :", jsonData);

        let studentData = document.getElementById("student-data");
        studentData.innerHTML = ""; // On vide le contenu précédent

        let studentFound = false;

        // 🔹 Ignorer la première ligne du JSON qui contient les titres des colonnes
        jsonData.table.rows.slice(1).forEach(row => {
            if (row.c[0]?.v === studentName) { // Vérification du nom
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
            studentData.innerHTML = `<p>Aucune donnée trouvée pour l'élève : <strong>${studentName}</strong></p>`;
        }

    } catch (error) {
        console.error("🚨 Erreur lors de la récupération des données :", error);
        document.getElementById("student-data").innerHTML = "<p>Erreur de chargement des compétences. Vérifiez l'ID Google Sheets et les permissions.</p>";
    }
});

