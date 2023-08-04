//sisältää sovelluksen käyttämän GraphQL-skeeman

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
        bookList: [Book!]!
    }
    type Book {
        title: String!
        published: Int
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
    type Subscription {
        bookAdded: Book!
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

module.exports = typeDefs;
