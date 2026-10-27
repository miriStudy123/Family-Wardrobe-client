import axios from "axios"
import { API_URL } from "./generalService";

export const GetAllMassege = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/messages`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

        )
      return  res.data.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const SendMassege = async (massege: string) => {
    try {
        const res = await axios.post(`${API_URL}/api/messages`,
            { body: massege },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data.message;

    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const MarkAsRead = async (id: string) => {
    try {
        const res = await axios.patch(
            `${API_URL}/api/messages/${id}/read`,           
            {},                                                            
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }  
        )
        return res.data.message;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
