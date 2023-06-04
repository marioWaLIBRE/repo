import axios from "axios";
import { baseApiUrl } from "../Share/Constants";
import { decodeBase64 } from "../Share/functions";

export const addWallet = async (data) => {
	return axios.post(baseApiUrl + `clientWallets`, data);
};

export const getWallets = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl + `clientWallets/${email}?${Date().toLocaleString()}`
	);
};

export const updateWallet = async (data, walletId) => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.put(baseApiUrl + `/clientWallets/${email}/${walletId}`, data);
};

export const deleteWalletApi = async (data, walletId) => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.delete(
		baseApiUrl + `/clientWallets/${email}/${walletId}/${data.token}`
	);
};
