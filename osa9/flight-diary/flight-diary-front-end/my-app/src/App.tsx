import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { EntryFormValues, DiaryEntry } from './typesFront';
import AddEntryForm from './AddEntryForm';
import diaryService from './diaryServiceFront';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string>();

  console.log(entries)

  useEffect(() => {
    axios.get('/api/diaries')
    .then(response => {
      setEntries(response.data)
    })
    .catch(error => {
      console.error('Error fetching data: ', error)
    })
  }, [])

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await diaryService.addDiary(values);
      setEntries(entries.concat(entry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <h1>Add new entry</h1>
      <AddEntryForm onSubmit={submitNewEntry}/>
      <h1>Diary entries</h1>
      {entries.map(entry => (
        <div key={entry.id}>
        <strong>{entry.date}</strong>
        <p>Weather: {entry.weather}</p>
        <p>Visibility: {entry.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

