import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Room from "@mui/icons-material/Room";
import {Link} from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function RestaurantDataItem({
    rankNumber
    , name
    , description
    , value
    , address
    , category
                                           }) {

    return (
        <div>
            <Row>

                <Col md={2}>
                    {/*<img*/}
                    {/*    src="https://d12zq4w4guyljn.cloudfront.net/300_300_20211207103828023_photo_197e5ec1085c.jpg"*/}
                    {/*    alt="Image" className="img-fluid"/>*/}
                    <h4 style={{margin: "0px"}}>{rankNumber}</h4>
                </Col>
                <Col md={10}>
                    <div className={"restaurant-title"}>{name} <p className={"restaurant-percentage"}>({value})</p></div>
                    <div className={"restaurant-description"}>{description}</div>
                    <div className={"restaurant-category"}>{category}</div>
                    <div className="container">
                        <div className="row">
                            <div className="col restaurant-address">
                                <div className={"title-with-icon"} style={{margin: "0px"}}>
                                    <Room className={"restaurant-address-icon"}/>
                                    <div>
                                        <span>{address}</span>
                                    </div>
                                </div>

                            </div>
                            {/*<div className="col" style={{paddingLeft: "0px"}}>44</div>*/}
                        </div>
                    </div>

                </Col>



            </Row>
        </div>
    );
}
