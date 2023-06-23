import React, { useState } from 'react';
import Logo from '../../elements/logo/Logo';
import Nav from '../../common/header/Nav';
import OffcanvasMenu from './OffcanvasMenu';
import StickyHeader from './StickyHeader';
import SwitcherHeader from '../../elements/switcher/SwitcherHeader';
import MobileMenu from './MobileMenu';


const HeaderFive = ({
                       onASPChange
                   }) => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const OffcanvasHandleClose = () => setShowOffcanvas(false);
    const OffcanvasHandleShow = () => setShowOffcanvas(true);

    const sticky = StickyHeader(100);

    const MobileMenuHandler = () => {
        document.querySelector('.mobilemenu-popup').classList.toggle("show");
        document.querySelector('body').classList.toggle("mobilemenu-show");

        var elements = document.querySelectorAll('.mobilemenu-popup .menu-item-has-children > a');

        for(var i in elements) {
            if(elements.hasOwnProperty(i)) {
                elements[i].onclick = function() {
                    this.parentElement.querySelector('.axil-submenu').classList.toggle("active");
                    this.classList.toggle("open");
                }
            }
        }
    }


    return (
        <>
            <header className="header axil-header header-style-1">
                <div className={`axil-mainmenu axil-sticky`} style={{animation: "none"}}>
                    <div className="container">
                        <div className="header-navbar">
                            <div className="header-logo">
                                <Logo limage="/images/logo-2.png"
                                dimage="/images/logo-2.png"
                                simage="/images/logo-2.png"
                                />
                            </div>
                            <div className="header-main-nav">
                                <div style={{textAlign: "right"}}>
                                    <img src={process.env.PUBLIC_URL +"/images/login_tttsy_logo.png"} width="80px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*<OffcanvasMenu offcanvasShow={showOffcanvas} offcanvasHide={OffcanvasHandleClose} />*/}
            {/*<MobileMenu MobileHandler={MobileMenuHandler}/>*/}
        </>
    )
}

export default HeaderFive;
