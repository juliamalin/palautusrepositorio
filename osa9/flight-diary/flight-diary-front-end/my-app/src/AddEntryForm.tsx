import { useState, SyntheticEvent } from "react";
import {  TextField, Button, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import { EntryFormValues, Weather, Visibility } from './typesFront';

interface Props {
    onSubmit: (values: EntryFormValues) => void
    onError: (error: string) => void
}

/*interface WeatherOption{
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
  }));*/



const AddEntryForm = ({ onSubmit, onError }: Props) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState(Visibility.Ok)
    const [weather, setWeather] = useState(Weather.Cloudy)
    const [comment, setComment] = useState('')


   /* const onWeatherChange = (event: SelectChangeEvent<string>) => {
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
      };*/

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
              type="date"
              fullWidth 
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <p>Visibility:</p>
               <RadioGroup
          aria-label="Visibility"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value as Visibility)}
          row
            >
              <FormControlLabel
                value={Visibility.Ok}
                control={<Radio />}
                label="Ok"
              />
              <FormControlLabel
                value={Visibility.Poor}
                control={<Radio />}
                label="Poor"
              />
              <FormControlLabel
                value={Visibility.Great}
                control={<Radio />}
                label="Great"
              />
              <FormControlLabel
                value={Visibility.Good}
                control={<Radio />}
                label="Good"
              />
        </RadioGroup>
        <p>Weather:</p>
            <RadioGroup
              aria-label="Weather"
              value={weather}
              onChange={(event) => setWeather(event.target.value as Weather)}
              row
            >
              <FormControlLabel
                value={Weather.Cloudy}
                control={<Radio />}
                label="Cloudy"
              />
              <FormControlLabel
                value={Weather.Rainy}
                control={<Radio />}
                label="Rainy"
              />
              <FormControlLabel
                value={Weather.Sunny}
                control={<Radio />}
                label="Sunny"
              />
              <FormControlLabel
                value={Weather.Stormy}
                control={<Radio />}
                label="Stormy"
              />
              <FormControlLabel
                value={Weather.Windy}
                control={<Radio />}
                label="Windy"
              />
            </RadioGroup>
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