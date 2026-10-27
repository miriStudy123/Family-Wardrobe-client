import { useContext, type ReactNode } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Context } from "../context/useContext";

interface userproviderProps {
    children: ReactNode
}

const IsToken=({ children }: userproviderProps)=>{
  
   const token = useContext(Context)?.token

    if(!token)
    {
      return <Navigate to="/" replace />;
    }
    else
    {
       return children
    }
}
export default IsToken