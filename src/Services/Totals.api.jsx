import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const getTotals = () => {
	return axios.get(baseApiUrl + `totals?${Date().toLocaleString()}`);
};
