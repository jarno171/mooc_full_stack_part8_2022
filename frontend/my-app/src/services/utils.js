import _ from 'lodash'

export const updateCacheAllBooks = (cache, QUERY, addBook, genres) => {
  cache.updateQuery({ query: QUERY, variables: { genreToSearch: "" } }, (data) => {
    if (!_.isEmpty(data)) {
      return {
        allBooks: data.allBooks.concat(addBook),
      }
    }
  })

  if (genres) {
    genres.forEach(genre => {
      cache.updateQuery({ query: QUERY, variables: { genreToSearch: genre } }, (data) => {
        if (!_.isEmpty(data)) {
          return {
            allBooks: data.allBooks.concat(addBook),
          }
        }
      })
    })
  }
}