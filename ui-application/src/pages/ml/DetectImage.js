import React, {useEffect, useState, useRef} from 'react';
import FooterOne from '../../common/footer/FooterOne';
import HeaderOne from '../../common/header/HeaderOne';
import SEO from '../../common/SEO';
import HeaderFive from "../../common/header/HeaderFive";
import { Form } from 'react-bootstrap';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import HubIcon from '@mui/icons-material/Hub';
import {mlApi} from "./mlApi";
import SampleImage from "./SampleImage";



const decisionsMap = {};
decisionsMap['battery'] = 'RECYCLABLE';
decisionsMap['biological'] = 'NON_RECYCLABLE';
decisionsMap['brown-glass'] = 'RECYCLABLE';
decisionsMap['cardboard'] = 'RECYCLABLE';
decisionsMap['clothes'] = 'NON_RECYCLABLE';
decisionsMap['green-glass'] = 'RECYCLABLE';
decisionsMap['metal'] = 'RECYCLABLE';
decisionsMap['non-recycle-icon'] = 'NON_RECYCLABLE';
decisionsMap['paper'] = 'RECYCLABLE';
decisionsMap['plastic'] = 'RECYCLABLE';
decisionsMap['recycle-icon'] = 'RECYCLABLE';
decisionsMap['shoes'] = 'NON_RECYCLABLE';
decisionsMap['trash'] = 'NON_RECYCLABLE';
decisionsMap['white-glass'] = 'RECYCLABLE';
decisionsMap['Not Match'] = 'NOT_MATCH';

const categoryMap = {};
categoryMap['battery'] = 'Battery';
categoryMap['biological'] = 'Food';
categoryMap['brown-glass'] = 'Glass';
categoryMap['cardboard'] = 'Cardboard';
categoryMap['clothes'] = 'Clothes';
categoryMap['green-glass'] = 'Glass';
categoryMap['metal'] = 'Matal';
categoryMap['non-recycle-icon'] = 'Non Recycle Item';
categoryMap['paper'] = 'Paper';
categoryMap['plastic'] = 'Plastic';
categoryMap['recycle-icon'] = 'Recycle Item';
categoryMap['shoes'] = 'Shoes';
categoryMap['trash'] = 'Trash';
categoryMap['white-glass'] = 'Glass';
categoryMap['Not Match'] = 'Unknown';

