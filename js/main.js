import addBookButton from "./module/addBookButton.js";
import addBookToPochList from "./module/addBookToPochList.js";
import cancelSearch from "./module/cancelSearch.js";
import modal from "./module/createModal.js";
import searchBook from "./module/searchBook.js";
import searchFormEventListener from "./module/searchFormEventListener.js";
import addSearchForm from "./module/searchForm.js";

let newQuery = document.querySelector(".searchTitle");
const container = document.getElementById("myBooks");
const books = JSON.parse(sessionStorage.getItem('myPochList'));

window.container = container;
window.newQuery = newQuery;
window.addBookButton = addBookButton;
window.addBookToPochList = addBookToPochList;
window.cancelSearch = cancelSearch;
window.modal = modal;
window.searchBook = searchBook;
window.searchFormEventListener = searchFormEventListener;
window.addSearchForm = addSearchForm;

// Initialisation de la liste de livres
function main() {
  if (!books) {
    sessionStorage.setItem('myPochList', JSON.stringify([]));
  } else {
    books.map((b) => {
      addBookToPochList(b, false);
    });
  }
  addBookButton(container, newQuery);
}

main();

