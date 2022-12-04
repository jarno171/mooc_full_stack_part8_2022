import { useQuery, useSubscription, useApolloClient, } from '@apollo/client'
import { GET_AUTHORS, BOOK_ADDED, GET_BOOKS, } from './services/queries'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'
import { updateCacheAllBooks } from './services/utils'


const App = () => {

  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const authors = useQuery(GET_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      
      updateCacheAllBooks(client.cache, GET_BOOKS, addedBook, addedBook.genres)

      window.alert(`new book ${addedBook.title} was added`)
    }
  })

  useEffect(() => {
    const storageToken = localStorage.getItem('books-user-token')

    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  if (authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <NavBar authors={authors.data.allAuthors} token={token} setToken={setToken} />
    </>
  )
}

export default App;