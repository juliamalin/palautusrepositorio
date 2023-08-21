import express from 'express';
import dgRouter from './routes/dgrouter'
import patientRouter from './routes/patientrouter'

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', dgRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});