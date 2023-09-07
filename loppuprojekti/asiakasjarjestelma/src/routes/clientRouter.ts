import express from 'express';
import clientService from '../services/clientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(clientService.getClients())
})

export default router