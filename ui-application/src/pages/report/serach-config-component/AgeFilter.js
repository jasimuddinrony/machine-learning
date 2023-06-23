import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function AgeFilter({
    ageData,
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
                    <Checkbox checked={ageData.age_bellow_30} onChange={handleCheckBoxChange} name="age_bellow_30" />
                }
                label="30세 이하"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={ageData.age_30_39} onChange={handleCheckBoxChange} name="age_30_39" />
                }
                label="30~39세"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={ageData.age_40_49} onChange={handleCheckBoxChange} name="age_40_49" />
                }
                label="40~49세"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={ageData.age_50_59} onChange={handleCheckBoxChange} name="age_50_59" />
                }
                label="50~59세"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={ageData.age_60_over} onChange={handleCheckBoxChange} name="age_60_over" />
                }
                label="60세 이상"
            />
        </FormGroup>
    );
}
