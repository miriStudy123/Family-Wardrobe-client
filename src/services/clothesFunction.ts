import axios from "axios"
import type { Look } from "../pages/clothes";
import { API_URL } from "./generalService";

export const GetClothes = async (filter: string) => {

    try {
        const res = await axios.get(`${API_URL}/api/clothing${filter}`,

            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export const SaveMyChoise = async (choise: string[]) => {
    try {
        const res = await axios.put(`${API_URL}/api/current-selection`,
            { clothingItemIds: choise },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

        )

        const res2 = await axios.post(`${API_URL}/api/current-selection/confirm`, {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res2.data;


    }
    catch (error) {
        console.log(error);
        return false;
    }
}