let myLibrary = [];

let validTitle;
let validAuthor;
let validPagesNumber;
let ifNewBook;

class Book {
  constructor(title, author, numberOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary() {

  validTitle = false;
  validAuthor = false;
  validPagesNumber = false;

  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let numberOfPages = document.getElementById('numberOfPages').value;
  let readStatus = document.getElementById('bookStatus').checked;

  validateTitle(title.trim());
  validateAuthor(author.trim());
  validateNumberOfPages(numberOfPages);

  if (validTitle && validAuthor && validPagesNumber) {
    let book = new Book(title, author, numberOfPages, readStatus);

    checkIfNewBook(book);

    if (ifNewBook) {
      myLibrary.push(book);
      displayBooks();
      document.getElementById('titleError').innerHTML = "";
    } else {
      document.getElementById('titleError').innerHTML = "This book is already exist!";
    }
  }
}

function displayBooks() {

  DeleteRows();
  let table = document.querySelector('.table');

  for (i = 0; i < myLibrary.length; i++) {

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let removeBook = document.createElement('div');
    const image = document.createElement('img');
    image.src = 'img/trash-can-white.png';
    let status = document.createElement('button');

    td1.style.cssText = 'width: 11rem; height:3rem; text-align: center';
    td2.style.cssText = 'width: 11rem; height:3rem; text-align: center';
    td3.style.cssText = 'width: 11rem; height:3rem; text-align: center';
    td4.style.cssText = 'width: 11rem; height:3rem; text-align: center';
    td5.style.cssText = 'width: 11rem; height:3rem;; text-align: center';

    removeBook.className = "remove";
    removeBook.setAttribute('data-index', i);
    removeBook.setAttribute('id', 'remove');
    image.className = "removeTrash";
    image.setAttribute('data-index', i);

    status.className = "status";
    status.setAttribute('data-index', i);
    status.setAttribute('id', 'status');

    td1.innerHTML = myLibrary[i].title;
    td2.innerHTML = myLibrary[i].author;
    td3.innerHTML = myLibrary[i].numberOfPages;
    status.innerHTML = myLibrary[i].readStatus;
    td4.appendChild(status);
    removeBook.appendChild(image);
    td5.appendChild(removeBook);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
  }

  booksCounter();

  //remove book when click remove image
  const removeBooks = document.querySelectorAll('.removeTrash');
  removeBooks.forEach(removeBook => {
    removeBook.addEventListener('click', function handleClick(event) {
      removeBook.setAttribute('style', 'background-color: yellow;');
      const target = event.target;
      var buttonIndex = target.getAttribute('data-index');
      myLibrary.splice(buttonIndex, 1);
      displayBooks()
    });
  });

  //change status when click status buttons
  const statusButtons = document.querySelectorAll('.status');
  statusButtons.forEach(status => {
    status.addEventListener('click', function handleClick(event) {
      const target = event.target;
      var buttonIndex = target.getAttribute('data-index');
      changeStatus(buttonIndex);
      displayBooks()
    });
  });

  const deleteAll = document.querySelectorAll('.deleteAll');
  deleteAll.forEach(status => {
    status.addEventListener('click', function handleClick(event) {
      myLibrary = [];
      displayBooks()
    });
  });

}//function displayBooks

function DeleteRows() {
  let table = document.querySelector('.table');
  var rowCount = table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function changeStatus(index) {
  for (i = 0; i < myLibrary.length; i++) {

    if (i == index) {
      if (myLibrary[i].readStatus == true) {
        myLibrary[i].readStatus = false;
      } else {
        myLibrary[i].readStatus = true;
      }
    }
  }
}

function booksCounter() {
  let readBooks = 0;
  let unreadBooks = 0;
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].readStatus == true) {
      ++readBooks;
    } else {
      ++unreadBooks;
    }
  }
  document.querySelector(".totalBooks").innerHTML = myLibrary.length;
  document.querySelector(".readBooks").innerHTML = readBooks;
  document.querySelector(".unreadBooks").innerHTML = unreadBooks;
}

function validateTitle(title) {
  if (title == "") {
    document.getElementById('titleError').innerHTML = "Title is required";
  }
  else {
    document.getElementById('titleError').innerHTML = "";
    validTitle = true;
  }
}

function validateAuthor(author) {
  if (author == "") {
    document.getElementById('authorError').innerHTML = "author is required";
  }
  else {
    document.getElementById('authorError').innerHTML = "";
    validAuthor = true;
  }
}

function validateNumberOfPages(number) {
  if (number.toString().length == 0) {
    document.getElementById('numberOfPagesError').innerHTML = "Please enter a number bigger than 0";
  }
  else if (parseInt(number) <= 0) {
    document.getElementById('numberOfPagesError').innerHTML = "Please enter a number bigger than 0";
  }
  else if (parseInt(number) > 0) {
    document.getElementById('numberOfPagesError').innerHTML = "";
    validPagesNumber = true;
  }
}

function checkIfNewBook(book) {

  ifNewBook = true;
  for (i = 0; i < myLibrary.length; i++) {

    if ((myLibrary[i].title === book.title) && (myLibrary[i].author === book.author)) {
      ifNewBook = false;
    }
  }
}