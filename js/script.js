
let newQuery = document.querySelector(".searchTitle");
const container = document.getElementById("myBooks");
const books = JSON.parse(sessionStorage.getItem('myPochList'));

// //fonction bouton "ajouter un livre"
function addBookButton() {
  let addButton = document.createElement("div");
  addButton.innerHTML = `<div class="addBook">
      <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
    </div>`;
  container.appendChild(addButton);
  newQuery.after(addButton);
}

function createModal(message) {
  let addModal = document.createElement("div");
  addModal.className = "divParentModal";
  addModal.id = "divParentModal";
  addModal.innerHTML = "";
  addModal.innerHTML = `<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p class = "modalMessage">${message}</p>
  </div>
  
  </div>`;

  container.appendChild(addModal);
  newQuery.after(addModal);

  //open the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    message = "";
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var parentModal = document.getElementById("divParentModal");
  // parentModal.classList.add('modal_alert');
  parentModal.style.setProperty('background-color', 'blue');
}

addBookButton(container, newQuery);


// Initialisation de la liste de livres

if (!books) {
  sessionStorage.setItem('myPochList', JSON.stringify([]));
} else {
  books.map((b) => {
    addBookToPochList(b, false);
  });
}


// Mise en page 
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
  searchFormEventListener();
}

// //Listener pour les boutons
function searchFormEventListener() {

  document.getElementById('cancelButton').addEventListener('click', function () {
    cancelSearch();
  })

  document.getElementById('searchButton').addEventListener('click', function () {
    searchBook();

  })

}

//Annuler la recherche
function cancelSearch() {
  const addBookDiv = document.querySelector(".cancelButton");
  addBookDiv.innerHTML = `
    <button type="button" onclick="addSearchForm()" id="cancelButton" class="cancelButton"</button>`;
  newQuery.after(cancelButton);
  window.location.reload(false)

}


//Recherche de livre et Affichage du resultat
// //Recherche de livre
function searchBook() {

  var url = "https://www.googleapis.com/books/v1/volumes?q=";
  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  url = url + title + author;

  if (!title || !author) {
    createModal("Veuiller préciser titre et auteur");
    return;
  }

  const res = fetch(url)
    .then((res) => res.json())
    .then((results) => {
      const container = document.getElementById('card-container');
      if (container) {
        container.parentElement.removeChild(container);
      }
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';
      cardContainer.id = 'card-container';
      const search = results.items;
      search.map((book) => {
        const card = document.createElement('div');
        card.className = 'card';

        const idBookCard = document.createElement('h4');
        idBookCard.innerText = "Id : " + book.id;
        idBookCard.className = 'card-id';

        const titleBookCard = document.createElement('h4');
        titleBookCard.innerText = "Titre : " + book.volumeInfo.title;
        titleBookCard.className = 'card-title';

        const authorBookCard = document.createElement('p');
        authorBookCard.innerText = "Auteur : " + book.volumeInfo.authors;
        authorBookCard.className = 'card-author';
        if (book.volumeInfo.authors > 1) {
          book.volumeInfo.authors = book.volumeInfo.authors.slice(0, 2);
        }

        const descriptionBookCard = document.createElement('p');
        descriptionBookCard.innerText = "Description : " + book.volumeInfo.description;
        descriptionBookCard.className = 'card-description';
        if (descriptionBookCard === '' || descriptionBookCard === 'undefined') {
          descriptionBookCard.innerText = "Information manquante";
        } else if (descriptionBookCard.innerText.length > 200) {
          descriptionBookCard.innerText = descriptionBookCard.innerText.substring(0, 200) + '...';
        }

        const bookMarks = document.createElement('i');
        const headerCard = document.createElement('div');
        headerCard.className = 'card-header';
        headerCard.appendChild(titleBookCard);
        headerCard.appendChild(bookMarks);

        const addBookmarkButton = document.createElement('div');
        addBookmarkButton.innerHTML = `
            <i class="addBookmarkButton fa fa-bookmark" id="addBookmarkButton"></i>
            `;

        const imgCard = document.createElement('img');
        imgCard.className = 'card-img';

        if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
          imgCard.src = 'img/unavailable.png';
        } else {
          imgCard.src = book.volumeInfo.imageLinks.thumbnail;
        }

        //Bookmark
        addBookmarkButton.onclick = function () {
          addBookToPochList(book, true);
        }
        card.appendChild(addBookmarkButton);


        cardContainer.appendChild(card);
        card.appendChild(headerCard);
        card.appendChild(idBookCard);
        card.appendChild(authorBookCard);
        card.appendChild(descriptionBookCard);
        card.appendChild(imgCard);

      });

      //Affichage des résultats    
      const titlePochList = document.createElement('h2');
      titlePochList.id = 'titlePochList';
      titlePochList.className = 'resultRech';
      titlePochList.innerHTML = "Résultats de la recherche";
      titlePochList.style.marginTop = "40px";
      const cardWrapper = document.createElement('div');
      cardWrapper.appendChild(titlePochList);
      cardWrapper.appendChild(cardContainer);
      content.insertBefore(cardWrapper, content.childNodes[0]);
    });

}


