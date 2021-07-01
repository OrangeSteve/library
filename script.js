let myLibrary = JSON.parse(localStorage.getItem("mylibrary") || "[]");
console.log(`Number of books: ${myLibrary.length}`);
myLibrary.forEach(function (book, index) {
    console.log("[" + index + "]:" + myLibrary[index].title + " by " + myLibrary[index].author);
});

const mainContent = document.querySelector(`main`);
const addBookForm = document.getElementById(`add-book-form`);
const bookTitleInput = document.querySelector(`#book-title`);
const bookAuthorInput = document.querySelector(`#book-author`);
const bookPagesInput = document.querySelector(`#book-pages`);
const bookReadRadio = document.querySelector(`#book-read`);
const bookReadingRadio = document.querySelector(`#book-reading`);
const bookNotReadRadio = document.querySelector(`#book-not-read`);
const readStatusRadios = document.getElementsByName(`book-read-status`);
const bookCardHolder = document.createElement(`div`);
const addBookMenuButton = document.querySelector(`#add-book-button`);

addBookForm.addEventListener(`submit`,()=>{
    let readStatus;
    for (let i = 0; i < readStatusRadios.length; i++) {
       if (readStatusRadios[i].checked) {
           readStatus = readStatusRadios[i].value;
           break;
       }
   }
   const bookToAdd = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, readStatus);
   addBookToLibrary(bookToAdd);
   closeAddBookMenu();
});

addBookMenuButton.addEventListener(`click`, openAddBookMenu);

addBookForm.remove();
let bookCards = [];
bookCardHolder.classList.add(`card-holder`);
mainContent.appendChild(bookCardHolder);
refreshBooks();

function refreshBooks() {
    hideBooks();
    saveLibrary();
    showBooks();
}

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




function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        let readString;
        switch (read) {
            case 0: readString = "have read.";
                break;
            case 1: readString = "am currently reading.";
                break;
            case 2: readString = "have not read."
        }

        return `${title} by ${author}, ${pages} pages,${readString}`;
    }
}

function BookCard(index, card, title, author, pages, read, removeBook) {
    this.index = index;
    this.card = card;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.removeBook = removeBook;
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
            bookCards[i].title.classList.add(`card-info`);
            bookCards[i].author.classList.add(`card-info`);
            bookCards[i].pages.classList.add(`card-info`);
            bookCards[i].removeBook.textContent = `Remove from library`;
            bookCards[i].removeBook.style.setProperty("background-color", "red");
            bookCards[i].removeBook.style.setProperty("border", "2px outset black");
            bookCards[i].card.classList.add(`book-card`);
            if (myLibrary[i].read == 0) {
                bookCards[i].read.textContent = "Read";
                bookCards[i].read.style.setProperty("background-color", "green");
                bookCards[i].card.classList.add(`read`);

            } else if (myLibrary[i].read == 1) {
                bookCards[i].read.textContent = "Reading";
                bookCards[i].read.style.setProperty("background-color", "orange");
                bookCards[i].card.classList.add(`reading`);

            } else {
                bookCards[i].read.textContent = "Not read";
                bookCards[i].read.style.setProperty("background-color", "red");
                bookCards[i].card.classList.add(`not-read`);
            }

            bookCards[i].read.addEventListener(`click`, () => {
                myLibrary[i].read++;
                if (myLibrary[i].read > 2) {
                    myLibrary[i].read = 0;
                }
                refreshBooks();
            })

            bookCards[i].removeBook.addEventListener(`click`, () => {
                myLibrary.splice(bookCards[i].index, 1);
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
    saveLibrary();
}




function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function saveLibrary() {
    localStorage.setItem(`mylibrary`, JSON.stringify(myLibrary));
}



