import axios from "axios";
import type { LookAdd } from "../pages/clothes";
import { API_URL } from "./generalService";


export const AddLook=async(data:LookAdd)=>{
    try{
        await axios.post(`${API_URL}/api/outfits`,
            {name:data.name,clothingItemIds:data.looksToAdd},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }

}
export const GetAll=async()=>{
    try{
        const res=await axios.get(`${API_URL}/api/outfits`,
             {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        return res.data.data;
    }
    catch(error)
    {
        console.log(error);
        return null;
    }
}