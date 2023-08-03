const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const { v1: uuid } = require("uuid");

//sisältää sovelluksen käyttämän GraphQL-skeeman
const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]!
    }
    type User {
      username: String!
      favouriteGenre: String
      id: ID!
    }
    type Token {
      value: String!
      username: String!
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String]!
        ): Book
        editAuthor(
            name: String!
            born: Int!
            bookCount: Int
        ): Author
        createUser(
          username: String!
          favouriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        allUsers: [User!]!
    }
`;

//resolveri määrittelee miten GraphQL-kyselyihin vastataan
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
        // (book) => book.author === author && book.genres.includes(genre)
        //);
      } else if (author) {
        const existingAuthor = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: existingAuthor._id }).populate(
          "author"
        );
        return books;
        //return books.filter((book) => book.author === author);
      } else if (genre) {
        //return books.filter((book) => book.genres.includes(genre));
        return Book.find({ genres: { $in: [genre] } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async (root, args) => {
      return Author.find({});
    },
    allUsers: async (root, args) => {
      return User.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async ({ id }) => {
      //const b = books.filter((b) => b.author === name).length;
      const b = await Book.countDocuments({ author: id });
      return b;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        const existingAuthor = await Author.findOne({ name: args.author });
        const currentUser = context.currentUser;
        if (!existingAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
          });
          if (!currentUser) {
            throw new GraphQLError("not authenticated", {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            });
          }
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
          // return book.populate("Author");
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
      console.log(currentUser);
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
