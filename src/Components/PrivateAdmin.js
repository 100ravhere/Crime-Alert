import React from 'react'
import {Redirect,Route} from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";
export default function PrivateAdmin({component:Component,...rest}) {
    const {currentUser} = useAuth();
    return (
        <Route
            {...rest}
            render={props =>{
         
                return (currentUser && currentUser.email==="adminlogin@gmail.com")?<Component {...props} />: <Redirect to="/" />
            }}

        >
        </Route>
            )
}
