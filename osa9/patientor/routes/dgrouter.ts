import express from 'express';
import dgservice from '../services/dataservice';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dgservice.getDiagnoses())
})

/*router.post('/',(_req, res) => {
    res.send('Saving a diary!')
})*/

export default router