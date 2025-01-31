document.addEventListener("DOMContentLoaded", function () {
    console.log("Chargement du script index.js...");

    const apiURL = "https://script.google.com/macros/s/AKfycbyiduq-gNcOsdrvFGQ4OMd8hK25MsevLQjY4ZdJDQ5VPZ7K0aPtTHR1EcHG_Yb5eArl/exec";
    const studentsList = document.getElementById("students-list");

    if (!studentsList) {
        console.error("❌ Élément 'students-list' introuvable !");
        return;
    }

    studentsList.innerHTML = "Chargement des élèves...";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Données récupérées :", data);

            if (!data || data.length === 0) {
                studentsList.innerHTML = "<p>Aucun élève trouvé.</p>";
                return;
            }

            studentsList.innerHTML = "";
            console.log("Données reçues :", data);
console.log("Type de data :", typeof data);
            data.forEach(student => {
                const studentLink = document.createElement("a");
                studentLink.href = `eleve.html?name=${encodeURIComponent(student)}`;
                studentLink.textContent = student;
                studentLink.classList.add("student-link");

                const listItem = document.createElement("li");
                listItem.appendChild(studentLink);
                studentsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("❌ Erreur lors de la récupération des élèves :", error);
            studentsList.innerHTML = "<p>Erreur lors du chargement des élèves.</p>";
        });
});
