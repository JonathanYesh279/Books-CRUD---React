const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({txt: '', ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  },[filterByToEdit])

  function handleChange({target}) {
    const field = target.name
    let value = target.value
    setFilterByToEdit(prevFilter => ({...prevFilter, [field]: value}))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

    const { txt } = filterByToEdit
  return (
    <section className="book-filter">
      <h1>Filter Books</h1>
      <form onSubmit={onSubmitFilter} className="form-filter">
        <label htmlFor="txt">Books</label>
        <input value={txt || ''} onChange={handleChange} type="text" placeholder="By Title" id="txt" name="txt" />
        <button hidden>Filter</button>
      </form>
    </section>
  )
}