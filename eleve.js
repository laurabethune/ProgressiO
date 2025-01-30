console.log("Chargement du script eleve.js...");

// Récupération du nom de l'élève depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('name'); 
console.log("Nom de l'élève sélectionné :", studentName);

// Sélection des éléments HTML
const studentData = document.getElementById("student-data");
const studentNameElement = document.getElementById("student-name");

// Affichage du nom de l'élève
if (studentName) {
    studentNameElement.textContent = studentName;
} else {
    studentData.innerHTML = `<p>⚠️ Aucun élève trouvé !</p>`;
    console.error("❌ Aucun élève trouvé dans l'URL !");
}

// URL de l'API Google Sheets
const apiURL = "https://docs.google.com/spreadsheets/d/1chnPStz0_dv50b2PRRRwsYzJXVJwPoAvhrtnpYa5vMg/gviz/tq?tqx=out:json";
console.log("API URL :", apiURL);

// Fonction pour récupérer et afficher les données
fetch(apiURL)
  .then(response => response.text()) // Google renvoie du texte, pas un JSON
  .then(data => {
      const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Extraction des données JSON
      console.log("Données reçues :", jsonData);

      const rows = jsonData.table.rows;
      let studentFound = false;

      // Parcours des lignes pour trouver l'élève
      for (let row of rows) {
          const name = row.c[0]?.v || "Inconnu";
          if (name.toLowerCase() === studentName.toLowerCase()) {
              studentFound = true;
              let htmlContent = `<p><strong>Compétence 1 :</strong> ${row.c[1]?.v || "❌ Non validé"}</p>`;
              htmlContent += `<p><strong>Compétence 2 :</strong> ${row.c[2]?.v || "❌ Non validé"}</p>`;
              htmlContent += `<p><strong>Compétence 3 :</strong> ${row.c[3]?.v || "❌ Non validé"}</p>`;
              htmlContent += `<p><strong>Badges :</strong> ${row.c[4]?.v || "Aucun badge"}</p>`;
              studentData.innerHTML = htmlContent;
              break;
          }
      }

      if (!studentFound) {
          console.warn("⚠️ Aucun élève trouvé !");
          studentData.innerHTML = `<p>⚠️ Impossible de charger les données.</p>`;
      }
  })
  .catch(error => {
      console.error("❌ Erreur lors de la récupération des données :", error);
      studentData.innerHTML = `<p>⚠️ Erreur de connexion à Google Sheets.</p>`;
  });
