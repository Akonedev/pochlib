import createModal from "./createModal.js";
//Ajout , suppression de livre dans la pochlist
export default function addBookToPochList(book, bookToAdd) {
  const books = JSON.parse(sessionStorage.getItem('myPochList'));
  const found = books.find(e => e.id == book.id);

  if (found && bookToAdd) {
      let message ="ce livre existe déjà dans votre pochlist"; 
      createModal(container, newQuery, message);
    return;
  }

  if (bookToAdd) {
    books.push(book);
    sessionStorage.setItem('myPochList', JSON.stringify(books));
    let message ="Le livre est ajouté dans votre pochlist"; 
    createModal(container, newQuery, message);

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
    let message ="Livre supprimé"; 
    createModal(container, newQuery, message);


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
