import axios from "axios";
import { baseClientToolUrl } from "../Share/Constants";

export const loginClientTool = async (data) => {
	return axios.post(
		baseClientToolUrl + `auth/login`,
		data
	);
};

export const verifyClient2FactorAuthentication = async (token, token2fa) => {
	return axios.post(
		baseClientToolUrl + `auth/2fa/validate`,
		{
			token: token2fa,
		},
		{
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		},
	);
};

export const requestEmailWalletUpdate = async token => {
	return axios.get(
		baseClientToolUrl + `wallets/token`,
		{
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		}
	);
};
