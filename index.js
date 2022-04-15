//List Class: Represente une liste
class List {
  constructor(id, title, status) {
    this.id = id;
    this.title = title;
    this.status = status;
  }
}

//UI Class: Pour gérer affichage, suppression d'une todo
class UI {
  static displayMyLists() {
    const StoredLists = Store.getAllLists();
    StoredLists.forEach((list) => UI.addList(list));
  }

  static showCounter() {
    const StoredLists = Store.getAllLists();
    const result = StoredLists.filter((list) => list.status === false);
    console.log(result.length);
    const counter = document.querySelector("[counter]");
    // let length = StoredLists.length;
    counter.innerText = `Tu as ${result.length} trucs à faire!`;
    if (result.length == 0 || null) {
      counter.innerText = "Tu n'as rien à faire, gg !";
    }
  }
  // static showCounter() {
  //   const StoredLists = Store.getAllLists();
  //   const counter = document.querySelector("[counter]");
  //   let length = StoredLists.length;
  //   counter.innerText = `Tu as ${length} trucs à faire!`;
  //   if (length == 0 || null) {
  //     counter.innerText = "Tu n'as rien à faire, gg !";
  //   }
  // }

  static addList(list) {
    const template = document.querySelector("[list-template]").content;
    const copyHTML = document.importNode(template, true);
    copyHTML.querySelector("[list-li]").innerText = `${list.title}`;
    copyHTML.querySelector("[list-li]").setAttribute("id", list.id);
    copyHTML.querySelector("[test]").checked = list.status;
    document.querySelector("[list-main]").appendChild(copyHTML);
  }

  static showUpdate() {}

  static deleteList(target) {
    if (target.classList.contains("delete-button")) {
      target.parentElement.remove();
      //Message de succès
      UI.showAlert("Bravo tu avances !", "succes");
    }
  }

  static showAlert(message, cssClass) {
    const container = document.querySelector("[alert]");
    const alert = document.createElement("div");
    alert.className = `alert ${cssClass}`;
    alert.innerText = message;
    container.append(alert);
    //Disparition du message
    setTimeout(() => document.querySelector(".alert").remove(), 1500);
  }
}

//Store Class: Pour gérer le localstorage
class Store {
  //Récupération de nos listes depuis le localStorage
  static getAllLists() {
    let lists;
    //Vérification si une liste existe déjà, sinon création d'un tableau vide.
    if (localStorage.getItem("lists") === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem("lists"));
    }
    return lists;
  }

  static addOneList(list) {
    const lists = Store.getAllLists();
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  static removeOneList(id) {
    const lists = Store.getAllLists();
    lists.forEach((list, index) => {
      if (list.id === id) {
        lists.splice(index, 1);
      }
    });

    localStorage.setItem("lists", JSON.stringify(lists));
  }

  static updateStatus(status, id) {
    let updatedStatus = !status;
    let lists = JSON.parse(localStorage.getItem("lists"));
    for (let todo of lists) {
      if (todo.id == id) {
        todo.status = updatedStatus;
      }
    }
    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

document.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target.classList.contains("checkbox")) {
    Store.updateStatus(e.target.children[0].checked, e.target.children[1].id);
    UI.showCounter();
  }
});

//Event: Afficher les listes
document.addEventListener("DOMContentLoaded", UI.displayMyLists);
//Event: Afficher le counter
document.addEventListener("DOMContentLoaded", UI.showCounter);

//Event: Ajouter une liste au clic
document.querySelector("[list-form]").addEventListener("submit", (e) => {
  e.preventDefault();

  //Récupération des values de l'input
  const newListInput = document.querySelector("[list-input]");
  const listTitle = newListInput.value;
  const id = Date.now().toString();
  const status = false;

  //Validation des champs
  if (listTitle == null || listTitle == "") {
    UI.showAlert("Merci de remplir le champ !", "danger");
  } else {
    UI.showAlert("Truc à faire créé !", "succes");

    //Instanciation de la liste
    const list = new List(id, listTitle, status);

    //Ajout de la nouvelle liste à la classe UI
    UI.addList(list);

    //Ajout de la nouvelle liste au localStorage
    Store.addOneList(list);

    //MAJ du counter
    UI.showCounter();

    //Clear de l'input
    newListInput.value = null;
  }
});

//Event: Supprimer une liste
document.querySelector("[list-main]").addEventListener("click", (e) => {
  //Supprimer une liste de l'UI
  UI.deleteList(e.target);

  //Supprimer une liste du Store
  Store.removeOneList(e.target.previousElementSibling.children[0].children[1].id);

  UI.showCounter();
});
