console.log("📌 Chargement du script accueil.js...");

// 🔹 Remplace ici par TON ID de Google Sheets
const apiURL = "AKfycbyiduq-gNcOsdrvFGQ4OMd8hK25MsevLQjY4ZdJDQ5VPZ7K0aPtTHR1EcHG_Yb5eArl";

async function fetchStudents() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        
        let studentNames = [];
        
        json.table.cols.slice(1).forEach(col => {
            if (col.label) {
                studentNames.push(col.label);
            }
        });

        const studentListDiv = document.getElementById("student-list");
        studentListDiv.innerHTML = ""; // Effacer le message de chargement

        if (studentNames.length > 0) {
            studentNames.forEach(name => {
                let link = document.createElement("a");
                link.href = `eleve.html?name=${encodeURIComponent(name)}`;
                link.innerText = name;
                link.style.display = "block";
                studentListDiv.appendChild(link);
            });
        } else {
            studentListDiv.innerHTML = "<p>Aucun élève trouvé.</p>";
        }
    } catch (error) {
        console.error("❌ Erreur lors du chargement des élèves :", error);
        document.getElementById("student-list").innerHTML = "<p>Erreur de chargement.</p>";
    }
}

// Charger les élèves au démarrage
fetchStudents();

