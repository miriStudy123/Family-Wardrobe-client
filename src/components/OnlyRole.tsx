import { useContext, type ReactNode } from "react"
import { Context } from "../context/useContext"
import { Navigate } from "react-router-dom"

interface userproviderProps {
    children: ReactNode
    ,role:string
}


const OnlyRole=({ children ,role}: userproviderProps)=>{
    const context=useContext(Context)
    if(context)
    {
        if(context.userr==null)
        {
             return <p className="status-line mt-10">טוען...</p>; 
        }
        if(context.userr?.role!=role)
            return<Navigate to="/app/Home" replace />;
        else{
            return children
        }
    }
      return children
}
export default OnlyRole