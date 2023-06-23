import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";


const Nav = ({onASPChange}) => {

    // const [selectedOption, setSelectedOption] = useState("삼척");
    //
    // useEffect(() => {
    //     if(onASPChange){
    //         onASPChange(selectedOption);
    //     }
    // }, [selectedOption]);
    return (
        <nav className="mainmenu-nav" style={{height: "40px"}}>
            <ul className="mainmenu">
                {/*<li>*/}
                {/*    <select className="form-select selectpicker"*/}
                {/*            aria-label="Default select example"*/}
                {/*            onChange={e => setSelectedOption(e.target.value)}>*/}
                {/*    >*/}

                {/*        <option value="삼척">삼척</option>*/}
                {/*        <option value="음성">음성</option>*/}
                {/*        <option value="영광">영광</option>*/}
                {/*        <option value="횡성">횡성</option>*/}
                {/*        <option value="고성">고성</option>*/}
                {/*        <option value="옥천">옥천</option>*/}
                {/*        <option value="인제">인제</option>*/}
                {/*        <option value="인천">인천</option>*/}
                {/*        <option value="밀양">밀양</option>*/}
                {/*        <option value="경산">경산</option>*/}
                {/*        <option value="김천">김천</option>*/}
                {/*        <option value="경주">경주</option>*/}

                {/*    </select>*/}

                {/*</li>*/}
            </ul>
        </nav>
    )
}

export default Nav;
