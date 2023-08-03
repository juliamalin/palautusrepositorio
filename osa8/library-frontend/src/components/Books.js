import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";
import { GENRE_BOOKS } from "../queries";

const Books = (props) => {
  const [showAll, setShowAll] = useState(null);

  const result = useQuery(ALL_BOOKS);

  const result2 = useQuery(GENRE_BOOKS, {
    variables: { genre: showAll },
  });

  useEffect(() => {
    if (showAll) {
      result2.refetch();
    }
  }, [showAll]);

  if (!props.show) {
    return null;
  }

  if (result2.loading || result.loading) {
    return <div>Loading...</div>;
  }

  const books = result2.data.allBooks;
  const booksButtons = result.data.allBooks;

  const uniqueGenres = Array.from(
    new Set(booksButtons.flatMap((b) => b.genres))
  );

  const booksToShow = showAll
    ? books.filter((book) => book.genres.includes(showAll))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setShowAll(showAll === genre ? null : genre)}
          >
            {genre} {showAll === genre ? "(selected)" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
