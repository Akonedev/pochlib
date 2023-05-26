const addBookDiv = document.querySelector(".addBook");
  addBookDiv.innerHTML =``

function createModal() {
 
    let addModal = document.createElement("div");
    addModal.innerHTML = `<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Some text in the Modal..</p>
    </div>
    
    </div>`;
    container.appendChild(addModal);
    newQuery.after(addModal);
  }