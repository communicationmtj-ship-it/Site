import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const conteneur = document.getElementById("root");
const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pré-rendu (choix de Théo du 13/11/2026, « pré-rendu Google ») : une page publique arrive avec son
// HTML complet, écrit à la construction de l'image (scripts/prerender.js). React la reprend telle
// quelle (hydrateRoot) au lieu de la redessiner ; les autres adresses (/devis, /dashboard, page
// introuvable) arrivent vides et React les dessine comme avant.
if (conteneur.firstElementChild) {
  ReactDOM.hydrateRoot(conteneur, application);
} else {
  ReactDOM.createRoot(conteneur).render(application);
}
