import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_BOOKS, GET_AUTHORS } from '../services/queries'

const AddBook = () => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newPublished, setNewPublished] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newGenresList, setNewGenresList] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: GET_BOOKS }, { query: GET_AUTHORS }  ]
  })

  const addBook = (event) => {
      event.preventDefault()

      createBook({ variables: { title: newTitle, published: parseInt(newPublished), author: newAuthor, genres: newGenresList } })

      setNewTitle('')
      setNewAuthor('')
      setNewPublished('')
      setNewGenre('')
      setNewGenresList([])
  }

  const addGenre = (event) => {
    event.preventDefault()
    setNewGenresList(newGenresList.concat(newGenre))
    setNewGenre('')
  }


  return (
    <>
      <form onSubmit={addBook}>
        <p>
          title:
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            name="title"
          />
        </p>
        <p>
          author:
          <input
            type="text"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            name="author"
          />
        </p>
        <p>
          published:
          <input
            type="text"
            value={newPublished}
            onChange={(event) => setNewPublished(event.target.value)}
            name="published"
          />
        </p>
        <p>
          add genre:
          <input
            type="text"
            value={newGenre}
            onChange={(event) => setNewGenre(event.target.value)}
            name="genre"
          />
          <button onClick={(event) => addGenre(event)}>add genre</button>
        </p>
        genres:
        {newGenresList.join(' ')}
        <p>
          <button type="submit">
            create
          </button>
        </p>
      </form>
    </>
  )

}

export default AddBook