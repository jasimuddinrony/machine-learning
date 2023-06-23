import {api} from "../report/baseApi";



export const mlApi = {
    takeDescision
}

function takeDescision(selectedFile) {
    // return api.get('/api/post/get-list', paramUtil.stringifyRequestPayload(requestPayload))
    console.log("API Request");
    const formData = new FormData();
    formData.append('file', selectedFile);
    return api.post('/api/kttt/waste-classifier', formData)
}

