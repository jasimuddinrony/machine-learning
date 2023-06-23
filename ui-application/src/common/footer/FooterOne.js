import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedin, FaInstagram, FaVimeoV, FaDribbble, FaBehance, FaEnvelopeOpen } from "react-icons/fa";
import ServiceData from "../../data/service/ServiceMain.json";
import { slugify } from '../../utils';

const getServiceData = ServiceData;

const FooterOne = ({parentClass}) => {

    return (
        <footer className={`footer-area ${parentClass}`}>
            <div className="container">

                <div className="footer-bottom">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-copyright">
                                <span className="copyright-text">© {new Date().getFullYear()}. All rights reserved by <a href="https://konachain.com/">KONA CHAIN Co. Ltd.</a>.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterOne;
