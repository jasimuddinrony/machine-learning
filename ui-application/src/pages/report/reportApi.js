import {paramUtil} from "./paramUtil";
import {api} from "./baseApi";


import reportData from "./SampleData.json"

export const reportApi = {
    getReportData
    , getReportReasonData
}

function getReportData(requestPayload) {
    // return api.get('/api/post/get-list', paramUtil.stringifyRequestPayload(requestPayload))
    console.log("API Request");
    console.log(paramUtil.removeBlankAttribute(requestPayload));
    return api.post('/api/restaurant/rank?withReason=true', paramUtil.removeBlankAttribute(requestPayload))
}

function getReportReasonData(requestPayload) {
    // return api.get('/api/post/get-list', paramUtil.stringifyRequestPayload(requestPayload))
    console.log("API Request");
    console.log(paramUtil.removeBlankAttribute(requestPayload));
    return api.post('/api/restaurant/reason', paramUtil.removeBlankAttribute(requestPayload))
}
