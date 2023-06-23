import React from 'react';
import Slider from "react-slick";

const SampleImage = () => {


    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };


    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/2.png"} width="200px"/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/Screenshot_11.png"}
                         width="200px"/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/Screenshot_6.png"} width="200px"/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/Screenshot_10.png"}
                         width="200px"/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/Screenshot_15.png"}
                         width="200px"/>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/images/sample_recycle_images/biological32.jpg"} width="200px"/>
                </div>
            </Slider>


        </>
    )
}

export default SampleImage;

