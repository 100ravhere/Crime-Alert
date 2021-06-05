import React from "react";
import Login from "./Components/Login";
import ForgotPassword from "./Components/forgotPassword"
import Signup from "./Components/Signup";
import Home from  "./Components/Home";
import AddCrime from "./Components/addCrime"
import {AuthProvider} from "./Contexts/AuthContext"
import {BrowserRouter as Router,Route} from "react-router-dom";
import PrivateRoute from "./Components/privateRoute"
import PrivateAdmin from "./Components/PrivateAdmin"
import CrimeDesc from "./Components/CrimeDesc";
import Admin from "./Components/Admin"
import AdminCrime from "./Components/AdminCrime";
import AllCrime from "./Components/AllCrime"
import Uploaded from "./Components/Uploaded"
import CityCrime from "./Components/CityCrime"
import Type from "./Components/Type";
function App() {
  return (
    <div>
     
              <Router>
              <AuthProvider>
              <PrivateRoute exact path="/home"  component ={Home} />
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <PrivateRoute path="/add-crime" component={AddCrime} />
        <PrivateRoute path="/crime-desc" component={CrimeDesc} />
        <PrivateAdmin path="/admin-check" component={Admin} />
        <PrivateAdmin path="/admin-crime-details" component={AdminCrime} />
        <PrivateRoute path="/all-crimes" component={AllCrime}/>
        <PrivateRoute path="/uploaded" component={Uploaded} />
        <PrivateRoute path="/city-crime" component={CityCrime} />
        <PrivateRoute path="/added-crimes" component={Uploaded} />
        <PrivateRoute path="/Type" component={Type} />
        
        </AuthProvider>
      </Router>
      

    </div>
  );
}

export default App;
