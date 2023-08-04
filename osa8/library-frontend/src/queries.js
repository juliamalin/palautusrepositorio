import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`;

export const GENRE_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`;

export const USERS = gql`
  query {
    allUsers {
      username
      favouriteGenre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      id
      published
      genres
    }
  }
`;

export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      username
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      name
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
