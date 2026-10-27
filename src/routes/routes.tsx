import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Clothes from "../pages/clothes";
import CreatedFamily from "../forms/createdFamily";
import CreateChilde from "../forms/createChilde";
import Login from "../components/login";
import IsToken from "../components/ifToken";
import AddClothe from "../forms/createClothes";
import UpdateStatus from "../pages/updateStatus";
import DeleteClothes from "../components/deleteClothes";
import Masseges from "../pages/Masseges";
import MassegeToChild from "../pages/massegeToChild";
import OnlyRole from "../components/OnlyRole";
import AboutUs from "../pages/Aboutus";

export const routes = createBrowserRouter([
    {
        path: "/", element: <Login />
    },
    {path:"AboutUs" ,element:<AboutUs/>}
    ,
    {
        path: "app", element: <IsToken><App/></IsToken>, children: [
            {
                path: "Home", element: <Home />
            },
            {
                path: "clothes", element: <OnlyRole role="child" ><Clothes /></OnlyRole>
            },
        
        
            {
                path: "createChilde", element:<OnlyRole role="admin" ><CreateChilde /></OnlyRole> 
            }
            ,
            {
                path:"AddClothe",element:<OnlyRole role="admin" ><AddClothe/></OnlyRole>
            }
            ,
            {
                path:"updateStatus",element:<OnlyRole role="admin" ><UpdateStatus/></OnlyRole>
            }
            ,
            {
                path:"DeleteClothes",element:<OnlyRole role="admin" ><DeleteClothes/></OnlyRole>
            }
            ,{
                path:"Masseges",element:<OnlyRole role="admin" ><Masseges/></OnlyRole>
            }
            ,
            {path:"massegeToChild",element:<OnlyRole role="child" ><MassegeToChild/></OnlyRole>}
        ]


    },
    {
        path: "/createFamily", element: <CreatedFamily />
    },




])