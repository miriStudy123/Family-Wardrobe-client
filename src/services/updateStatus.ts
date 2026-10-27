import axios from "axios"
import { API_URL } from "./generalService";

export const GetNotAvailable=async()=>{
    try{
        const res= await axios.get(`${API_URL}/api/clothing?isAvailable=false&limit=100`,
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data.data;

    }
    catch(error)
    {
        console.log(error);
        return null;
    }
}
export const UpDate=async(id:string)=>{
    try{
        const res=await axios.patch(`${API_URL}/api/clothing/${id}`,
            { isAvailable: true },
             { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data;
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}
