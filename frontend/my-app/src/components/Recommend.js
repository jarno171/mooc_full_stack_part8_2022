import { useQuery, } from '@apollo/client'
import { GET_USER, GET_BOOKS, } from '../services/queries'

const Recommend = () => {
  const user = useQuery(GET_USER)
  const books = useQuery(GET_BOOKS)

  if (user.loading || books.loading)  {
    return <div>loading...</div>
  }

  const filteredBooks = books.data.allBooks.filter((book) => book.genres.includes(user.data.me.favouriteGenre))

  return (
    <>
    <div>
      <h3>recommendations</h3>
      <p>books in your favorite genre <b>{user.data.me.favouriteGenre}</b></p>

      <table>
            <tbody>
              <tr>
                <th></th><th>author</th><th>published</th>
              </tr>
              {filteredBooks.map((book) => (
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
    </>
  )
}

export default Recommend