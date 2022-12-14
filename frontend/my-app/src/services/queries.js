import { gql, } from '@apollo/client'

export const GET_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    author {
      name
    }
    published,
    genres
  }
`

export const GET_BOOKS = gql`
  query($genreToSearch: String) {
    allBooks(genre: $genreToSearch)  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`