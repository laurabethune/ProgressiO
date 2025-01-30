// Fonction pour charger les données et ajouter les bonnes classes de couleur
function afficherCompetences(data, studentName) {
    const studentData = document.getElementById("student-data");
    studentData.innerHTML = ""; // Nettoie le contenu

    if (!data || data.length === 0) {
        studentData.innerHTML = `<p>⚠️ Aucune compétence trouvée pour <strong>${studentName}</strong>.</p>`;
        return;
    }

    // Créer le tableau
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    // En-tête
    thead.innerHTML = `
        <tr>
            <th>Compétence</th>
            <th>Niveau</th>
        </tr>`;
    table.appendChild(thead);

    // Ajouter les lignes des compétences
    data.forEach(row => {
        let tr = document.createElement("tr");

        let competenceCell = document.createElement("td");
        competenceCell.textContent = row[0]; // Nom de la compétence

        let niveauCell = document.createElement("td");
        niveauCell.textContent = row[1]; // Niveau
        niveauCell.setAttribute("data-level", row[1]); // Ajoute un attribut pour le CSS

        tr.appendChild(competenceCell);
        tr.appendChild(niveauCell);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    studentData.appendChild(table);
}
