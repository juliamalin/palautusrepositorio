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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
}

export type SelectedPatientValues = Omit<Patient, "ssn">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NewPatient = Omit<Patient, 'id'>;