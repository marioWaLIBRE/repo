import axios from "axios";
import { baseApiUrl } from "../Share/Constants";
import { decodeBase64 } from "../Share/functions";

export const getProfileApi = () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(baseApiUrl + `users/${email}?${Date().toLocaleString()}`);
};

export const updatedProfileApi = (data) => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.put(baseApiUrl + `users/${email}`, data);
};

export const getCurrencyApi = () => {
	return axios.get(baseApiUrl + `currencies?${Date().toLocaleString()}`);
};

export const updatedPasswordApi = (data) => {
	return axios.put(baseApiUrl + `users/password/changePassword`, data);
};
