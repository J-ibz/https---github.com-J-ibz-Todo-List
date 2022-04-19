import List from "./modules/List.js";
import UI from "./modules/UI.js";
import Store from "./modules/Store.js";

//Event: Afficher les listes et le counter au chargement du DOM
document.addEventListener("DOMContentLoaded", UI.displayMyLists);
document.addEventListener("DOMContentLoaded", UI.showCounter);

//Event: Ajouter une liste au clic
document.querySelector("[list-form]").addEventListener("submit", (e) => {
  e.preventDefault();
  const newListInput = document.querySelector("[list-input]"); //Selectionne l'input
  const listTitle = newListInput.value; //récupération values de l'input
  const id = Date.now().toString(); //génération d'un id unique
  const status = false; //définition du status de la checkbox

  //Validation des champs
  if (listTitle == null || listTitle == "") {
    UI.showAlert("Merci de remplir le champ !", "danger"); //Err message si vide
  } else {
    UI.showAlert("Truc à faire créé !", "succes"); //Success message
    const list = new List(id, listTitle, status); //Instanciation de la liste
    UI.addList(list); //Ajout de la nouvelle liste à la classe UI
    Store.addOneList(list); //Ajout de la nouvelle liste au localStorage
    UI.showCounter(); //MAJ du counter
    newListInput.value = null; //Clear de l'input
  }
});

//Event: Supprimer une liste
document.querySelector("[list-main]").addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() == "button") {
    let id = e.path[1].id;
    UI.deleteList(e.target); //Supprimer une liste de l'UI
    Store.removeOneList(id); //Supprimer du store
    UI.showCounter(); //MAJ counter
  }
});

//Event: Récupération du status de la checkbox
document.querySelector("[list-main]").addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() == "input") {
    let status = e.path[0].checked; //récupère le status de la checkbox
    let id = e.path[3].id; //recupère l'id de la balise <p>
    Store.updateStatus(status, id); //envoie du status et id de l'item ciblé au Store
    UI.showCounter(); //MAJ counter
  }
});
