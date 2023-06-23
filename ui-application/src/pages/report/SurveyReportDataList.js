import React, {useEffect} from 'react';
import FooterOne from '../../common/footer/FooterOne';
import HeaderOne from '../../common/header/HeaderOne';
import SEO from '../../common/SEO';
import DataTable from "./DataTable";
import {reportApi} from "./reportApi";
import ArrowBack from '@mui/icons-material/ArrowBack';
import {Link, useParams} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import TuneIcon from "@mui/icons-material/Tune";
import VerticalTabs from "./VerticalTabs";
import HorizontalTabs from "./HorizontalTabs";
import DataTableV2 from "./DataTableV2";

const uiToApiMapping = {
    "male": "M",
    "female": "F",
    "age_bellow_30": "below_30",
    "age_30_39": "30-39",
    "age_40_49": "40-49",
    "age_50_59": "50-59",
    "age_60_over": "60_over",
    "single_family_single_person" : "single",
    "single_family_tow_person" : "gen1_2plus",
    "double_family" : "gen2",
    "triple_or_more_family" : "gen3plus",
    "INTJ":"INTJ",
    "INTP":"INTP",
    "ENTJ":"ENTJ",
    "ENTP":"ENTP",
    "INFJ":"INFJ",
    "INFP":"INFP",
    "ENFJ":"ENFJ",
    "ENFP":"ENFP",
    "ISTJ":"ISTJ",
    "ISFJ":"ISFJ",
    "ESTJ":"ESTJ",
    "ESFJ":"ESFJ",
    "ISTP":"ISTP",
    "ISFP":"ISFP",
    "ESTP":"ESTP",
    "ESFP":"ESFP",
    "unknown":"unknown"
};

const SurveyReportDataList = () => {
    const [selectedASP, setSelectedASP] = React.useState("삼척");
    const [data, setData] = React.useState([])
    const [pageSize, setPageSize] = React.useState(10)
    const [pageNumber, setPageNumber] = React.useState(0)

    const [selectedTab, setSelectedTab] = React.useState("gender");
    const [selectedTabData, setSelectedTabData] = React.useState([]);

    const params = useParams();
    const aspId = params.asp;
    useEffect(() => {
        setSelectedASP(aspId);
    }, [aspId]);

    useEffect(() => {
        const userSelectFilterData = Object.entries(selectedTabData)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => key);

        let filter = null;
        if(selectedTab && userSelectFilterData && userSelectFilterData.length > 0){
            const userSelectFilterApiData = userSelectFilterData.map((selectKey) => uiToApiMapping[selectKey]);
            filter = {
                [selectedTab]: userSelectFilterApiData
            }
        }

        let request = {
            asp: selectedASP
            , filter: filter
            , page: pageNumber + 1
            , limit: pageSize
        }

        reportApi.getReportData(request)
            .then((response) => {
                console.log(response)
                setData(response.data);
            })
            .catch(err => {
                console.error(err);
            })

    }, [pageSize, pageNumber, selectedASP, selectedTab, selectedTabData]);

    const handleChangePageInfo = (gridPaginationModel) => {
        console.log(gridPaginationModel)
        // if(gridPaginationModel){
        //     setPageSize(gridPaginationModel.pageSize);
        //     setPageNumber(gridPaginationModel.page);
        // }
        setPageNumber(gridPaginationModel);
    }

    const resetPageInfo = () => {
        setPageSize(10);
        setPageNumber(0);
    }

    const onCategoryChange = (value) => {
        console.log("onCategoryChange setting changed. Value => " + value);
        setSelectedTab(value)
        resetPageInfo();
    };

    const onASPChange = (value) => {
        console.log("onCategoryDataChange setting changed. Value => ");
        console.log(value)
        setSelectedASP(value)
        resetPageInfo();
    };

    const onCategoryDataChange = (value) => {
        console.log("onCategoryDataChange setting changed. Value => ");
        console.log(value)
        setSelectedTabData(value)
        resetPageInfo();
    };




    return (
        <>
            <SEO title="Survey Report"/>
            <main className="main-wrapper">
                <HeaderOne
                    onASPChange={onASPChange}
                />

                <div className="section brand-wrap-area">
                    <div className="container mt-4">
                        <div className={"title-with-icon"}>
                            <div style={{marginRight: "10px"}}>
                                <Link className={"kc-text-color-black kc-p-margin-zero"}
                                      to={process.env.PUBLIC_URL + "/"}>
                                    <ArrowBack />
                                </Link>
                            </div>
                            <div>
                            <h4 style={{margin: "0px"}} className={"restaurant-page-header"}>맛집 정보</h4>
                            </div>
                        </div>


                        <Accordion defaultActiveKey={0}>
                            <Accordion.Item eventKey={0}>
                                <Accordion.Header>
                                    <TuneIcon/> 필터 ({selectedASP})
                                </Accordion.Header>
                                <Accordion.Body>
                                    <select className="form-select selectpicker"
                                            aria-label="Default select example"
                                            onChange={e => setSelectedASP(e.target.value)} style={{width: "150px"}}
                                            value={selectedASP}
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
                                    <HorizontalTabs
                                        onCategoryChange={onCategoryChange}
                                        onCategoryDataChange={onCategoryDataChange}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <div className={"mt-4"}></div>
                        <DataTableV2 data={data}
                                   handleChangePageInfo={handleChangePageInfo}
                                   selectedASP={selectedASP}
                        />
                    </div>
                </div>
                <FooterOne parentClass=""/>
            </main>
        </>
    )
}

export default SurveyReportDataList;
