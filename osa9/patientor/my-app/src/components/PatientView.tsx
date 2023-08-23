import { useParams } from "react-router-dom"
import { Patient, Diagnosis } from "../types"
import { useEffect, useState } from "react";
import dataservice from "../services/dataservice";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";

type dgProps = {
    diagnoses: Diagnosis[]
}

const PatientView = ({diagnoses}: dgProps) => {
    const id = useParams().id
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
          if (id) {
            try {
              const patientData = await dataservice.findById(id);
              if (patientData) {
                setPatient(patientData);
                console.log(patientData);
              } else {
                console.error("Patient data not found");
              }
            } catch (error) {
              console.error("Error fetching patient data:", error);
            }
          }
        };
      
        if (id) {
          void fetchPatient();
        }
      }, [id]);

      const diagnosisLookup: Record<string, Diagnosis> = {}
      diagnoses.forEach(diagnosis => {
        diagnosisLookup[diagnosis.code] = diagnosis
      })
      console.log(diagnosisLookup)


    if (!patient) {
        return <div>No patient found for ID: {id}</div>;
    }

    console.log(patient)

    return (
        <div className= "patient-view">
            <p>
                <strong>
                {patient.name}
                {patient.gender === 'female' ? <FemaleIcon />: null}
                {patient.gender === 'male' ? <MaleIcon />: null}
                </strong>
            </p>
            <p>ssn: {patient.ssn}<br />
            occupation: {patient.occupation}
            </p>
            
            <div>
            <p><strong>entries</strong></p>
            {patient.entries.map((entry, index) => (
                <div key={index}>
                <EntryDetails entry={entry} diagnosis={diagnosisLookup} />
                </div>
            ))}
        </div>
        </div>
    )
    
}

export default PatientView