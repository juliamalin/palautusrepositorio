import express from 'express';
import dataservice from './services/dataservice';
import toNewPatientEntry from './utils';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dataservice.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = dataservice.findById(id);
    if(patient) {
        res.json(patient);
    } else {
        res.status(404).json({error: 'Patient not found'});
    }
});

router.post('/',(req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = dataservice.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += 'Error: '+ error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;