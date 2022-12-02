import { useQuery, } from '@apollo/client'
import { GET_AUTHORS, GET_BOOKS } from './services/queries'
import NavBar from './components/NavBar'
import { useState } from 'react'
import LoginForm from './components/LoginForm'


const App = () => {

  const [token, setToken] = useState(null)
  const [notify, setNofify] = useState('')

  const authors = useQuery(GET_AUTHORS)
  const books = useQuery(GET_BOOKS)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <LoginForm
        setToken={setToken}
        setError={setNofify}
        />
    )
  }

  return (
    <>
      <NavBar authors={authors.data.allAuthors} books={books.data.allBooks} />
    </>
  );
}

export default App;