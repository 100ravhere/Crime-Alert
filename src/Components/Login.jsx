import React,{useRef,useState} from "react";
import {Link,useHistory} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import {useAuth} from "../Contexts/AuthContext";
export default function Login()
{
   
    const emailRef = useRef();
    const passwordRef = useRef();
   const {login} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
   const history = useHistory()
   async function handleSubmit(e)
   {
    e.preventDefault()
    try
    {
        setError("")
        setLoading(true)
        if(emailRef.current.value==="adminlogin@gmail.com" && passwordRef.current.value==="adminincorrect1@")
        {
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/admin-check");
        }
        else
        {
        await login(emailRef.current.value,passwordRef.current.value)
        history.push("/home")
        }
     
    }
    catch{
        setError("Failed to Log in")
    }
    setLoading(false)

   }
     return( 
        <div className="bg">
         <div>
     <div className="d-flex justify-content-center h-100">
         <div className="container col-25">
         <div className="card-header">
                 <h1>Log in</h1>
               </div>
               {error && <Alert variant="danger">{error}</Alert>}
           <div className="card-body" >
        <Form onSubmit={handleSubmit}>
            <Form.Group id = "email" >
                <Form.Control placeholder="Email"  type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control placeholder="Password" type="password" ref={passwordRef} required />
            </Form.Group>
          
           
            <Button id="btnlogin" disabled={loading}  className = "w-100" type="submit">
                Log in
            </Button>

        </Form>
    <div className="w-100 text-center mt-2"><Link to="/forgot-password" id="forgotlink">Forgot Password?</Link></div>
  </div></div>
  </div>
  <br/>
  <div className="d-flex justify-content-center links">

                <p className="needAc">Need an account? <b><Link to="/signup">Sign up</Link></b></p>
               </div>
            </div>
  </div>
				

    )}
