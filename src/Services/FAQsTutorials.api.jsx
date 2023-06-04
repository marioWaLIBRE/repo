import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const getFAQsTutorialsApi = async () => {
	return axios.get(baseApiUrl + `/faqs?${Date().toLocaleString()}`);
};
