import express from 'express';
import dataservice from '../services/dataservice';
import toNewPatientEntry from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dataservice.getPatients())
})

router.post('/',(req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedPatient = dataservice.addPatient(newPatientEntry)
        res.json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.'
        if(error instanceof Error){
            errorMessage += 'Error: '+ error.message
        }
        res.status(400).send(errorMessage)
    }
})

export default router