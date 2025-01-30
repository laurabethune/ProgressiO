// Liste des élèves et leurs compétences
let students = [
    { name: "Alex", skills: ["Vente", "Accueil Client"], badges: ["Badge Vente", "Badge Communication"] },
    { name: "Julie", skills: ["Marketing", "Stratégie"], badges: ["Badge Marketing"] }
];

// Fonction pour afficher les élèves et leurs badges
function displayStudents() {
    let container = document.getElementById("students");
    container.innerHTML = "";  // Nettoyage avant affichage

    students.forEach(student => {
        let div = document.createElement("div");
        div.classList.add("student");
        div.innerHTML = `<h2>${student.name}</h2>
                         <p>Compétences : ${student.skills.join(", ")}</p>
                         <div class="badges">
                             ${student.badges.map(badge => `<span class="badge">${badge}</span>`).join("")}
                         </div>`;
        container.appendChild(div);
    });
}

// Charger les élèves
window.onload = displayStudents;
