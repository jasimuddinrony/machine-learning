import React, {useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Room from "@mui/icons-material/Room";

export default function RestaurantReasonDetailsDataTable({
                                                      data
                                           }) {
    const [defaultClass, setDefaultClass] = React.useState("reason-table-1");

    useEffect(() => {
        if(data && data.results && data.results.length > 0){
            let countColumn = data.results[0].column.length;
            if(countColumn > 12){
                setDefaultClass("reason-table-2")
            }
        }
    }, [data]);



    return (
        <table className={`table table-smd ${defaultClass}`}>
            <thead>
            <tr>
                <td width={"200px"}></td>
                {data && data.results && data.results[0].column.map(column =>{
                    return <td width={"100px"}>{column.name}</td>
                })}
            </tr>
            </thead>
            <tbody>
            {data && data.results && data.results.map(reason =>{
                return (<tr>
                    <td width={"200px"}>{reason.row}</td>
                    {reason.column.map(column =>{
                        return <td width={"100px"}>{(Math.round(column.value * 100) / 100)}</td>
                    })}

                </tr>)
            })}
            </tbody>
        </table>
    );
}
