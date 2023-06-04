import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const login = async (data) => {
	return await axios.post(baseApiUrl + `users/login?${Date().toLocaleString()}`, data);
};

export const qrVerify = async (data) => {
	return axios.post(baseApiUrl + "users/2FA/verify", data);
};

export const qrValidate = async (data) => {
	return axios.post(baseApiUrl + "/users/2FA/validate", data);
};

export const sendCodeEmail = async (data) => {
	return axios.post(baseApiUrl + "/users/email/sendVerEmail", data);
};

export const validateEmailApi = async (data) => {
	return axios.post(baseApiUrl + "/users/email/verify", data);
};

export const resetYourPassApi = async (data) => {
	return axios.post(
		baseApiUrl + `/users/password/SendResetPasswordEmail`,
		data
	);
};

export const sendResetPassApi = async (data) => {
	return axios.put(
		baseApiUrl + `/users/password/changePassword`,
		data
	);
};

export const resetPasswordApi = async (data) => {
	return axios.put(
		baseApiUrl + `/users/password/resetPassword`,
		data
	);
};
