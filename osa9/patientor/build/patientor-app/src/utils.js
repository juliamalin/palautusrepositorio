"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseDate = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseGander = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseEntries = (entries) => {
    if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object
        && 'occupation' in object && 'gender' in object && 'entries' in object) {
        const newEntry = {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            gender: parseGander(object.gender),
            entries: parseEntries(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewPatientEntry;
