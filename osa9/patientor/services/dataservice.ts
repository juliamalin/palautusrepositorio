import dgData from '../my-app/src/data/diagnoses';
import { Diagnosis, Patient, NewPatient } from '../types';
import { SelectedPatientValues } from '../types';
import patientData from '../my-app/src/data/patients';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getDiagnoses = (): Diagnosis[] => {
    return dgData;
};

const getPatients = (): SelectedPatientValues[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation, 
        entries
    }));
};

const findById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id===id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getDiagnoses,
    getPatients,
    findById,
    addPatient
};