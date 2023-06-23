import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function AgeFilterH({
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
            <div className="row" style={{width: "95%"}}>
                <div className="col-sm-4">
                    <FormControlLabel
                        control={
                            <Checkbox checked={ageData.age_bellow_30} onChange={handleCheckBoxChange} name="age_bellow_30" />
                        }
                        label="30세 이하"
                    /> <br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ageData.age_30_39} onChange={handleCheckBoxChange} name="age_30_39" />
                        }
                        label="30~39세"
                    />
                </div>

                <div className="col-sm-4">
                    <FormControlLabel
                        control={
                            <Checkbox checked={ageData.age_40_49} onChange={handleCheckBoxChange} name="age_40_49" />
                        }
                        label="40~49세"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ageData.age_50_59} onChange={handleCheckBoxChange} name="age_50_59" />
                        }
                        label="50~59세"
                    />
                </div>

                <div className="col-sm-4">
                    <FormControlLabel
                        control={
                            <Checkbox checked={ageData.age_60_over} onChange={handleCheckBoxChange} name="age_60_over" />
                        }
                        label="60세 이상"
                    />
                </div>
            </div>



        </FormGroup>
    );
}
