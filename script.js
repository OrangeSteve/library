
let myLibrary = [];
let bookCards = [];

const mainContent = document.querySelector(`main`);

const addBookForm = document.querySelector(`#add-book-form`);
addBookForm.remove();

const bookCardHolder = document.createElement(`div`);
bookCardHolder.classList.add(`card-holder`);
mainContent.appendChild(bookCardHolder);

const addBookMenuButton = document.querySelector(`#add-book-button`);
addBookMenuButton.addEventListener(`click`, openAddBookMenu);


for (let i = 0; i < 150; i++) {
    const newBook = new Book(`Book ${i}`, `Mr A.${i}`, `${Math.round(100 + (Math.random() * 950))}`, Math.round(Math.random()));
    addBookToLibrary(newBook);
}

refreshBooks();



function openAddBookMenu() {
    bookCardHolder.remove();
    addBookMenuButton.removeEventListener(`click`, openAddBookMenu);
    addBookMenuButton.textContent = `Cancel`;
    addBookMenuButton.addEventListener(`click`, closeAddBookMenu);
    mainContent.appendChild(addBookForm);
}

function closeAddBookMenu() {
    addBookForm.remove();
    addBookMenuButton.removeEventListener(`click`, closeAddBookMenu);
    addBookMenuButton.textContent = `Add Book`;
    addBookMenuButton.addEventListener(`click`, openAddBookMenu);
    mainContent.appendChild(bookCardHolder);
    refreshBooks();
}



function refreshBooks() {
    hideBooks();
    showBooks();
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        const readString = read ? "have read." : "not yet read.";
        return `${title} by ${author}, ${pages} pages,${readString}`;
    }
}

function BookCard(card, title, author, pages, read) {
    this.card = card;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.card.appendChild(this.title);
    this.card.appendChild(this.author);
    this.card.appendChild(this.pages);
    this.card.appendChild(this.read);
}




function addBookToLibrary(book) {
    myLibrary.push(book);
}

function hideBooks() {

    let numCardsToRemove = bookCards.length - 1;

    for (let i = numCardsToRemove; i >= 0; i--) {
        bookCards[i].card.remove();
    }

    bookCards = [];
}

function showBooks() {

    if (myLibrary.length > 0)
        for (let i = 0; i < myLibrary.length; i++) {
            bookCards[i] = new BookCard(document.createElement(`div`),
                document.createElement(`span`),
                document.createElement(`span`),
                document.createElement(`span`),
                document.createElement(`span`));

            bookCards[i].title.textContent = `${myLibrary[i].title}`;
            bookCards[i].author.textContent = `by ${myLibrary[i].author}`;
            bookCards[i].pages.textContent = `${myLibrary[i].pages} pages`;
            bookCards[i].card.classList.add(`book-card`);
            if (myLibrary[i].read == true) {
                bookCards[i].read.textContent = "Read";
                bookCards[i].card.classList.add(`read`);
            } else {
                bookCards[i].read.textContent = "Not read";
                bookCards[i].card.classList.add(`not-read`);
            }


            bookCardHolder.appendChild(bookCards[i].card);
        }
}


