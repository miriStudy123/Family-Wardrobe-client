import axios from "axios"
import { API_URL } from "./generalService";

export const DeleteClothesFunc=async(id:string)=>
{
    try{
        const res=await axios.delete(`${API_URL}/api/clothing/${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data.deleted;
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}