import { NewPatient, Gender, Entry, Diagnosis, EntryWithoutId, HealthCheckRating} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
   };

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
   };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: string): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
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

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing rating: '+ healthCheckRating);
    }
    return healthCheckRating;
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

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing description: '+ employerName);
    }
    return employerName;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: '+ specialist);
    }
    return specialist;
};

interface SickLeave {
    startDate: string;
    endDate: string;
  }

interface Discharge {
    date: string,
    criteria: string
  }

const parseSickLeave = (object: unknown): SickLeave | undefined => {
    if (!object || typeof object !== 'object') {
        return undefined;
    }

    if ('startDate' in object && 'endDate' in object) {
    const startDate = String(object.startDate);
    const endDate = String(object.endDate);

        return {
            startDate,
            endDate,
        };
    }
    return undefined;
};

const parseDischarge = (object: unknown): Discharge  => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data for discharge');
    }

    if ('date' in object && 'criteria' in object) {
        const date = String(object.date);
        const criteria = String(object.criteria);
    
            return {
                date,
                criteria,
            };
        }

    throw new Error('Incorrect data for discharge: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!Array.isArray(object)) {
      // The input is not an array, return an empty array or handle it as needed.
      return [] as Array<Diagnosis['code']>;
    }
  
    // Assuming the input is an array of diagnosis codes.
    return object as Array<Diagnosis['code']>;
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

    if ('date' in object && 'description' in object && 'specialist' in object && 'healthCheckRating'
        in object) {
        const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };

        if ('diagnosisCodes' in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        
        return newEntry;

    } else if ('date' in object && 'description' in object && 'specialist' in object && 'employerName'
        in object) {
        const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployerName(object.employerName)
        };

        if ('diagnosisCodes' in object) {
            console.log(object.diagnosisCodes);
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }

        if ('sickLeave' in object) {
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
        
        return newEntry;

    } else if ('date' in object && 'description' in object && 'specialist' in object && 'discharge'
    in object) {
        const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge)
        };

        if ('diagnosisCodes' in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
    
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
}
