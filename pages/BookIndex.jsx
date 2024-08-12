import { bookService } from "../services/book.service.js";  
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx"; 
import { BookAdd } from "../cmps/BookAdd.jsx";
import { BookDetails } from "../pages/BookDetails.jsx";



const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilterBy())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
 


useEffect(() => {
    bookService.query(filterBy)
      .then(books => setBooks(books))
      .catch(err => {
        console.error('Cannot load books', err)
      })
}, [filterBy])
  
  function onAddBook(book) {
    bookService.save(book)
      .then(savedBook => {
        setBooks([...books, savedBook])
        setIsAddModalOpen(false)
      })
  }
  
  function onRemoveBook(bookId) {
    bookService.remove(bookId)
      .then(() => {
        setBooks(books.filter(book => bookId !== book.id))
      })
  }

  function onSelectedBook(book) {
    setSelectedBook(book)
    setIsDetailsModalOpen(true)
  }




  return (
    <scetion className='book-index'>
      <h1>Relax and Read!</h1>
      <button onClick={() => setIsAddModalOpen(true)}>Add Book</button>
      {<BookAdd
        isOpen={isAddModalOpen}
        onAddBook={onAddBook}
        onClose={() => setIsAddModalOpen(false)}
      />}
      {selectedBook &&
        <BookDetails
          isOpen={isDetailsModalOpen} 
          book={selectedBook}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      }
      <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <BookList books={books} onRemove={onRemoveBook} onSelect={onSelectedBook} />
    </scetion>
  );
}