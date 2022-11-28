import { useState, useEffect } from 'react'
import { getAuthors, getBooks } from './services/apolloClient'
import NavBar from './components/NavBar'


const App = () => {

  const [books, setBooks] = useState({ })
  const [authors, setAuthors] = useState({ })

  useEffect(() => {
    const fetchData = async () => {
      const books = await getBooks()
      const authors = await getAuthors()

      setBooks(books.data.allBooks)
      setAuthors(authors.data.allAuthors)
    }

    fetchData()
  }, [])

  return (
    <>
      <NavBar authors={authors} books={books} />
    </>
  );
}

export default App;