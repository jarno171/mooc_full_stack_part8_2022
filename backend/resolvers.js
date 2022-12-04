const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const config = require('./utils/config')

const jwt = require('jsonwebtoken')

const JWT_SECRET = config.JWT_SECRET

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: ({ name }) => Book.find({ author: name }).length
  },

  Query: {
    allBooks: async (root, args) => {

      if (!args.genre) {
        return Book.find({}).populate('author')
      }

      return Book.find( { genres: { $in: [ args.genre ] } } ).populate('author')
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
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const findAuthor = await Author.findOne({ name: args.author })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let book

      if (findAuthor) {
        book = new Book({ ...args, author: findAuthor })
      } else {
        const newAuthor = new Author({ name: args.author })

        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        
        book = new Book({ ...args, author: newAuthor })
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author      
    },
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      try {
        await user.save()
      } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
}

module.exports = resolvers