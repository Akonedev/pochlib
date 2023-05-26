// import createModal from "./createModal.js";

export default function searchBook() {

    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    url = url + title + author;

    if (!title || !author) {
        let message ="Veuiller préciser titre et auteur"; 
        createModal(container, newQuery, message);
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
