//Annuler la recherche
export default function cancelSearch() {
  const addBookDiv = document.querySelector(".cancelButton");
  addBookDiv.innerHTML = `
      <button type="button" onclick="addSearchForm()" id="cancelButton" class="cancelButton"</button>`;
  newQuery.after(cancelButton);
  window.location.reload(false)

}
