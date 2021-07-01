const mainContent = document.querySelector(`main`);
const addBookForm = document.querySelector(`#add-book-form`);
const bookTitleInput=document.querySelector(`#book-title`);
const bookAuthorInput=document.querySelector(`#book-author`);
const bookPagesInput=document.querySelector(`#book-pages`);
const bookReadRadio=document.querySelector(`#book-read`);
const bookReadingRadio=document.querySelector(`#book-reading`);
const bookNotReadRadio=document.querySelector(`#book-not-read`);
const readStatusRadios=document.getElementsByName(`book-read-status`);
const bookCardHolder = document.createElement(`div`);
const addBookMenuButton = document.querySelector(`#add-book-button`);

let myLibrary = [];
let bookCards = [];

addBookForm.remove();
bookCardHolder.classList.add(`card-holder`);
mainContent.appendChild(bookCardHolder);
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
        let readString;
        switch (read){
            case 0:readString="have read.";
            break;
            case 1: readString="am currently reading.";
            break;
            case 2: readString="have not read."
        }
     
        return `${title} by ${author}, ${pages} pages,${readString}`;
    }
}

function BookCard(index,card, title, author, pages, read,removeBook) {
    this.index=index;
    this.card = card;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.removeBook=removeBook;
    this.card.appendChild(this.title);
    this.card.appendChild(this.author);
    this.card.appendChild(this.pages);
    this.card.appendChild(this.read);
    this.card.appendChild(this.removeBook);
}

function showBooks() {
    if (myLibrary.length > 0)
        for (let i = 0; i < myLibrary.length; i++) {
            bookCards[i] = new BookCard(
                i,
                document.createElement(`div`),
                document.createElement(`span`),
                document.createElement(`span`),
                document.createElement(`span`),
                document.createElement(`span`),
                document.createElement(`div`));

            bookCards[i].title.textContent = `${myLibrary[i].title}`;
            bookCards[i].author.textContent = `by ${myLibrary[i].author}`;
            bookCards[i].pages.textContent = `${myLibrary[i].pages} pages`;
            bookCards[i].removeBook.textContent=`Remove from library`;
            bookCards[i].card.classList.add(`book-card`);
            if (myLibrary[i].read ==0) {
                bookCards[i].read.textContent = "Read";
                bookCards[i].card.classList.add(`read`);
            }else if(myLibrary[i].read==1){
                bookCards[i].read.textContent = "Reading";
                bookCards[i].card.classList.add(`reading`);

            } else {
                bookCards[i].read.textContent = "Not read";
                bookCards[i].card.classList.add(`not-read`);
            }

bookCards[i].read.addEventListener(`click`,()=>{
    myLibrary[i].read++;
    if (myLibrary[i].read>2){
        myLibrary[i].read=0;
    }
    refreshBooks();
})

            bookCards[i].removeBook.addEventListener(`click`,()=>{
                myLibrary.splice(bookCards[i].index,1);
                refreshBooks();
                    });

            bookCardHolder.appendChild(bookCards[i].card);
        }
}


function hideBooks() {

    let numCardsToRemove = bookCards.length - 1;
    for (let i = numCardsToRemove; i >= 0; i--) {
        bookCards[i].card.remove();
    }
    bookCards = [];
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}