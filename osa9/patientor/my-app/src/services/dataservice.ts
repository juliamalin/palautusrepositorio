import dgData from '../data/diagnoses'
import { Diagnosis, Patient, NewPatient, EntryWithoutId, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types'
import { SelectedPatientValues } from '../types'
import patientData from '../data/patients'
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData

const getDiagnoses = (): Diagnosis[] => {
    return dgData
}

const getPatients = (): SelectedPatientValues[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation, 
        entries
    }))
}

const findById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id===id)
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(newPatient)
    return newPatient
}

const addEntry = (entry: EntryWithoutId, patientToUpdate: Patient): Entry => {    
    if ('healthCheckRating' in entry) {
        const newEntry = {
            ...(entry as HealthCheckEntry),
        };
        patientToUpdate.entries.push(newEntry);
        return newEntry;

    } else if ('discharge' in entry) {
        const newEntry = {
            ...(entry as HospitalEntry),
        };
        patientToUpdate.entries.push(newEntry);
        return newEntry;
    } else if ('employerName' in entry) {
        const newEntry = {
            ...(entry as OccupationalHealthcareEntry),
        };
        patientToUpdate.entries.push(newEntry);
        return newEntry;
    } else {
        throw new Error('Invalid entry type');
    }
};


export default {
    getDiagnoses,
    getPatients,
    findById,
    addPatient, 
    addEntry
}