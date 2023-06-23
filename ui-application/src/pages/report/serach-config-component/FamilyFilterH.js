import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function FamilyFilterH({
                                          familyData,
                                          onChange
                                      }) {

    const handleCheckBoxChange = (event) => {
        if (onChange) {
            onChange(event.target.name, event.target.checked)
        }
    };

    const {single_family_single_person, single_family_tow_person, double_family, triple_or_more_family} = familyData;

    return (
        <FormGroup>
            <div className="row" style={{width: "95%"}}>
                <div className="col-sm-4">
                    <FormControlLabel
                        control={
                            <Checkbox checked={single_family_single_person} onChange={handleCheckBoxChange}
                                      name="single_family_single_person"/>
                        }
                        label="1인 가구"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={single_family_tow_person} onChange={handleCheckBoxChange}
                                      name="single_family_tow_person"/>
                        }
                        label="1세대 2인 이상 가구"
                    />
                </div>
                <div className="col-sm-4">
                    <FormControlLabel
                        control={
                            <Checkbox checked={double_family} onChange={handleCheckBoxChange} name="double_family"/>
                        }
                        label="2세대 가구"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={triple_or_more_family} onChange={handleCheckBoxChange}
                                      name="triple_or_more_family"/>
                        }
                        label="3세대 이상 가구"
                    />
                </div>
            </div>

        </FormGroup>
    );
}
