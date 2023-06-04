import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const getMasterWallets = async () => {
	return axios.get(baseApiUrl + `masterWallets?${Date().toLocaleString()}`);
};
