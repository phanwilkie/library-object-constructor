//TO DO
//USE THE CONSTRUCTOR
//USE FUNCTION READ/UNREAD FUNCTION OFF THE PROTOTYPE

let myLibrary = [];
let id = 3;

myLibrary.push(
    {'id': 1,'title': 'Eye of the World', 'author': 'Robert Jordan', 'page':735, 'readStatus': true},
    {'id': 2,'title': 'The Great Hunt', 'author': 'Robert Jordan', 'page':935, 'readStatus': true},
    {'id': 3,'title': 'A Dragon Reborn', 'author': 'Robert Jordan', 'page':834, 'readStatus': false},
);

function Book(title, author, pages, readStatus) {
    this.id = bookID + 1; //NEED TO REMOVE BOOKID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

//show book to library
function addBookToLibrary() {
    const bookListTable = document.createElement('table');
    bookListTable.setAttribute("id", "booktable");
    bookListTable.innerHTML = "<thead><th>ID</th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th><th>Options</th></thead>"
    for (book of myLibrary ) {
        const newRow = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdTitle = document.createElement("td");
        const tdAuthor = document.createElement("td");
        const tdPages = document.createElement("td");
        const tdRead = document.createElement("td");
        const tdOptions = document.createElement("td");
        const readBookBtn = document.createElement("button");
        const btnTxtRead = document.createTextNode("Read / Unread");
        const deleteBookBtn = document.createElement("button");
        const btnTxt = document.createTextNode("Delete book");

        tdId.textContent = book.id;
        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.page;
        tdRead.textContent = book.readStatus;
        
        //Add action buttons to table cell
        tdOptions.appendChild(readBookBtn);
        readBookBtn.appendChild(btnTxtRead);
        readBookBtn.setAttribute("class", "readBookBtn");
        readBookBtn.setAttribute("id", "readBookBtn-" + book.id);
 
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
    idField.value = Number(id) + 1;
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
    const fd = new FormData(form); //NEED TO REFACTOR THIS TO OBJECT CONSTRUCTOR
    const obj = Object.fromEntries(fd); //NEED TO REFACTOR THIS TO OBJECT CONSTRUCTOR
    //manipulate the object property
    obj.id = Number(obj.id);
    if (obj.readStatus === 'on') {
        obj.readStatus = true;
    }
    else {
        obj.readStatus = false;
    };
    const newBook = obj;
    console.log(obj);
    myLibrary.push(newBook);
    id = idField.value;
    
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

//MARK BOOK AS READ/UNREAD
function readUnreadBook(id) {
    objIndex = myLibrary.findIndex(obj => obj.id === id);
    if (myLibrary[objIndex].readStatus === true) {
        myLibrary[objIndex].readStatus = false;
    }
    else {
        myLibrary[objIndex].readStatus = true;
    }
 
    clearTable()
    init();
}

function readBtnAddEventListener() {
    const readBookAllBtns = document.querySelectorAll('.readBookBtn');
    // console.log(readBookAllBtns);
    readBookAllBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const buttonId = this.getAttribute('id');
            // console.log(buttonId);
            const matchingID = Number(buttonId.split('-')[1]);
            readUnreadBook(matchingID);
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
    readBtnAddEventListener();
}

//INITIALISATION
init();


