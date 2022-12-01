const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config')

const Book = require('./models/book')
const Author = require('./models/author')

mongoose.connect(config.MONGODB_URI)

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    bookCount(author: String): Int!
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Author: {
    bookCount: ({ name }) => Book.find({ author: name }).length
  },

  Query: {
    allBooks: async (root, args) => {

      if (!args.genre) {
        return Book.find({})
      }

      return Book.find( { genres: { $in: [ args.genre ] } } )
    },
    allAuthors: async (root, args) => {
      if (!args.author) {
        return Author.find({})
      }

      return Author.find( { name: { $in: [ args.author ] } } )
    },
    bookCount: async (root, args) => {
      return Book.collection.countDocuments( { author: args.author } )
    },
    authorCount: async () => Author.collection.countDocuments()
  },

  Mutation: {
    addBook: async (root, args) => {
      const findAuthor = await Author.findOne({ name: args.author })

      if (findAuthor) {
        const book = new Book({ ...args, author: findAuthor })
        return book.save()
      } else {
        const newAuthor = new Author({ name: args.author })
        newAuthor.save()

        const book = new Book({ ...args, author: newAuthor })
        return book.save()
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})