const DetectImage = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDecisionMaking, setIsDecisionMaking] = useState(false);
    const [isRecyclable, setIsRecyclable] = useState(false);
    const [isNonRecyclable, setIsNonRecyclable] = useState(false);
    const [isCannotTakeDecisions, setIsCannotTakeDecisions] = useState(false);
    const [detectCategory, setDetectCategory] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setSelectedFile(file)
    };

    const handleRemoveImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSelectedImage(null);
        setSelectedFile(null);
        resetData();
    }

    useEffect(() => {
        resetData();
        if(selectedImage){
            handleCallToServer(selectedImage)
        }
    }, [selectedImage] );

    const handleCallToServer = () => {

        mlApi.takeDescision(selectedFile)
            .then((res) =>{
                console.log("server response")
                console.log(res)
                if(res && res.data){
                    setDecisionData(res.data)
                }
            })
            .catch(reason => {
                console.log("server error: " )
                console.log(reason)
                setIsDecisionMaking(false);
                setIsCannotTakeDecisions(true);
            })

        setIsDecisionMaking(true);
    }

    const setDecisionData = (data) => {
        let serverDetectCategory = data;
        let category = decisionsMap[serverDetectCategory];
        if(category === 'RECYCLABLE'){
            setIsRecyclable(true);
        } else if(category === 'NON_RECYCLABLE'){
            setIsNonRecyclable(true);
        } else {
            setIsCannotTakeDecisions(true);
        }

        setIsDecisionMaking(false);
        setDetectCategory(serverDetectCategory);
    }

    const resetData = () => {
        setIsCannotTakeDecisions(false);
        setIsRecyclable(false);
        setIsNonRecyclable(false);
        setDetectCategory("");
    }

    const formatString = (str) => {
        // // Split the string into an array of words
        // const words = str.split('-');
        //
        // // Capitalize the first character of each word and convert the rest to lowercase
        // const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        //
        // // Join the formatted words with spaces
        // const formattedString = formattedWords.join(' ');
        const formattedString = categoryMap[str];

        return formattedString;
    }


    return (
        <>
            <SEO title="Survey Report"/>
            <main className="main-wrapper">
                <HeaderFive
                    onASPChange={null}
                />

                <div className="section brand-wrap-area" style={{minHeight: "800px"}}>
                    <div className="container mt-4">
                        {/*<h4>Recyclable Item Detection</h4>*/}
                        <h4>재활용품 감지</h4>
                        {/*<p>Follow these guidelines: Choose an image and preview it to determine its recyclability.</p>*/}
                        <p>다음 지침을 따르세요: 이미지를 선택하고 재활용 가능 여부를 확인하기 위해 미리보기하세요.</p>
                        <div className="row">
                            <div className="col-sm-8">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={"form-control"}
                                    ref={fileInputRef}
                                />
                                {selectedImage && (
                                    <div>
                                        <div style={{textAlign: "right", marginTop: "20px"}}>
                                            <RemoveCircle style={{ color: 'red', cursor: "pointer" }} onClick={handleRemoveImage}/>
                                        </div>

                                        <img src={selectedImage} alt="Selected" className="img-thumbnail" />
                                    </div>
                                )}
                            </div>
                            <div className="col-sm-4" style={{textAlign: "center"}}>


                                {isDecisionMaking &&
                                    <div>
                                        <div style={{textAlign: "center"}} className={"heart-beat-icon"}>
                                            <HubIcon className="rotate-icon" style={{color: "#00d180"}}/>
                                        </div>
                                        <div style={{paddingTop: "10px"}}>
                                            {/*Decision making <span className={"dot-animation"}><b>. . .</b></span>*/}
                                            의사 결정  <span className={"dot-animation"}><b>. . .</b></span>
                                        </div>
                                    </div>
                                }
                                {!isDecisionMaking && !selectedImage &&
                                    <div>
                                        {/*Please select an image to determine if it is recyclable or non-recyclable.*/}
                                        이미지를 선택하여 재활용 가능 여부를 판별해 주세요.

                                        <p style={{textAlign: "left", margin: "20px 0px 0px 15px"}}>훈련 데이터의 카테고리는 다음과 같습니다.</p>
                                        <ul style={{textAlign: "left", marginLeft: "10px"}}>
                                            <li className={"recyclable-li-text"}>Battery</li>
                                            <li className={"non-recyclable-li-text"}>Food</li>
                                            <li className={"recyclable-li-text"}>Glass</li>
                                            <li className={"recyclable-li-text"}>Cardboard</li>
                                            <li className={"non-recyclable-li-text"}>Clothes</li>
                                            <li className={"non-recyclable-li-text"}>Metal</li>
                                            <li className={"recyclable-li-text"}>Paper</li>
                                            <li className={"recyclable-li-text"}>Plastic</li>
                                            <li className={"non-recyclable-li-text"}>Shoes</li>
                                            <li className={"non-recyclable-li-text"}>Trash</li>
                                        </ul>
                                    </div>
                                }


                                <div className="text-container">
                                    {isRecyclable && <div className="recyclable-text">
                                        {/*Recyclable*/}
                                        재활용 가능한
                                    </div> }
                                    {isNonRecyclable && <div className="non-recyclable-text">
                                        {/*Non Recyclable*/}
                                        재활용 불가능한
                                    </div> }
                                    {isCannotTakeDecisions && <div className="decision-text">
                                        {/*Apologies, we were unable to detect your selected image with our pre-existing knowledge data.*/}
                                        죄송합니다. 저희는 사전에 알고 있는 데이터로 선택한 이미지를 감지하지 못했습니다.
                                    </div> }

                                    {detectCategory && <div>
                                        {/*Selected image category is: <span className="selected-category-text">{formatString(detectCategory)}</span>*/}
                                        선택된 이미지의 카테고리는: <span className="selected-category-text">{formatString(detectCategory)}</span> 입니다.
                                    </div>}
                                </div>

                            </div>
                        </div>

                        {/*{!selectedImage && <div className="row">*/}
                        {/*    <SampleImage/>*/}
                        {/*</div> }*/}



                    </div>
                </div>
                <FooterOne parentClass=""/>
            </main>
        </>
    )
}

export default DetectImage;

