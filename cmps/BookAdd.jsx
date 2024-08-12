const { useEffect, useRef } = React


export function BookAdd({ isOpen, onAddBook, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog) {
      if (isOpen) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }
  }, [isOpen])

  function handleSubmit(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const bookData = {
      title: formData.get('title'),
      shortDesc: formData.get('shortDescription'),
      desc: formData.get('description')
    }
    onAddBook(bookData)
  }

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} className="add-book-modal">
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
        /><br />
      <label htmlFor="shortDescription">Short Description:</label>
        <textarea
          id="shortDescription"
          name="shortDescription">
          </textarea>
      <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description">
          </textarea>
      <section>
          <button>Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </section>
      </form>
    </dialog>
  )
}