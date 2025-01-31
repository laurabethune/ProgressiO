console.log("📌 Chargement du script index.js...");

// 📌 URL de l'API Google Apps Script
const apiURL = "https://script.google.com/macros/s/AKfycbyiduq-gNcOsdrvFGQ4OMd8hK25MsevLQjY4ZdJDQ5VPZ7K0aPtTHR1EcHG_Yb5eArl/exec";

// 📌 Sélection de l'élément où afficher la liste des élèves
const studentsList = document.getElementById("students-list");

// 📌 Fonction pour récupérer et afficher les élèves
function fetchStudents() {
    console.log("📥 Tentative de récupération des élèves...");

    fetch(apiURL)
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            console.log("✅ Données reçues :", data); // Debug: affiche la réponse

            // 📌 Vérification si data est un tableau
            if (Array.isArray(data)) {
                console.log("✅ Les données sont bien un tableau !");

                // Vide la liste avant d'ajouter de nouveaux éléments
                studentsList.innerHTML = "";

                // Parcourir la liste des élèves et les afficher
                data.forEach(student => {
                    console.log("👨‍🎓 Élève :", student);

                    // Créer un élément de liste
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="eleve.html?name=${encodeURIComponent(student)}">${student}</a>`;

                    // Ajouter l'élément à la liste
                    studentsList.appendChild(listItem);
                });

            } else {
                console.error("❌ Erreur : Les données ne sont pas un tableau !", data);
                studentsList.innerHTML = "<li>Erreur : Données invalides</li>";
            }
        })
        .catch(error => {
            console.error("🚨 Erreur lors de la récupération des élèves :", error);
            studentsList.innerHTML = "<li>Erreur lors du chargement des élèves</li>";
        });
}

// 📌 Lancer la récupération des élèves quand la page est chargée
document.addEventListener("DOMContentLoaded", fetchStudents);
