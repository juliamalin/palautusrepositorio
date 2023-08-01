import { EDIT_YEAR } from "../queries";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

const BornForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [changeYear] = useMutation(EDIT_YEAR);

  const formattedAuthors = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const submit = async (event) => {
    event.preventDefault();
    console.log(authors);

    changeYear({ variables: { name, born: parseInt(year) } });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <Select
        defaultValue={formattedAuthors.find((author) => author.value === name)}
        onChange={(selectedOption) => setName(selectedOption.value)}
        options={formattedAuthors}
      />
      <form onSubmit={submit}>
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BornForm;
