import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/useContext";
import {useContext} from "react"
import { IconHanger, IconLogout } from "@tabler/icons-react"
const Header = () => {
   
    const data=useContext(Context)
    const userr = data?.userr
    
    const navigate = useNavigate();
    const Logout=async()=>{
        if(data!=null)
        {
            await data.logout()
              navigate("/");

        }
        
    }
    return <header className="app-header">
        <nav className="nav">
            <IconHanger className="me-2 self-center" size={28} stroke={1.8} />

            <Link className="nav-link" to="/app/Home/">דף הבית</Link>
            {data?.userr?.role=="child" && <Link className="nav-link" to="/app/clothes/">לארון הבגדים שלי</Link>}
            <Link className="nav-link" to="/">כניסה ממשתמש אחר</Link>
            <Link className="nav-link" to="/createFamily/">ליצירת משפחה חדשה</Link>
           {data?.userr?.role=="admin" &&  <Link className="nav-link" to="/app/createChilde/">להוספת ילד למערכת</Link>}
           {data?.userr?.role=="admin" &&  <Link className="nav-link" to="/app/Masseges/">להודעות שנשלחו</Link>}
            {data?.userr?.role=="child" && <Link className="nav-link" to="/app/massegeToChild/">☎️ מרכז ההודעות שלי</Link>}
           {data?.userr?.role=="admin" &&<Link className="nav-link" to="/app/UpdateStatus/">לעדכון בגדים בארון</Link>}
        </nav>
          <button className="btn-ghost btn-sm order-last" onClick={Logout}>
          <IconLogout className="-scale-x-100" size={18} stroke={2} />
         logout</button>
        <p className="user-badge"> {userr?.role=="admin"?"אמא" :userr?.name} מחובר\ת</p>
    </header>
}
export default Header