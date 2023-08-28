import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {OccupationalEntryWithoutId } from "../types";

interface Props {
  open: boolean;
  onClose: () => void,
  onAddEntry: (formData: OccupationalEntryWithoutId) => Promise<void>
}

const AddOccupationalEntry: React.FC<Props> = ({open, onClose, onAddEntry}: Props) => {
    
    const initialFormData: OccupationalEntryWithoutId = {
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: "",
        }
      };

      const [formData, setFormData] = useState<OccupationalEntryWithoutId >(initialFormData)

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

    const handleSickLeaveChange = (event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const {name, value} = event.target
            setFormData({
                ...formData,
                sickLeave: {
                    ...(formData.sickLeave as { startDate: string; endDate: string }),
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
                    <label>Employer name:</label>
                    <input
                        type="text"
                        name="employerName"
                        value={formData.employerName}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                    <label>SickLeave StartDate:</label>
                    <input
                        type="text"
                        name="startDate"
                        value={formData.sickLeave?.startDate || ''}                        onChange={handleSickLeaveChange}
                    />
                    </div>
                    <div>
                    <label>SickLeave EndDate:</label>
                    <input
                        type="text"
                        name="endDate"
                        value={formData.sickLeave?.endDate || ''}                        onChange={handleSickLeaveChange}
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

export default AddOccupationalEntry;

