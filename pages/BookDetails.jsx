const { useRef, useEffect } = React

export function BookDetails({ isOpen, book, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  })

  if (!book) {
    console.log('no book details')
    return null
  }

  return (
    <dialog ref={dialogRef} className='book-details-modal'>
      <h2>{book.title}</h2>
      <h3>
        '{book.authors}-{book.publishedDate}'
      </h3>
      <h4>pages:{book.pageCount}</h4>
      <h4>lang: {book.language}</h4>
      <p>{book.description}</p>
      <p>Price:
        {`${book.listPrice.amount} ${book.listPrice.currencyCode}`}
      </p>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}