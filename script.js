let myLibrary = [];
let idCounter = 3; //CHANGE IT BACK TO 0 WHEN STARTING FROM SCRATCH

// myLibrary.push(
//     Book{'id': 1,'title': 'Eye of the World', 'author': 'Robert Jordan', 'page':735, 'readStatus': true},
//     Book{'id': 2,'title': 'The Great Hunt', 'author': 'Robert Jordan', 'page':935, 'readStatus': true},
//     Book{'id': 3,'title': 'A Dragon Reborn', 'author': 'Robert Jordan', 'page':834, 'readStatus': false},
// );

const book1 = new Book(1, 'Eye of the World', 'Robert Jordan', 735, true);
const book2 = new Book(2, 'The Great Hunt', 'Robert Jordan', 800, true);
const book3 = new Book(3, 'The Dragon Reborn', 'Robert Jordan', 900, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function Book(id, title, author, pages, readStatus) {
    this.id = id; //NEED TO REMOVE BOOKID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.readUnreadBook = function() {
    this.readStatus = !this.readStatus
}

//show book to library
function addBookToLibrary() {
    const bookListTable = document.createElement('table');
    bookListTable.setAttribute("id", "booktable");
    //create table headers
    bookListTable.innerHTML = "<thead><th>ID</th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th><th>Options</th></thead>"
    for (book of myLibrary ) {
        //populate each row and column
        const newRow = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdTitle = document.createElement("td");
        const tdAuthor = document.createElement("td");
        const tdPages = document.createElement("td");
        const tdRead = document.createElement("td");
        const tdOptions = document.createElement("td");
        
        tdId.textContent = book.id;
        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.pages;
        tdRead.textContent = book.readStatus;
        
        //Add Read + Unread toggle
        const readBookBtn = document.createElement("button");
        readBookBtn.textContent = book.readStatus ? 'Mark as Unread' : 'Mark as Read';
        readBookBtn.setAttribute("class", "readBookBtn");
        readBookBtn.setAttribute("id", "readBookBtn-" + book.id);
        tdOptions.appendChild(readBookBtn);
        
        //prototypical inheritance from book prototype
        readBookBtn.addEventListener('click', function() {
            const bookId = this.getAttribute('id');
            const matchingID = Number(bookId.split('-')[1]);
            const book = myLibrary.find(book => book.id === matchingID);
            if (book) {
                book.readUnreadBook();
                clearTable();
                init();
            }
        })
        
        //Add Delete button
        const deleteBookBtn = document.createElement("button");
        const btnTxt = document.createTextNode("Delete book");
        tdOptions.appendChild(deleteBookBtn);
        deleteBookBtn.appendChild(btnTxt);
        deleteBookBtn.setAttribute("class", "deleteBookBtn");
        deleteBookBtn.setAttribute("id", "deleteBookBtn-" + book.id);

        newRow.appendChild(tdId);
        newRow.appendChild(tdTitle);
        newRow.appendChild(tdAuthor);
        newRow.appendChild(tdPages);
        newRow.appendChild(tdRead);
        newRow.appendChild(tdOptions);

        bookListTable.appendChild(newRow);
    }
    const target = document.querySelector(".target");
    target.appendChild(bookListTable);
}

//OPEN NEW BOOK MODAL INTERACTION
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const idField = document.querySelector("#id");

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    idField.value = Number(idCounter) + 1;
  };

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modalClose();
    }
  });

//ADD NEW BOOK TO ARRAY OF OBJECTS VIA FORM SUBMISSION
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formId = document.querySelector('#id').value;
    let formTitle = document.querySelector('#title').value;
    let formAuthor = document.querySelector('#author').value;
    let formPages = document.querySelector('#pages').value;
    let formStatus = document.querySelector('#read').value;

    let newBook = new Book(formId, formTitle, formAuthor, formPages, formStatus); //calling the constructor

    newBook.id = Number(newBook.id);
    newBook.pages = Number(newBook.pages);
    if (newBook.readStatus === 'on') {
        newBook.readStatus = true;
    }
    else {
        newBook.readStatus = false;
    };

    myLibrary.push(newBook);
    idCounter = Number(formId);
    
    form.reset();
    closeModal();
    clearTable()
    init();

})

//ADD REMOVE BUTTON AGAINST EACH BOOK
function deleteBook(id) {
    //delete object with matching id from array
    const deleteConfirmation = confirm('Are you sure you want to delete this book?')
    if (deleteConfirmation) {
        const newLibrary = myLibrary.filter(object => {
            return object.id !== id;
        })
        myLibrary = newLibrary;
        
        clearTable()
        init();
    }
}

function deleteBtnAddEventLister() {
    const deleteBookAllBtns = document.querySelectorAll('.deleteBookBtn');
    deleteBookAllBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const buttonId = this.getAttribute('id');
            const matchingID = Number(buttonId.split('-')[1]);
            deleteBook(matchingID);
        })
    })
}

//CLEAR TABLE CRUD
function clearTable() {
    bookTable = document.querySelector("#booktable");
    bookTable.remove();
}

//RE-INITIALISATION FUNCTIONS
function init() {
    addBookToLibrary();
    deleteBtnAddEventLister();
    // readBtnAddEventListener();
}

//INITIALISATION
init();


