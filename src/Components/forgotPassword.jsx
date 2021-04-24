import React,{useRef,useState} from "react";
import {Link} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import {useAuth} from "../Contexts/AuthContext";
export default function ForgotPassword()
{
   
    const emailRef = useRef();

  
   const {resetPassword} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")
   async function handleSubmit(e)
   {
    e.preventDefault()
   
    try
    {
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check your inbox for further instruction")
      
    }
    catch{
        setError("Failed to reset password")
    }
    setLoading(false)

   }
     return(
        <div className="bg">
          <div>
    <div className="d-flex justify-content-center h-100">
        <div className="container">
        <div className="card-header">
                 <h1>Reset your password</h1>
               </div>
               {message&&<Alert variant="warning">{message}</Alert>}
               {error && <Alert variant="danger">{error}</Alert>}
           <div className="card-body" >
        <Form onSubmit={handleSubmit}>
           
            <Form.Group id = "email" >
                <Form.Control placeholder="Email"  type="email" ref={emailRef} required />
            </Form.Group>
      

            <Button id="btnlogin"disabled={loading}  className = "w-100" type="submit">
                Reset
            </Button>

        </Form>
    
  </div></div>
  </div>
 <div className="d-flex justify-content-center links">

 <div className="w-100 text-center mt-2"><Link to="/" id="forgotlink">Login now</Link></div>
               </div>
            </div>
  </div>
				

    )}
