import React from "react";
import Login from "./Components/Login";
import ForgotPassword from "./Components/forgotPassword"
import Signup from "./Components/Signup";
import Home from  "./Components/Home";
import AddCrime from "./Components/addCrime"
import {AuthProvider} from "./Contexts/AuthContext"
import {BrowserRouter as Router,Route} from "react-router-dom";
import PrivateRoute from "./Components/privateRoute"
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
        </AuthProvider>
      </Router>
      

    </div>
  );
}

export default App;
