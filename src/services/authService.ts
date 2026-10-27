import axios from "axios"
import type { child, person } from "../forms/ParentLoginForm"
import { API_URL } from "./generalService";

export const checkFamilyExist = async (data: person) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/admin/login`, {
            familyName: data.familyName.trim(),
            familyCode: data.FamilyCode.trim(),
            adminCode: data.idMeneger?.trim(),
        }

        );

        console.log(res.data)
        return res.data.token;
    }
    catch (error) {
        console.log(error);
        return false;

    }


}

export const checkUserExist = async (data: child) => {

    try {
        const res = await axios.post(`${API_URL}/api/auth/child/login`, {
            familyName: data.familyName.trim(),
            familyCode: data.FamilyCode.trim(),
            childName: data.childName?.trim(),
            childCode: data.childCode?.trim()
        })

        return res.data.token;
    }
    catch (error) {
        console.log(error);
        return false;

    }
}
