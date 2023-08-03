import { useQuery } from "@apollo/client";
import { USERS } from "../queries";
import { ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const result = useQuery(USERS);
  const booksResult = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const users = result.data.allUsers;
  console.log(users);
  const books = booksResult.data.allBooks;

  const currentUser = users.find((u) => u.username === props.username);

  const favouriteBooks = books.filter((b) =>
    b.genres.includes(currentUser.favouriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre "{currentUser.favouriteGenre}"</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
