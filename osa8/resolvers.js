//resolveri määrittelee miten GraphQL-kyselyihin vastataan

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      if (author && genre) {
        const existingAuthor = await Author.findOne({ name: args.author });
        return Book.find({
          author: existingAuthor._id,
          genres: { $in: [genre] },
        }).populate("author");
      } else if (author) {
        const existingAuthor = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: existingAuthor._id }).populate(
          "author"
        );
        return books;
      } else if (genre) {
        return Book.find({ genres: { $in: [genre] } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async (root, args) => {
      console.log(args);
      console.log("Author.find");
      return Author.find({}).populate("bookList");
    },
    allUsers: async (root, args) => {
      return User.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: (author) => {
      const books = author.bookList;
      const bookCount = books.length;
      return bookCount;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(args);
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const existingAuthor = await Author.findOne({ name: args.author });
        console.log(existingAuthor);
        if (!existingAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
          });
          console.log(newAuthor);
          try {
            await newAuthor.save();
          } catch (error) {
            throw new GraphQLError("Saving author failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.name,
                error,
              },
            });
          }
          const book = new Book({ ...args, author: newAuthor._id });
          console.log(book);
          try {
            await book.save();
          } catch (error) {
            throw new GraphQLError("Saving book failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.name,
                error,
              },
            });
          }
          pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
          return book.populate("author");
        } else {
          existingAuthor.bookCount++;
          await existingAuthor.save();
          const book = new Book({
            ...args,
            author: existingAuthor._id,
          });
          console.log(book);
          try {
            await book.save();
          } catch (error) {
            throw new GraphQLError("Saving book failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.name,
                error,
              },
            });
          }
          pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
          return book.populate("author");
        }
      } catch (error) {
        console.error("Error adding book:", error);
        throw new Error("Unable to add book.");
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.born;
      return author.save();
    },
    createUser: async (root, args) => {
      console.log(args);
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      console.log(user);
      return user.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: {
              username: args.username,
              favouriteGenre: args.favouriteGenre,
            },
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
        username: user.username,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
