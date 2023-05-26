//Listener pour les boutons
export default function searchFormEventListener() {

  document.getElementById('cancelButton').addEventListener('click', function () {
    cancelSearch();
  })

  document.getElementById('searchButton').addEventListener('click', function () {
    searchBook();

  })

}