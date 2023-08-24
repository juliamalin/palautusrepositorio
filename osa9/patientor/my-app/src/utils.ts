import { NewPatient, Gender, Entry,  EntryWithoutId, Diagnosis} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
   };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: string): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).map(v => v.toString()).includes(param);
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: '+ name);
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: '+ ssn);
    }
    return ssn;
};

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: '+ dateOfBirth);
    }
    return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: '+ occupation);
    }
    return occupation;
};

const parseGander = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: '+ gender);
    }
    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return entries;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: '+ description);
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: '+ specialist);
    }
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };


export function toNewPatientEntry (object:unknown) : NewPatient {
    if(! object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
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
            };
            return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
}

export function toNewEntry (object: unknown) : EntryWithoutId {
    if (! object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in object && 'description' in object && 'specialist' in object 
        && 'diagnosisCodes' in object) {
        const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
}
