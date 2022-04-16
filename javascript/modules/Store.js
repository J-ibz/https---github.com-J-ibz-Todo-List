//Store Class: Pour gérer le localstorage
export default class Store {
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

  //Ajout d'une liste au localStorage
  static addOneList(list) {
    const lists = Store.getAllLists();
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  //Suppression d'une liste du localStorage
  static removeOneList(id) {
    const lists = Store.getAllLists();
    lists.forEach((list, index) => {
      if (list.id === id) {
        lists.splice(index, 1);
      }
    });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  //Update du status de la checkbox dans le localStorage
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