//Ajout , suppression de livre dans la pochlist
function addBookToPochList(book, bookToAdd) {
  const books = JSON.parse(sessionStorage.getItem('myPochList'));
  const found = books.find(e => e.id == book.id);

  if (found && bookToAdd) {
    createModal('ce livre existe déjà dans votre pochlist');
    return;
  }

  if (bookToAdd) {
    books.push(book);
    sessionStorage.setItem('myPochList', JSON.stringify(books));
    createModal("Le livre est ajouté dans votre pochlist");

  }

  const pochList = document.getElementById('livre-container');

  const card = document.createElement('div');
  card.id = 'poch-' + book.id;
  card.className = 'card';
  const idBookCard = document.createElement('h4');
  idBookCard.innerText = "Id : " + book.id;
  idBookCard.className = 'card-id';

  const titleBookCard = document.createElement('h4');
  titleBookCard.innerText = "Titre : " + book.volumeInfo.title;
  titleBookCard.className = 'card-title';

  const authorBookCard = document.createElement('p');
  authorBookCard.innerText = "Auteur : " + book.volumeInfo.authors;
  authorBookCard.className = 'card-author';
  if (book.volumeInfo.authors > 1) {
    book.volumeInfo.authors = book.volumeInfo.authors.slice(0, 2);
  }

  const descriptionBookCard = document.createElement('p');
  descriptionBookCard.innerText = "Description : " + book.volumeInfo.description;
  descriptionBookCard.className = 'card-description';
  if (descriptionBookCard === '' || descriptionBookCard === 'undefined') {
    descriptionBookCard.innerText = "Information manquante";
  } else if (descriptionBookCard.innerText.length > 200) {
    descriptionBookCard.innerText = descriptionBookCard.innerText.substring(0, 200) + '...';
  }

  const headerCard = document.createElement('div');
  headerCard.className = 'card-header';
  headerCard.appendChild(titleBookCard);


  //Suppresion de livre
  const removeButton = document.createElement('div');
  removeButton.innerHTML = `
  
  <i class="fa fa-trash removeButton"  id="removeButton"></i>`;

  removeButton.onclick = function () {
    const cardToDelete = document.getElementById('poch-' + book.id);
    cardToDelete.parentElement.removeChild(cardToDelete);
    createModal("Livre supprimé");


    let books = JSON.parse(sessionStorage.getItem('myPochList'));
    books = books.filter((b) => b.id != book.id);
    sessionStorage.setItem('myPochList', JSON.stringify(books));
  }

  card.appendChild(removeButton);

  const imgCard = document.createElement('img');
  imgCard.className = 'card-img';

  if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
    imgCard.src = 'img/unavailable.png';
  } else {
    imgCard.src = book.volumeInfo.imageLinks.thumbnail;
  }

  //Constructiond l'architecture pour l'affichage
  pochList.appendChild(card);
  card.appendChild(headerCard);
  card.appendChild(idBookCard);
  card.appendChild(authorBookCard);
  card.appendChild(descriptionBookCard);
  card.appendChild(imgCard);
}


