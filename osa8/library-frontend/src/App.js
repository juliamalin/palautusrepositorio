import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/loginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("");
  const [token, setToken] = useState(null);
  const [username, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      window.alert(`${addedBook.title} added`);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setError={notify}
          setUser={setUser}
        />
        <Authors show={page === "authors"} token={token} />
        <Books show={page === "books"} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>
          recommendations
        </button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommendations show={page === "recommendations"} username={username} />
    </div>
  );
};

export default App;
