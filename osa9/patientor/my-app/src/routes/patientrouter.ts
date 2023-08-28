import express from 'express';
import dataservice from '../services/dataservice';
import { toNewEntry, toNewPatientEntry } from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dataservice.getPatients())
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = dataservice.findById(id)
    if(patient) {
        res.json(patient)
    } else {
        res.status(404).json({error: 'Patient not found'})
    }
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

router.post ("/:id/entries", async (req, res) => {
    try {
        const {id} = req.params
        //console.log(req.body)
        const entryData = toNewEntry(req.body)
      //  console.log(entryData)
        const patientToUpdate = dataservice.findById(id);
        if (!patientToUpdate) {
            res.status(404).json({ error: 'Patient not found' });
            return;
          }
        const addedEntry = dataservice.addEntry(entryData, patientToUpdate)
        res.json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.'
        if(error instanceof Error){
            errorMessage += 'Error: '+ error.message
        }
        res.status(400).send(errorMessage)
    }
})


export default router