import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function Gender({
    genderData,
    onChange
                               }) {

    const handleCheckBoxChange = (event) => {
        if(onChange){
            onChange(event.target.name, event.target.checked)
        }
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox checked={genderData.male} onChange={handleCheckBoxChange} name="male" />
                }
                label="남성"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={genderData.female} onChange={handleCheckBoxChange} name="female" />
                }
                label="여성"
            />
        </FormGroup>
    );
}
