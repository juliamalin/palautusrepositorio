export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating{
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]

}

export interface BaseEntry {
  id: string,
  date: string,
  description: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;


export type EntryWithoutId = UnionOmit<Entry, "id" | "type">;

export type EntryWithoutIdcopy = UnionOmit<BaseEntry, "id" | "type">;

export type HospitalEntryWithoutId = UnionOmit<HospitalEntry, "id" | "type">;

export type SelectedPatientValues = Omit<Patient, "ssn">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NewPatient = Omit<Patient, 'id' >;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

