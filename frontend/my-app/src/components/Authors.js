import { useState, } from 'react'
import _ from 'lodash'
import { useMutation } from '@apollo/client'
import { EDIT_BORN, GET_AUTHORS } from '../services/queries'


const Authors = ({ authors }) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: GET_AUTHORS } ]
  })

  const editBorn = (event) => {
    event.preventDefault()

    changeBorn({ variables: { name: name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  if (!_.isEmpty(authors)) {
    return (
      <>
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

        <h3>set birthyear</h3>

        <div>
          <form onSubmit={editBorn}>
            <p>
              name:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                name="name"
              />
            </p>
            <p>
              born:
              <input
                type="text"
                value={born}
                onChange={(event) => setBorn(event.target.value)}
                name="born"
              />
            </p>
            <p>
              <button type="submit">
                update
              </button>
            </p>
          </form>
        </div>
      </>
    )
  }
}

export default Authors