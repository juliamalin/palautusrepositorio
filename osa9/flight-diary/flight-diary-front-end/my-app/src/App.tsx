import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { EntryFormValues, DiaryEntry } from './typesFront';
import AddEntryForm from './AddEntryForm';
import diaryService from './diaryServiceFront';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string | undefined>();
  const [, setShowError] = useState<boolean>(false);

  const clearError = () => {
    setError(undefined);
    setShowError(false);
  };

  console.log(entries)

  useEffect(() => {
    axios.get('/api/diaries')
    .then(response => {
      setEntries(response.data)
      setError(undefined)
    })
    .catch(error => {
      console.error('Error fetching data: ', error)
      setError(error)
    })
  }, [])

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!values.date || !values.visibility || !values.weather || !values.comment) {
      setError('All fields are required.');
      setShowError(true);
      setTimeout(clearError, 5000);
      return;
    }
    try {
      const entry = await diaryService.addDiary(values);
      setEntries(entries.concat(entry))
      setError(undefined)
      setShowError(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
          setShowError(true);
          setTimeout(clearError, 5000);
        } else {
          setError("Unrecognized axios error");
          setShowError(true);
          setTimeout(clearError, 5000);
        }
      } else {
        setError("Unknown error");
        setShowError(true);
        setTimeout(clearError, 5000);
      }
    }
  };

  return (
    <div className="App">
      <div>
      {error && <div className="error"  style={{ color: 'red' }} >Error: {error}</div>}       
      </div>
      <h1>Add new entry</h1>
      <AddEntryForm onSubmit={submitNewEntry} onError={setError}/>
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

