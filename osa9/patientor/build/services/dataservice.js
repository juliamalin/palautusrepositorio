"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getDiagnoses = () => {
    return diagnoses_1.default;
};
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getDiagnoses,
    getPatients,
    addPatient
};
