import axios from "axios";
import { baseApiUrl } from "../Share/Constants";
import { decodeBase64 } from "../Share/functions";

export const getPackageEmail = async (userEmail) => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl +
			`packages/${email}` +
			(userEmail ? `/${userEmail}` : "") +
			`?${Date().toLocaleString()}`
	);
};

export const getPackagesTierOneReferralsByEmail = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl + `/packagestierone/${email}?${Date().toLocaleString()}`
	);
};

export const getPackagesTierTwoReferralsByEmail = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl + `/packagestiertwo/${email}?${Date().toLocaleString()}`
	);
};

export const getSelectCurreny = async () => {
	return axios.get(baseApiUrl + `currencies?${Date().toLocaleString()}`);
};

export const getCampaignsApi = async () => {
	return axios.get(baseApiUrl + `campaigns?${Date().toLocaleString()}`);
};

export const getSelectExchangesWallets = async () => {
	return axios.get(baseApiUrl + `ExchangesWallets?${Date().toLocaleString()}`);
};

export const getWalletToPay = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl + `clientWallets/${email}?${Date().toLocaleString()}`
	);
};

export const postNewPackage = async (data) => {
	return axios.post(baseApiUrl + `packages`, data);
};

export const putPackagesState = async (data) => {
	const packagesId = data.PackagesId;
	return axios.put(baseApiUrl + `/packages/${packagesId}`, data.body);
};

export const getTransactionsApi = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.get(
		baseApiUrl + `/transactions/${email}?${Date().toLocaleString()}`
	);
};

export const getPckPurchaseTransaction = async (PackagesId) => {
	return axios.get(baseApiUrl + `/bctrn/${PackagesId}`);
};

export const getPaymentTransactions = async (PackagesId, email) => {
	return axios.get(
		baseApiUrl + `/transactions/byPackageId/${PackagesId}?email=${email}`
	);
};

export const deleteAllPackagesRejectedApi = async () => {
	let emailCodification = decodeBase64(sessionStorage.getItem("id"));
	const email = emailCodification;
	return axios.delete(baseApiUrl + `/packages/rejected/${email}`);
};
