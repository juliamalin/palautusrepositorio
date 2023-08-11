import dgData from '../data/diagnoses'
import { Diagnosis, Patient, NewPatient } from '../types'
import { SelectedPatientValues } from '../types'
import patientData from '../data/patients'
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData

const getDiagnoses = (): Diagnosis[] => {
    return dgData
}

const getPatients = (): SelectedPatientValues[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(newPatient)
    return newPatient

}

export default {
    getDiagnoses,
    getPatients,
    addPatient
}