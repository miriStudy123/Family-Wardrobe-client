import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { createContext } from "react";
import { API_URL } from "../services/generalService";



type User =
    {
        familyName: string,
        familyCode: string,
        role: string,
        name: string,
        gender?: string,

    }
interface usercontext {
    userr: User | null,
    token: string | null,
    logout: () => void,
    getToken: (token: string) => void
}
export const Context = createContext<usercontext | null>(null);


interface userproviderProps {
    children: ReactNode
}
export const UserProvider = ({ children }: userproviderProps) => {

    const [userr, setuser] = useState<User | null>(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const UserIs = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/me`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setuser(res.data)
        }
        catch (error) {
            console.log(error);
            logout();
        }



    }
    useEffect(() => {
        if (token) {
            try {
                UserIs();
            }
            catch (error) {
                console.log(error);

            }

        }
        else { setuser(null) }
    }, [token])
    const getToken = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);

    }

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch {

        }
        localStorage.removeItem('token');
        setToken(null);
        setuser(null);


    }
    return <Context.Provider value={{ userr, token, logout, getToken }}>{children}</Context.Provider>

}
