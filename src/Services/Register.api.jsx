import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const registerUserApi = (data) => {
	return axios.post(baseApiUrl + `users`, data);
};
