import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'bookDB';
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilterBy,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
    .then(books => {
      if (filterBy.txt) { 
        books = books.filter(book => book.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
      }
    console.log(books)
      return books
    })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
    .then(book => {
      return book
    })
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getDefaultFilterBy() {
  return {
    title: ''
  }
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const authors = ['John Doe', 'Jane Doe', 'Alice Wonderland', 'Bob The Builder', 'Charlie Brown', 'Dora The Explorer']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
    id: utilService.makeId(),
    title: utilService.makeLorem(2),
    subtitle: utilService.makeLorem(4),
    authors: [authors[utilService.getRandomIntInclusive(0, authors.length - 1)]],
    publishedDate: utilService.getRandomIntInclusive(1950, 2024),
    description: utilService.makeLorem(20),
    pageCount: utilService.getRandomIntInclusive(150, 600),
    categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
    thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
    language: "en",
    listPrice: {
      amount: utilService.getRandomIntInclusive(5, 100),
      currencyCode: "EUR",
      isOnSale: Math.random() > 0.7
    }
  }
  books.push(book)
  }
  
utilService.saveToStorage(BOOK_KEY, books);

console.log('books', books)
}
