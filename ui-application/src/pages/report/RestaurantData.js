import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import RestaurantDataItem from "./RestaurantDataItem";
import {Link} from "react-router-dom";
import ArrowForward from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import RestaurantReasonDataTable from "./RestaurantReasonDataTable";


export default function RestaurantData({
    data
                                           ,handleMouseOver
                                           ,handleMouseOut
                                       }) {

    const [isHovered, setIsHovered] = useState(false);

    const _handleMouseOver = (item) => {
        if(handleMouseOver){
            handleMouseOver(item);
        }
        setIsHovered(true);
    };

    const _handleMouseOut = (item) => {
        if(handleMouseOut){
            handleMouseOut(item);
        }
        setIsHovered(false);
    };

    return (
        <div className="mt-4 mb-4" style={{width: "95%"}}>
            <Row style={{marginLeft:"-11px"}}>
                <div>
                    <Accordion className={"restaurant-list"}>

                        {data && data.results && data.results.map((item, index) => (
                            <Accordion.Item eventKey={index}
                                            onClick={event => {_handleMouseOver(item)}}
                            >
                                <Accordion.Header>
                                    <RestaurantDataItem
                                        rankNumber = {item.rank}
                                        name = {item.name}
                                        description = {item.restaurantDescription}
                                        value = {(item.value ? (Math.round(item.value * 100) / 100) : 0) + " %"}
                                        address={item.address}
                                        category={item.category}
                                    />
                                </Accordion.Header>
                                <Accordion.Body>
                                    <RestaurantReasonDataTable
                                        item={item}
                                        index={index}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            )
                        )}

                    </Accordion>
                </div>


            </Row>

        </div>
    );
}
