import { useQuery, } from '@apollo/client'
import { GET_AUTHORS, GET_BOOKS } from './services/queries'
import NavBar from './components/NavBar'


const App = () => {

  const authors = useQuery(GET_AUTHORS)
  const books = useQuery(GET_BOOKS)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
      <NavBar authors={authors.data.allAuthors} books={books.data.allBooks} />
    </>
  );
}

export default App;