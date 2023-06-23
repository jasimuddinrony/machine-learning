import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Gender from "./serach-config-component/Gender";
import AgeFilter from "./serach-config-component/AgeFilter";
import FamilyFilter from "./serach-config-component/FamilyFilter";
import MBTIFilter from "./serach-config-component/MBTIFilter";
import {useFirstRender} from "@mui/x-data-grid";
import {useEffect} from "react";
import AgeFilterH from "./serach-config-component/AgeFilterH";
import FamilyFilterH from "./serach-config-component/FamilyFilterH";
import MBTIFilterH from "./serach-config-component/MBTIFilterH";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function HorizontalTabs({
    onCategoryChange,
    onCategoryDataChange
                                     }) {
    const [value, setValue] = React.useState(0);

    const [selectedTab, setSelectedTab] = React.useState("gender");
    const [gender, setGender] = React.useState({
        male: false,
        female: false,
    });
    const [age, setAge] = React.useState({
        age_bellow_30: false,
        age_30_39: false,
        age_40_49: false,
        age_50_59: false,
        age_60_over: false,
    });
    const [family, setFamily] = React.useState({
        single_family_single_person: false,
        single_family_tow_person: false,
        double_family: false,
        triple_or_more_family: false,
    });
    const [mbti, setMbti] = React.useState({
        INTJ: false,
        INTP: false,
        ENTJ: false,
        ENTP: false,
        INFJ: false,
        INFP: false,
        ENFJ: false,
        ENFP: false,
        ISTJ: false,
        ISFJ: false,
        ESTJ: false,
        ESFJ: false,
        ISTP: false,
        ISFP: false,
        ESTP: false,
        ESFP: false,
        do_not_know: false
    });

    useEffect(() => {
        if(onCategoryChange){
            onCategoryChange(selectedTab);
        }
    }, [selectedTab]);

    useEffect(() => {

        if(onCategoryDataChange){
            if(selectedTab === "gender"){
                onCategoryDataChange(gender);
            }
            else if(selectedTab === "age_group"){
                onCategoryDataChange(age);
            }
            else if(selectedTab === "family_composition"){
                onCategoryDataChange(family);
            }
            else if(selectedTab === "mbti"){
                onCategoryDataChange(mbti);
            }
        }
    }, [gender, age, family, mbti]);



    const handleChange = (event, newValue) => {
        console.log("Tab change request, event => " + event + " newValue: " + newValue);
        setValue(newValue);
        handleTabSelectValueSetting(newValue);
        resetGenderData();
        resetAgeData();
        resetFamilyData();
        resetMbtiData();
    };

    const handleTabSelectValueSetting = (indexValue) => {
        if(indexValue === 0){
            setSelectedTab("gender")
        } else if(indexValue === 1){
            setSelectedTab("age_group")
        } else if(indexValue === 2){
            setSelectedTab("family_composition")
        } else if(indexValue === 3){
            setSelectedTab("mbti")
        }
    }

    // ========================== Gender search configuration =========================
    const handleGenderData = (name, value) => {
        console.log("Gender data setting changed. Name =>  " + name + " Value => " + value);
        setGender({
            ...gender,
            [name]: value,
        });
    };
    const resetGenderData = () => {
        setGender({
            male: false,
            female: false,
        });
    }
    // ========================== Gender search configuration =========================

    // ========================== Age search configuration =========================
    const handleAgeData = (name, value) => {
        console.log("Age setting changed. Name =>  " + name + " Value => " + value);
        setAge({
            ...age,
            [name]: value,
        });
    };
    const resetAgeData = () => {
        setAge({
            age_bellow_30: false,
            age_30_39: false,
            age_40_49: false,
            age_50_59: false,
            age_60_over: false,
        });
    }

    // ========================== Age search configuration =========================

    // ========================== Family search configuration =========================
    const handleFamilyData = (name, value) => {
        console.log("Family setting changed. Name =>  " + name + " Value => " + value);
        setFamily({
            ...family,
            [name]: value,
        });
    };
    const resetFamilyData = () => {
        setFamily({
            single_family_single_person: false,
            single_family_tow_person: false,
            double_family: false,
            triple_or_more_family: false,
        });
    }
    // ========================== Family search configuration =========================

    // ========================== MBTI search configuration =========================
    const handleMbtiData = (name, value) => {
        console.log("Family setting changed. Name =>  " + name + " Value => " + value);
        setMbti({
            ...mbti,
            [name]: value,
        });
    };
    const resetMbtiData = () => {
        setMbti({
            INTJ: false,
            INTP: false,
            ENTJ: false,
            ENTP: false,
            INFJ: false,
            INFP: false,
            ENFJ: false,
            ENFP: false,
            ISTJ: false,
            ISFJ: false,
            ESTJ: false,
            ESFJ: false,
            ISTP: false,
            ISFP: false,
            ESTP: false,
            ESFP: false,
            unknown: false
        });
    }
    // ========================== MBTI search configuration =========================

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
            >
                <Tab label="성별" {...a11yProps(0)} />
                <Tab label="연령" {...a11yProps(1)} />
                <Tab label="가족 구성" {...a11yProps(2)} />
                <Tab label="MBTI" {...a11yProps(3)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Gender
                    genderData={gender}
                    onChange={handleGenderData}
                />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <AgeFilterH
                    ageData={age}
                    onChange={handleAgeData}
                    />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <FamilyFilterH
                    familyData={family}
                    onChange={handleFamilyData}
                    />
            </TabPanel>

            <TabPanel value={value} index={3}>
                <div style={{height: "205px"}}>
                <MBTIFilterH
                    mbtiData={mbti}
                    onChange={handleMbtiData}
                />
                </div>
            </TabPanel>

        </Box>
    );
}
