const apiURL = "https://script.google.com/macros/s/AKfycbyiduq-gNcOsdrvFGQ4OMd8hK25MsevLQjY4ZdJDQ5VPZ7K0aPtTHR1EcHG_Yb5eArl/exec";
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name');

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("student-name").innerText = studentName;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                document.getElementById("competence-table").innerHTML = "Aucune compétence trouvée.";
                return;
            }

            const headers = data[0];  // En-têtes (nom des élèves)
            const studentIndex = headers.indexOf(studentName);
            if (studentIndex === -1) {
                document.getElementById("competence-table").innerHTML = "Aucun élève trouvé avec ce nom.";
                return;
            }

            let html = `<table><tr><th>Compétence</th><th>Niveau</th></tr>`;
            data.slice(1).forEach(row => {
                html += `<tr><td>${row[0]}</td><td class="level-${row[studentIndex].toLowerCase()}">${row[studentIndex]}</td></tr>`;
            });
            html += `</table>`;

            document.getElementById("competence-table").innerHTML = html;
        })
        .catch(error => {
            console.error("Erreur lors du chargement des compétences :", error);
            document.getElementById("competence-table").innerHTML = "Erreur de chargement.";
        });
});
