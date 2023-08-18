"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getDiagnoses = () => {
    return diagnoses_1.default;
};
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const findById = (id) => {
    return patients.find(patient => patient.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getDiagnoses,
    getPatients,
    findById,
    addPatient
};
