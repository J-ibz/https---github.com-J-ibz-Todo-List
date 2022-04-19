export default class UI {
  static displayMyLists() {
    let StoredLists = JSON.parse(localStorage.getItem("lists"));
    StoredLists.forEach((list) => UI.addList(list));
  }

  static showCounter() {
    let StoredLists = JSON.parse(localStorage.getItem("lists"));
    const result = StoredLists.filter((list) => list.status === false);
    const counter = document.querySelector("[counter]");

    switch (result.length) {
      case 0:
        counter.innerText = "Tu n'as plus rien à faire, gg !";
        break;

      case 1:
        counter.innerText = `Tu as ${result.length} truc à faire!`;
        break;

      default:
        counter.innerText = `Tu as ${result.length} trucs à faire!`;
        break;
    }
  }

  static addList(list) {
    const template = document.querySelector("[list-template]").content;
    const copyHTML = document.importNode(template, true);
    copyHTML.querySelector("[list-li]").innerText = `${list.title}`;
    copyHTML.querySelector("[list-main-ul]").setAttribute("id", list.id);
    copyHTML.querySelector("[test]").checked = list.status;
    document.querySelector("[list-main]").appendChild(copyHTML);
  }

  static deleteList(target) {
    if (target.classList.contains("delete-button")) {
      target.parentElement.remove();
      UI.showAlert("Bravo tu avances !", "succes"); //Message de succès
    }
  }

  static showAlert(message, cssClass) {
    const container = document.querySelector("[alert]");
    const alert = document.createElement("div");
    alert.className = `alert ${cssClass}`;
    alert.innerText = message;
    container.append(alert);
    setTimeout(() => document.querySelector(".alert").remove(), 1500); //Disparition du message
  }
}
