import React,{useRef,useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
 import cities from "../json/in.json"
import {useHistory} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useAuth} from "../Contexts/AuthContext";
import app from "../firebase";
import {Link} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor:'#36096d',
      backgroundImage: 'linear-gradient(315deg, #36096d 0%, #37d5d6 74%)',
      borderColor:'white'
    },
    margin: {
      margin: theme.spacing(1),
    },
    textfieldlabel:
    {
        color:'black'
    }
  }));
export default function Signup()
{
    const classes = useStyles();
    const inputRef = useRef();
    const FirstNameRef= useRef();
    const LastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef =useRef();
   const {signup} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
   const history = useHistory();
   const ref = app.firestore().collection("users"); 
   async function handleSubmit(e)
   {

    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value)
    {
        return setError("Password do not match")
    }

    try
    {
  
        setError("")
        setLoading(true)
       await signup(emailRef.current.value,passwordRef.current.value)
       .then(credential => {
        // Save user here.
        
        ref.doc(credential.user.uid).set(
          {
            firstname: FirstNameRef.current.value,
            lastname:LastNameRef.current.value,
          email: credential.user.email,
          uid: credential.user.uid,
          location:inputRef.current.value
          }
        ).then(()=>
        {
          
        })
        .catch((err)=>
        {
          
        })
       
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
      });
                
          
        history.push("/")
    }
    catch(err){
        setError("Failed to create an account")
        console.log(err);
    }
    setLoading(false)

   }
     return(
        <div className="bg">
        <div>
    <div className="d-flex justify-content-center h-100">
        <div className="container">
        <div className="card-header">
                 <h1>Sign up</h1>
               </div>
               {error && <Alert variant="danger">{error}</Alert>}
           <div className="card-body" >
        <Form onSubmit={handleSubmit}>
        <Form.Group style={{width:'48%',marginRight:'4%',display:'inline-block'}} id = "First" >
                <Form.Control placeholder="First Name"  type="name" ref={FirstNameRef} required />
            </Form.Group>
            <Form.Group id = "Last" style={{width:'48%' ,display:'inline-block'}}>
                <Form.Control placeholder="Last Name"  type="name" ref={LastNameRef} required />
            </Form.Group>
            <Form.Group id = "email" >
                <Form.Control placeholder="Email"  type="email" ref={emailRef} required />
            </Form.Group>
            <Autocomplete
  id="combo-box-demo"
  options={cities}

  getOptionLabel={(option) => option.city}
  style={{ width: '100%'}}
  renderInput={(params) => <TextField {...params}
  inputRef={inputRef} 
  InputLabelProps={{className:classes.textfieldlabel}}
  className={classes.root} label="Current City"variant="filled" />}
/>

    <Form.Group></Form.Group>
            <Form.Group id="password">
              <Form.Control placeholder="Password" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control placeholder="Confirm Password" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button id="btnlogin" disabled={loading}  className = "w-100" type="submit">
                Sign up
            </Button>

        </Form>
    
  </div></div>
</div>
<br/>
  <div className="d-flex justify-content-center links">

                <p  className="needAc">Already have a account?<Link to="/"><b> Login Now</b></Link></p>
               </div>
            </div>
  </div>
		

    )}
