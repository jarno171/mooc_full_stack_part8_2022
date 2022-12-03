import _ from 'lodash'
import { useState } from 'react'
import { useQuery, } from '@apollo/client'
import { GET_BOOKS, GET_GENRES, } from '../services/queries'

const Books = () => {

  const [genreFilter, setGenreFilter] = useState('')

  const books = useQuery(GET_BOOKS, {
    variables: { genreToSearch: genreFilter },
  })

  const genres = useQuery(GET_GENRES)

  if (books.loading || genres.loading)  {
    return <div>loading...</div>
  }

  const booksData = books.data.allBooks
  const genreData = genres.data.allBooks

  if (!_.isEmpty(booksData)) {
    const genres = genreData.reduce((accumulator, book) => accumulator.concat(book.genres), [])

    const uniqueGenres = _.uniq(genres)

    return (
      <>
        <div>
          <table>
            <tbody>
              <tr>
                <th></th><th>author</th><th>published</th>
              </tr>
              {booksData.map((book) => (
                <tr key={book.title}>
                  <td>
                    {book.title}
                  </td>
                  <td>
                    {book.author.name}
                  </td>
                  <td>
                    {book.published}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          {uniqueGenres.map(genre => (
            <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
          ))}
          <button onClick={() => setGenreFilter('')}>all genres</button>
        </div>
      </>
    )
  }
}

export default Books