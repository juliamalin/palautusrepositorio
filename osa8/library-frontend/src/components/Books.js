import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";
import { GENRE_BOOKS } from "../queries";

const Books = (props) => {
  const [showAll, setShowAll] = useState(null);

  const result = useQuery(ALL_BOOKS);

  const resultGenre = useQuery(GENRE_BOOKS, {
    variables: { genre: showAll },
  });

  //hakee kirjat uudelleen kun genre muuttuu
  useEffect(() => {
    if (showAll) {
      resultGenre.refetch();
    }
  }, [showAll]);

  if (!props.show) {
    return null;
  }

  if (resultGenre.loading || result.loading) {
    return <div>Loading...</div>;
  }

  const booksByGenre = resultGenre.data.allBooks;
  const allBooks = result.data.allBooks;

  const uniqueGenres = Array.from(new Set(allBooks.flatMap((b) => b.genres)));

  // filteröi genren mukaan tai jos ei ole genreä niin näyttää kaikki
  const booksToShow = showAll
    ? booksByGenre.filter((book) => book.genres.includes(showAll))
    : allBooks;

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
