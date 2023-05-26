export default function createModal(container, newQuery, message) {
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
