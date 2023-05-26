// import addSearchForm from "./searchForm.js";

// const cstSearchForm = () => addSearchForm;
// window.wSearchform = addSearchForm;
//fonction bouton "ajouter un livre"
export default function addBookButton(container, newQuery) {
    let addButton = document.createElement("div");
    addButton.innerHTML = `<div class="addBook">
        <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
      </div>`;
    container.appendChild(addButton);
    newQuery.after(addButton);
}
