
export function AppHeader({page = 'home', onSetPage}) {

    function onPageChange(ev, page) {
        ev.preventDefault()
        onSetPage(page)
    }    

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Books</h1>
                <nav>
                    <a href="" className={(page === 'home') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'home')}>
                        Home
                    </a> |
                    <a href="" className={(page === 'about') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'about')}>
                        About Us
                    </a> |
                    <a href="" className={(page === 'book-index') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'book-index')}>
                        Book Index
                    </a>
                </nav>
            </section>
        </header>
    )
}
