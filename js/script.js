const bookcontainer = document.getElementById("myBooks");
let newQuery = document.querySelector(".searchTitle"); 

addBookButton();
//fonction bouton "ajouter un livre"
function addBookButton() {
    let addButton = document.createElement("div");
    addButton.innerHTML = `<div class="addBook">
        <button onclick="" type="button" class="addButton"> Ajouter un livre </button>
      </div>`;
      bookcontainer.appendChild(addButton);
      newQuery.after(addButton);
    }
  