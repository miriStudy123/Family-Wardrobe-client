import { useNavigate } from "react-router-dom"
import ParentLoginForm from "../forms/ParentLoginForm"
import { IconShirt } from "@tabler/icons-react"

const Login = () => {
    const navigate=useNavigate();
    return (
        <div className="auth-card">
            <IconShirt className="mx-auto mb-4 block text-brand-500" size={48} stroke={1.6} />
            <button className="about-link" onClick={()=>{
                navigate("/AboutUs")
            }}>קצת עלינו...</button>
            <h1 className="page-title text-center">ברוכים הבאים לארון הדיגיטלי</h1>
            <p className="muted mt-2 text-center text-base">כל הבגדים שלך במקום אחד</p>
             <h1 className="auth-divider">Login</h1>
            <ParentLoginForm/>
            
            </div>)
}
export default Login