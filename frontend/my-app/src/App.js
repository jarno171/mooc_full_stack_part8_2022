import { useQuery, } from '@apollo/client'
import { GET_AUTHORS, } from './services/queries'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'


const App = () => {

  const [token, setToken] = useState(null)

  const authors = useQuery(GET_AUTHORS)

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