import express = require('express');
import { calculateBmi } from './bmiCalculator';
import bodyParser = require('body-parser');
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = parseFloat(req.query.height as string);
    const weight = parseFloat(req.query.weight as string);
    //const {height, weight} = req.body

    if(isNaN(height) || isNaN(weight)){
        res.status(400).json({ error: 'invalid height or weight'});
        return;
    }

    const bmiResult = calculateBmi(height, weight);

    res.json({
        weight,
        height,
        bmi: bmiResult
    });
});

app.post('/exercises',(req, res)=> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = req.body;
    const daily_exercises = requestBody.daily_exercises;
    const target = requestBody.target;

    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' });
        return;
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }

    const result = exerciseCalculator(daily_exercises as number[], Number(target));

    res.json(result);

});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});