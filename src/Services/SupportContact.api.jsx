import axios from "axios";
import { baseApiUrl } from "../Share/Constants";
import { decodeBase64 } from "../Share/functions";

export const getReferrers = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(baseApiUrl + `/users/referrers/${email}?${Date().toLocaleString()}`);
};
