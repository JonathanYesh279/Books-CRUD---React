import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onRemove, onSelect }) {
  return (
      <ul className="books-list">
        {books.map(book => 
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <button onClick={() => {onSelect(book)} }>Select</button>
              <button onClick={() => onRemove(book.id)}>Remove</button>
            </section>
          </li>
        )}
      </ul>
  );
}