import { NewPatient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
   }

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param)
}


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: '+ name)
    }
    return name
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: '+ ssn)
    }
    return ssn
}

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: '+ dateOfBirth)
    }
    return dateOfBirth
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: '+ occupation)
    }
    return occupation
}

const parseGander = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: '+ gender)
    }
    return gender
}

const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
      }
      return entries;
}


const toNewPatientEntry = (object:unknown) : NewPatient => {
    if(! object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }


    if('name' in object && 'ssn' in object && 'dateOfBirth' in object
        && 'occupation' in object && 'gender' in object && 'entries' in object){
            const newEntry: NewPatient= {
                name: parseName(object.name),
                ssn: parseSsn(object.ssn),
                dateOfBirth: parseDate(object.dateOfBirth),
                occupation: parseOccupation(object.occupation),
                gender: parseGander(object.gender),
                entries: parseEntries(object.entries)
            }
            return newEntry
        }
        throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatientEntry