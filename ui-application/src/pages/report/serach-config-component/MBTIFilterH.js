import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function MBTIFilterH({
                                        mbtiData,
                                        onChange
                                    }) {

    const handleCheckBoxChange = (event) => {
        if (onChange) {
            onChange(event.target.name, event.target.checked)
        }
    };
    const {
        INTJ,
        INTP,
        ENTJ,
        ENTP,
        INFJ,
        INFP,
        ENFJ,
        ENFP,
        ISTJ,
        ISFJ,
        ESTJ,
        ESFJ,
        ISTP,
        ISFP,
        ESTP,
        ESFP,
        unknown
    } = mbtiData;

    return (
        <FormGroup>
            <div className="row" style={{width: "95%"}}>
                <div className="col-sm-3">
                    <FormControlLabel
                        control={
                            <Checkbox checked={INTJ} onChange={handleCheckBoxChange} name="INTJ"/>
                        }
                        label="INTJ (전략가)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={INTP} onChange={handleCheckBoxChange} name="INTP"/>
                        }
                        label="INTP (논리술사)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ENTJ} onChange={handleCheckBoxChange} name="ENTJ"/>
                        }
                        label="ENTJ (통솔자)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ENTP} onChange={handleCheckBoxChange} name="ENTP"/>
                        }
                        label="ENTP (변론가)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={INFJ} onChange={handleCheckBoxChange} name="INFJ"/>
                        }
                        label="INFJ (옹호자)"
                    />
                </div>
                <div className="col-sm-3">
                    <FormControlLabel
                        control={
                            <Checkbox checked={INFP} onChange={handleCheckBoxChange} name="INFP"/>
                        }
                        label="INFP (중재자)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ENFJ} onChange={handleCheckBoxChange} name="ENFJ"/>
                        }
                        label="ENFJ (선도자)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ENFP} onChange={handleCheckBoxChange} name="ENFP"/>
                        }
                        label="ENFP (활동가)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ISTJ} onChange={handleCheckBoxChange} name="ISTJ"/>
                        }
                        label="ISTJ (현실주의자)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ISFJ} onChange={handleCheckBoxChange} name="ISFJ"/>
                        }
                        label="ISFJ (수호자)"
                    />
                </div>
                <div className="col-sm-3">
                    <FormControlLabel
                        control={
                            <Checkbox checked={ESTJ} onChange={handleCheckBoxChange} name="ESTJ"/>
                        }
                        label="ESTJ (경영자)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ESFJ} onChange={handleCheckBoxChange} name="ESFJ"/>
                        }
                        label="ESFJ (집정관)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ISTP} onChange={handleCheckBoxChange} name="ISTP"/>
                        }
                        label="ISTP (장인)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ISFP} onChange={handleCheckBoxChange} name="ISFP"/>
                        }
                        label="ISFP (모험가)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={ESTP} onChange={handleCheckBoxChange} name="ESTP"/>
                        }
                        label="ESTP (사업가)"
                    />
                </div>
                <div className="col-sm-3">
                    <FormControlLabel
                        control={
                            <Checkbox checked={ESFP} onChange={handleCheckBoxChange} name="ESFP"/>
                        }
                        label="ESFP (연예인)"
                    /><br/>
                    <FormControlLabel
                        control={
                            <Checkbox checked={unknown} onChange={handleCheckBoxChange} name="unknown"/>
                        }
                        label="모름"
                    />
                </div>
            </div>
        </FormGroup>
    );
}
