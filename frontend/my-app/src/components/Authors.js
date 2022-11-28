import _ from 'lodash'

const Authors = ({ authors }) => {
  if (!_.isEmpty(authors)) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th><th>born</th><th>books</th>
            </tr>
            {authors.map((author) => (
              <tr key={author.name}>
                <td>
                  {author.name}
                </td>
                <td>
                  {author.born}
                </td>
                <td>
                  {author.bookCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Authors