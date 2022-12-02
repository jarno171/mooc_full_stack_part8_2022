import _ from 'lodash'

const Books = ({ books }) => {
  if (!_.isEmpty(books)) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th><th>author</th><th>published</th>
            </tr>
            {books.map((book) => (
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
    )
  }
}

export default Books