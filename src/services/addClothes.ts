import axios from "axios"
import type { Clothes } from "../forms/createClothes";
import { API_URL } from "./generalService";

export const getAllChildren = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/children`,

            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

        )
        return res.data.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const AddClothing = async(data: Clothes) => {
    try {
       const res=await axios.post(`${API_URL}/api/clothing`, data, {
            headers:
                { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        return res.data.item;
    }
    catch (error) {
        console.log(error);
        return false;
    }

}