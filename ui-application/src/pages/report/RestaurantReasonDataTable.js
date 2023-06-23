import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Room from "@mui/icons-material/Room";

export default function RestaurantReasonDataTable({
                                                      item
    , index
                                           }) {

    return (
        <table className="table  table-smd">
            <thead>
            <tr>
                <td colSpan={2}>선호하는 이유</td>
            </tr>
            </thead>
            <tbody>
            {item && item.reason && item.reason.map(reason =>{
                return (<tr>
                    <td style={{fontSize: "12px"}} width={"70%"}>{reason.name}</td>
                    <td style={{fontSize: "12px"}} width={"30%"}>({Math.round(reason.value * 100) / 100} %)</td>
                </tr>)
            })}
            </tbody>
        </table>
    );
}
