console.log("📌 Chargement du script accueil.js...");

const apiURL = "const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";
;

// Fonction pour récupérer les noms des élèves
async function fetchStudents() {
    try {
        const response = await fetch(apiURL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));

        // Récupérer les en-têtes de colonne (les noms des élèves)
        const headers = json.table.cols.map(col => col.label).slice(1); // Ignorer la première colonne (Compétences)
        
        console.log("📝 Liste des élèves trouvés :", headers);

        // Affichage des élèves dans la page
        const studentsContainer = document.getElementById("students-list");
        studentsContainer.innerHTML = "";

        headers.forEach(name => {
            if (name) { // Vérifie que le nom existe
                let link = document.createElement("a");
                link.href = `eleve.html?name=${encodeURIComponent(name)}`;
                link.textContent = name;
                link.style.display = "block";
                studentsContainer.appendChild(link);
            }
        });

    } catch (error) {
        console.error("❌ Erreur lors du chargement des élèves :", error);
    }
}

// Charger les élèves au démarrage
fetchStudents();

