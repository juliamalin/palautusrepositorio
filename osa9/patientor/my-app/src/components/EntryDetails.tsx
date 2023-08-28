import { assert } from "console"
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StyledRating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import HealingIcon from '@mui/icons-material/Healing'


const Hospital: React.FC<{entry: HospitalEntry, diagnosis: Record<string, Diagnosis>}> = ({entry, diagnosis}) => (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
    <div>
        {entry.date}
        <HealingIcon />
        <p><i>{entry.description}</i></p>
        {entry.diagnosisCodes && (
            <div>
                {entry.diagnosisCodes.map ((dg, index) => (
                    <li key={index} style={{marginRight: '0.5em'}}>
                      {dg}
                    </li>
                ))}
            </div>
        )}
        <p>discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
        <p>diagnose by {entry.specialist}</p>
    </div>
    </Paper>
)

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry, diagnosis: Record<string, Diagnosis>}> = ({entry, diagnosis}) => (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
    <div>
        {entry.date}
        <ShoppingBagIcon />
        {entry.employerName}
        <p><i>{entry.description}</i></p>
        {entry.diagnosisCodes && (
            <div>
                {entry.diagnosisCodes.map ((dg, index) => (
                    <li key={index} style={{marginRight: '0.5em'}}>
                      {dg}
                    </li>
                ))}
            </div>
        )}
        {entry.sickLeave && 
            <p>sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        }
        <p>diagnose by {entry.specialist}</p>
    </div>
    </Paper>
)

const HealthCheck: React.FC<{entry: HealthCheckEntry, diagnosis: Record<string, Diagnosis>}> = ({entry, diagnosis}) => (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
    <div>
        {entry.date}
        <LocalHospitalIcon />
        <p><i>{entry.description}</i></p>
        {entry.diagnosisCodes && (
            <div>
                {entry.diagnosisCodes.map ((dg, index) => (
                    <li key={index} style={{marginRight: '0.5em'}}>
                      {dg}
                    </li>
                ))}
            </div>
        )}
        {entry.healthCheckRating>0 && <StyledRating
        name="heart-rating"
        value={entry.healthCheckRating} 
        readOnly
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteIcon fontSize="inherit" style={{ opacity: 0 }} />}
         />
        }
        <p>diagnose by {entry.specialist}</p>
    </div>
    </Paper>
)

function assertNever(value: never): never {
    throw new Error(`Unhandled case: ${value}`);
  }

  
const EntryDetails: React.FC<{ entry: Entry, diagnosis: Record<string, Diagnosis> }> = ({entry, diagnosis}) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} diagnosis={diagnosis}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} diagnosis={diagnosis}/>
        case "HealthCheck":
            return <HealthCheck entry={entry} diagnosis={diagnosis}/>
        default:
            return assertNever(entry)
    }
}

export default EntryDetails
