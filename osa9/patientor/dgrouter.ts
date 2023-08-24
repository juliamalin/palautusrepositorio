import express from 'express';
import dgservice from './services/dataservice';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dgservice.getDiagnoses());
});

/*router.post('/api/patients/:id/entries',(_req, res) => {
    res.send('Saving an entry!');
});*/

export default router;