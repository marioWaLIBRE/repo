import axios from "axios";
import { baseApiUrl } from "../Share/Constants";

export const getTestimonialsApi = async () => {
	return axios.get(baseApiUrl + `/testimonials?${Date().toLocaleString()}`);
};
