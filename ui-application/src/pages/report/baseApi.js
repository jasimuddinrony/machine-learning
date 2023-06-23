import axios, {AxiosResponse} from "axios";

export const baseURL = 'https://konasd.com/pdf-service';
export const ResponseModel = AxiosResponse;
const baseOptions = {
	baseURL: baseURL,
	timeout: 0,
	withCredentials: false
};

export const api = axios.create(baseOptions);
export const asyncApi = axios.create(baseOptions);
