import { useParams } from "react-router-dom"
import { Patient, Diagnosis, EntryWithoutId } from "../types"
import { useEffect, useState } from "react";
import dataservice from "../services/dataservice";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";
import Button from "@mui/material/Button";
import AddHospitalEntryForm from "./AddHospitalEntry";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Alert from '@mui/material/Alert';


type dgProps = {
    diagnoses: Diagnosis[]
}

const PatientView = ({diagnoses}: dgProps) => {
    const id = useParams().id
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isAddEntryDialogOpen, setIsAddEntryDialogOpen] = useState(false);
    const [isAddHospitalDialogOpen, setIsAddHospitalDialogOpen] = useState(false);
    const [isAddOccupationalDialogOpen, setIsAddOccupationalDialogOpen] = useState(false);
    const [error, setError] = useState<string>();
    const [, setShowError] = useState<boolean>(false);
    const [shouldRefetchPatient, setShouldRefetchPatient] = useState(false);

    const clearError = () => {
      setError(undefined);
      setShowError(false);
    };

    const openAddEntryDialog = () => {
      setIsAddEntryDialogOpen(true)
    }

    const closeAddEntryDialog = () => {
      setIsAddEntryDialogOpen(false)
    }

    const openAddHospitalDialog = () => {
      setIsAddHospitalDialogOpen(true)
    }

    const closeAddHospitalDialog = () => {
      setIsAddHospitalDialogOpen(false)
    }

    const openAddOccupationalDialog = () => {
      setIsAddOccupationalDialogOpen(true)
    }

    const closeAddOccupationalDialog = () => {
      setIsAddOccupationalDialogOpen(false)
    }

    const handleAddEntry = async (values: EntryWithoutId) => {
      try {
        console.log(values)
        const response = await axios.post<EntryWithoutId>(`${apiBaseUrl}/patients/${id}/entries`, values)
        console.log(response)
        const newEntry = response.data
        console.log(newEntry)
        setShouldRefetchPatient(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error)
          const responseErrorMessage = error?.response?.data;
          if (typeof responseErrorMessage === "string") {
            console.error(responseErrorMessage);
            setError(responseErrorMessage);
            setShowError(true);
            setTimeout(clearError, 5000);
          } else {
            console.error("Unrecognized axios error:", error);
            setError("An error occurred while sending the request.");
            setShowError(true);
            setTimeout(clearError, 5000);
          }
        } else {
          console.error("Unknown error:", error);
          setError("An unknown error occurred.");
          setShowError(true);
          setTimeout(clearError, 5000);
        }
      }
    }

    useEffect(() => {
        const fetchPatient = async () => {
          if (id) {
            try {
              const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
              const patientData = response.data;
              console.log(patientData)
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
      }, [id, shouldRefetchPatient]);

      const diagnosisLookup: Record<string, Diagnosis> = {}

      diagnoses.forEach(diagnosis => {
        diagnosisLookup[diagnosis.code] = diagnosis
      })

      console.log(patient)

    if (!patient) {
        return <div>No patient found for ID: {id}</div>;
    }


    return (
        <div className= "patient-view">
             <div>
            {error && (
            <Alert severity="error" onClose={() => setShowError(false)}>
              {error}
            </Alert>
              )}
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
            <Button variant="contained" color="primary" onClick={openAddEntryDialog}> 
                Add healthcheckentry
            </Button>
            <Button variant="contained" color="secondary" onClick={openAddHospitalDialog}> 
                Add hospitalentry
            </Button>
            <Button variant="contained" color="success" onClick={openAddOccupationalDialog}> 
                Add OccupationalHealthcareEntry
            </Button>
            <AddHospitalEntryForm
              open={isAddHospitalDialogOpen}
              onClose={closeAddHospitalDialog}
              onAddEntry={handleAddEntry}
              />
        </div>
        </div>
        </div>
    )
    
}

export default PatientView