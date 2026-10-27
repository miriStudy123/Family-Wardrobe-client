
import axios from "axios";
import type { Family } from "../forms/createdFamily"
import type { childAdd } from "../forms/createChilde";
import { API_URL } from "./generalService";
export const AddFamily = async (data: Family) => {
    try {
        const res = await axios.post(`${API_URL}/api/families`,
            { name: data.Name, adminCode: data.adminCode }
        )
        return res.data.family.familyCode;

    }
    catch (error) {
        console.log("שגיאה בעת הוספת משפחה למאגר")
        return false;
    }
}
export const AddChildren = async (data: childAdd) => {
    try {
        const res = await axios.post(`${API_URL}/api/children`,
            { name: data.name, gender: data.gender },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        return res.data.childCode;
    }
    catch(error)
    {
        console.log("שגיאה בעת הוספת הילד למאגר");
        return false;
    }
}

