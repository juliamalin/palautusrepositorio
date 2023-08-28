import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { HospitalEntryWithoutId } from "../types";

interface Props {
  open: boolean;
  onClose: () => void,
  onAddEntry: (formData: HospitalEntryWithoutId) => Promise<void>
}

const AddHospitalEntryForm: React.FC<Props> = ({open, onClose, onAddEntry}: Props) => {
    
    const initialFormData: HospitalEntryWithoutId = {
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        discharge: {
            date: "",
            criteria: "",
        }
      };

    const [formData, setFormData] = useState<HospitalEntryWithoutId>(initialFormData)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>
        ): void => {
        const {name, value } = event.target

        if(name ==='diagnosisCodes') {
            setFormData({
                ...formData,
                diagnosisCodes: [...(formData.diagnosisCodes || []), value], // Add the new value to the array
            })
        } else {
        setFormData({
            ...formData,
            [name]: value,
        })
        }
    }

    const handleDischargeChange = (event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const {name, value} = event.target
            setFormData({
                ...formData,
                discharge: {
                    ...formData.discharge,
                    [name]: value,
                }
            
            })
        }

    const handleAddEntry = () => {
        console.log(formData)
        onAddEntry(formData)
        onClose()

    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Entry</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in the details for the new entry.
                </DialogContentText>
                <div>
                    <label>Date:</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                    <label>Diagnosis codes:</label>
                    <input
                        type="text"
                        name="diagnosisCodes"
                        value={(formData.diagnosisCodes || []).join(', ')} // Use non-null assertion
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                    <label>Specialist:</label>
                    <input
                        type="text"
                        name="specialist"
                        value={formData.specialist}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                    <label>Discharge Date:</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.discharge.date}
                        onChange={handleDischargeChange}
                    />
                    </div>
                    <div>
                    <label>Discharge Criteria:</label>
                    <input
                        type="text"
                        name="criteria"
                        value={formData.discharge.criteria}
                        onChange={handleDischargeChange}
                    />
                    </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddEntry} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddHospitalEntryForm;
