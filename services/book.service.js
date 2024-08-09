import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'bookDB';
// _createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
  .then(books => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regExp.test(book.title))
      }

      if (filterBy.minPrice) {
        books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
      }

      if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
      }

      if (filterBy.category) {
        books = books.filter(book => book.categories.includes(filterBy.category))
      }

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
