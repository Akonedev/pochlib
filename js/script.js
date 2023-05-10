const bookcontainer = document.getElementById("myBooks");

addBookButton();
//fonction bouton "ajouter un livre"
function addBookButton() {
    let addButton = document.createElement("div");
    addButton.innerHTML = `<div class="addBook">
        <button onclick="" type="button" class="addButton"> Ajouter un livre </button>
      </div>`;
      bookcontainer.appendChild(addButton);
    newSearch.after(addButton);
   
    }
  