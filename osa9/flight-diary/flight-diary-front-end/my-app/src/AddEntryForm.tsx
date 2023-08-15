import { useState, SyntheticEvent } from "react";
import {  TextField, Button, SelectChangeEvent, InputLabel, Select, MenuItem} from '@mui/material';
import { EntryFormValues, Weather, Visibility } from './typesFront';

interface Props {
    onSubmit: (values: EntryFormValues) => void
}

interface WeatherOption{
    value: Weather;
    label: string;
  }

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
    value: v, label: v.toString()
  }));

interface VisibilityOption{
    value: Visibility;
    label: string;
  }

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
  }));



const AddEntryForm = ({ onSubmit }: Props) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState(Visibility.Ok)
    const [weather, setWeather] = useState(Weather.Cloudy)
    const [comment, setComment] = useState('')


    const onWeatherChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const weather = Object.values(Weather).find(g => g.toString() === value);
          if (weather) {
            setWeather(weather);
          }
        }
      };
    
    const onVisibilityChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const visibility = Object.values(Visibility).find(g => g.toString() === value);
          if (visibility) { 
            setVisibility(visibility);
          }
        }
      };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
          date,
          visibility,
          weather,
          comment
        });
    };

    
    return (
        <div>
          <form onSubmit={addEntry}>
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              fullWidth 
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
            <Select
              label="Visibility"
              fullWidth
              value={visibility}
              onChange={onVisibilityChange}
            >
              {visibilityOptions.map(option =>
                <MenuItem
                key={option.label}
                value={option.value}
                >
                {option.label
                }</MenuItem>
                )}
            </Select>
            <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
            <Select
              label="Weather"
              fullWidth
              value={weather}
              onChange={onWeatherChange}
            >
            {weatherOptions.map(option =>
                <MenuItem
                key={option.label}
                value={option.value}>
                {option.label}
                </MenuItem>
            )}
            </Select>

            <TextField
              label="Comment"
              fullWidth
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
            </form>
            </div>
            )
}



export default AddEntryForm;