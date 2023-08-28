import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {HealthCheckEntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  open: boolean;
  onClose: () => void,
  onAddEntry: (formData: HealthCheckEntryWithoutId) => Promise<void>
}

const AddHealthCheckEntry: React.FC<Props> = ({open, onClose, onAddEntry}: Props) => {
    
    const initialFormData: HealthCheckEntryWithoutId = {
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        healthCheckRating: 0
      };

      const [formData, setFormData] = useState<HealthCheckEntryWithoutId >(initialFormData)


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

    const handleHcInputChange = (event: React.ChangeEvent<HTMLInputElement>
        ): void => {
        const { name, value } = event.target;
        const numericValue = parseInt(value, 10);
        setFormData({
          ...formData,
          [name]: numericValue,
        });
      };
      

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
                    <label>HealthCheck rating (1-3):</label>
                    <input
                        type="number"
                        name="healthCheckRating"
                        value={formData.healthCheckRating}
                        onChange={handleHcInputChange}
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

export default AddHealthCheckEntry;


