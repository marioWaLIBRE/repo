import axios from "axios"
import { baseApiUrl } from "../Share/Constants";

export const getReferralLeadersApi = async () => {
    return axios.get(baseApiUrl + `/users/reports/superAffiliates?${Date().toLocaleString()}`)
}