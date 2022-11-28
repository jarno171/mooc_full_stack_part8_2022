import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

const executeQuery = async (query) => {
  const result = await client.query({ query })
  return result
}

const getAuthors = () => {
  const query = gql`
    query {
      allAuthors  {
        name,
        born,
        bookCount
      }
    }
  `

  return executeQuery(query)
}

const getBooks = () => {
  const query = gql`
    query {
      allBooks  {
        title,
        author,
        published
      }
    }
  `

  return executeQuery(query)
}

export {
  getAuthors,
  getBooks,
}