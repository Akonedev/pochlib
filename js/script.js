const bookcontainer = document.getElementById("myBooks");
let newQuery = document.querySelector(".searchTitle"); 

addBookButton();
//fonction bouton "ajouter un livre"
function addBookButton() {
    let addButton = document.createElement("div");
    addButton.innerHTML = `<div class="addBook">
        <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
      </div>`;
      bookcontainer.appendChild(addButton);
      newQuery.after(addButton);
    }
  
// mise en page 
function addSearchForm() {
    const addBookDiv = document.querySelector(".addBook");
    addBookDiv.innerHTML = `
    <form id="search-card" onsubmit="searchResults(); return false;">
      <div class="form-group">
        <label class="bookTitle" for="title"> Titre du Livre </label>
      
        <input class="row-s-8 form-control" type="text" name="title" id="title" placeholder="Titre" > </br>
      
        <label class="bookAuthor" for="author">Auteur</label>
    
        <input class="form-control" type="text" name="author" id="author" placeholder="Auteur" > 
      
        <div class="button2"><br>
          <button type="button" id="searchButton" class="searchButton"> Rechercher </button>
        </div><br>
  
        <div class="button3">
          <button type="button" id="cancelButton" class="cancelButton"> Annuler </button>
        </div><br>
      </div>
    </form>`;
    
    
  }
  