 // <------------------- Books Library System -------------------------->

class Book {
  constructor(isbn, title, author, copies) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.copies = copies;
  }
}

class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }
}

class Transaction {
  constructor(student, book) {
    this.student = student;
    this.book = book;
    this.timestamp = new Date();
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.students = [];
    this.transactions = [];
  }

  addBook(isbn, title, author, copies) {
    const book = new Book(isbn, title, author, copies);
    this.books.push(book);
  }

  addStudent(id, name) {
    const student = new Student(id, name);
    this.students.push(student);
  }

  findBook(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }

  findStudent(id) {
    return this.students.find((student) => student.id === id);
  }

  checkoutBook(studentId, isbn) {
    const student = this.findStudent(studentId);
    if (!student) {
      return "Student not found";
    }

    const book = this.findBook(isbn);
    if (!book) {
      return "Book not found";
    }

    if (book.copies === 0) {
      return "No copies of the book are available";
    }

    book.copies--;
    student.borrowedBooks.push(book);
    this.transactions.push(new Transaction(student, book));
    return "Book checked out successfully";
  }

  returnBook(studentId, isbn) {
    const student = this.findStudent(studentId);
    if (!student) {
      return "Student not found";
    }

    const book = this.findBook(isbn);
    if (!book) {
      return "Book not found";
    }

    const transactionIndex = this.transactions.findIndex(
      (transaction) =>
        transaction.student === student && transaction.book === book
    );

    if (transactionIndex === -1) {
      return "Student did not borrow this book";
    }

    book.copies++;
    student.borrowedBooks.splice(student.borrowedBooks.indexOf(book), 1);
    this.transactions.splice(transactionIndex, 1);
    return "Book returned successfully";
  }
}

// Usage
const myLibrary = new Library("My Library");

myLibrary.addBook("ISBN1", "Book 1", "Author 1", 5);
myLibrary.addBook("ISBN2", "Book 2", "Author 2", 3);

myLibrary.addStudent(1, "Alice");
myLibrary.addStudent(2, "Bob");

console.log(myLibrary.checkoutBook(1, "ISBN1")); // Book checked out successfully
console.log(myLibrary.checkoutBook(1, "ISBN1")); // Book not found (ISBN1)
console.log(myLibrary.checkoutBook(3, "ISBN3")); // Student not found (ID 3)
console.log(myLibrary.checkoutBook(2, "ISBN1")); // No copies of the book are available

console.log(myLibrary.returnBook(1, "ISBN1")); // Book returned successfully
console.log(myLibrary.returnBook(1, "ISBN1")); // Student did not borrow this book
console.log(myLibrary)
