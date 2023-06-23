import React, {useEffect, useState} from 'react';
import FooterOne from '../../common/footer/FooterOne';
import HeaderOne from '../../common/header/HeaderOne';
import SEO from '../../common/SEO';
import VerticalTabs from "./VerticalTabs";
import RestaurantData from "./RestaurantData";
import {reportApi} from "./reportApi";
import Accordion from "react-bootstrap/Accordion";
import TuneIcon from '@mui/icons-material/Tune';
import MapComponentV3 from "./kakao-map/MapComponentV3";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForward from "@mui/icons-material/ArrowForward";

const uiToApiMapping = {
    "male": "M",
    "female": "F",
    "age_bellow_30": "below_30",
    "age_30_39": "30-39",
    "age_40_49": "40-49",
    "age_50_59": "50-59",
    "age_60_over": "60_over",
    "single_family_single_person": "single",
    "single_family_tow_person": "gen1_2plus",
    "double_family": "gen2",
    "triple_or_more_family": "gen3plus",
    "INTJ": "INTJ",
    "INTP": "INTP",
    "ENTJ": "ENTJ",
    "ENTP": "ENTP",
    "INFJ": "INFJ",
    "INFP": "INFP",
    "ENFJ": "ENFJ",
    "ENFP": "ENFP",
    "ISTJ": "ISTJ",
    "ISFJ": "ISFJ",
    "ESTJ": "ESTJ",
    "ESFJ": "ESFJ",
    "ISTP": "ISTP",
    "ISFP": "ISFP",
    "ESTP": "ESTP",
    "ESFP": "ESFP",
    "unknown": "unknown"
};

const SurveyReport = () => {

    const [selectedTab, setSelectedTab] = React.useState("gender");
    const [selectedTabData, setSelectedTabData] = React.useState([]);
    const [selectedASP, setSelectedASP] = React.useState("삼척");

    const [data, setData] = React.useState();
    const [targetData, setTargetData] = React.useState({});

    const [selectedOption, setSelectedOption] = useState("삼척");

    const onCategoryChange = (value) => {
        console.log("onCategoryChange setting changed. Value => " + value);
        setSelectedTab(value)
    };

    const onASPChange = (value) => {
        console.log("onCategoryDataChange setting changed. Value => ");
        console.log(value)
        setSelectedASP(value)
    };

    const onCategoryDataChange = (value) => {
        console.log("onCategoryDataChange setting changed. Value => ");
        console.log(value)
        setSelectedTabData(value)
    };

    const handleMouseOver = (item) => {
        setTargetData(item);
    };

    const handleMouseOut = (item) => {
        setTargetData({});
    };


    useEffect(() => {
        setTargetData({})
        const userSelectFilterData = Object.entries(selectedTabData)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => key);

        let filter = null;
        if (selectedTab && userSelectFilterData && userSelectFilterData.length > 0) {
            const userSelectFilterApiData = userSelectFilterData.map((selectKey) => uiToApiMapping[selectKey]);
            filter = {
                [selectedTab]: userSelectFilterApiData
            }
        }

        let request = {
            asp: selectedASP
            , filter: filter
            , page: 1
            , limit: 20
        }

        reportApi.getReportData(request)
            .then((response) => {
                console.log(response)
                setData(response.data);
            })
            .catch(err => {
                console.error(err);
            })

        console.log("********************** END *************************");
    }, [selectedTab, selectedTabData, selectedASP]);


    const showTotalItems = () => {
        let count = 0;
        if (data && data.results) {
            count = data.results.length;
        }
        return "(" + count + ")";
    }


    return (
        <>
            <SEO title="Survey Report"/>
            <main className="main-wrapper">
                <HeaderOne
                    onASPChange={onASPChange}
                />

                <div className="section brand-wrap-area">
                    <div className="container mt-4">

                        <div className="row">
                            <div className="col-sm-4">

                                <Accordion defaultActiveKey={0}>
                                    <Accordion.Item eventKey={0}>
                                        <Accordion.Header>
                                            <TuneIcon/> 필터 ({selectedASP})
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <select className="form-select selectpicker"
                                                    aria-label="Default select example"
                                                    onChange={e => setSelectedASP(e.target.value)}>
                                                >

                                                <option value="삼척">삼척</option>
                                                <option value="음성">음성</option>
                                                <option value="영광">영광</option>
                                                <option value="횡성">횡성</option>
                                                <option value="고성">고성</option>
                                                <option value="옥천">옥천</option>
                                                <option value="인제">인제</option>
                                                <option value="인천">인천</option>
                                                <option value="밀양">밀양</option>
                                                <option value="경산">경산</option>
                                                <option value="김천">김천</option>
                                                <option value="경주">경주</option>
                                                <option value="서울">서울</option>
                                                <option value="부산">부산</option>
                                                <option value="대구">대구</option>
                                                <option value="광주">광주</option>
                                                <option value="대전">대전</option>
                                                <option value="울산">울산</option>
                                                <option value="경기">경기</option>
                                                <option value="강원">강원</option>
                                                <option value="충북">충북</option>
                                                <option value="충남">충남</option>
                                                <option value="전북">전북</option>
                                                <option value="전남">전남</option>
                                                <option value="경북">경북</option>
                                                <option value="경남">경남</option>
                                                <option value="제주도">제주도</option>
                                                <option value="세종">세종</option>

                                            </select>
                                            <div className={"mt-2"}></div>
                                            <VerticalTabs
                                                onCategoryChange={onCategoryChange}
                                                onCategoryDataChange={onCategoryDataChange}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className={"mt-4"}></div>
                                <table width={"100%"} style={{margin: "0px"}}>
                                    <tr>
                                        <td>
                                            <h5 style={{
                                                margin: "20px 0px 10px 0px",
                                                fontSize: "18px",
                                                fontWeight: "blod",
                                            }}
                                            >
                                                맛집 목록 {showTotalItems()}
                                            </h5>
                                        </td>
                                        <td align={"right"}>
                                            <Link className={"kc-text-color-black kc-p-margin-zero"}
                                                  to={process.env.PUBLIC_URL + "/data-list/" + selectedASP}>
                                                <Button variant="outlined" startIcon={<ArrowForward />}>
                                                    모든 맛집 확인하기
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                                <div style={{borderBottom: "1px solid", marginBottom: "10px"}}></div>


                                <div style={{height: "650px", overflowY: "scroll", width: "auto"}}
                                     className={"report-ui"}>
                                    <RestaurantData
                                        data={data}
                                        handleMouseOut={handleMouseOut}
                                        handleMouseOver={handleMouseOver}
                                    />
                                </div>


                            </div>
                            <div className="col-sm-8">
                                {/*<MapComponentV2 data={data}*/}
                                {/*                targetItem={targetData}*/}
                                {/*/>*/}
                                <MapComponentV3 data={data}
                                                targetItem={targetData}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <FooterOne parentClass=""/>
            </main>
        </>
    )
}

export default SurveyReport;
