import _ from 'lodash'
import { useState } from 'react'

const Books = ({ books }) => {

  const [genreFilter, setGenreFilter] = useState('')

  if (!_.isEmpty(books)) {
    const genres = books.reduce((accumulator, book) => accumulator.concat(book.genres), [])

    const uniqueGenres = _.uniq(genres)

    let booksToShow

    if (genreFilter) {
      booksToShow = books.filter((book) => book.genres.includes(genreFilter))
    } else {
      booksToShow = books
    }

    return (
      <>
        <div>
          <table>
            <tbody>
              <tr>
                <th></th><th>author</th><th>published</th>
              </tr>
              {booksToShow.map((book) => (
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