import React from 'react'
import cities from "../json/in.json"
import {makeStyles} from '@material-ui/core/styles';
import {useState,useRef} from "react";
import {Form,Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import crime from "../crimeAdd.png"
import Autocomplete from '@material-ui/lab/Autocomplete';
import dateformat from "dateformat";
import app from "../firebase";
import {Link} from "react-router-dom"
import {storage} from "../firebase"
import {useAuth} from "../Contexts/AuthContext";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import DateTimePicker from "react-datetime-picker";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
export default function AddCrime() {
    const [error,setError] = useState("");
    const classes = useStyles();
    const crimePlace = useRef();
    const crimeLoc = useRef();
    const crimeDesc = useRef();
    const {lname,fname,currentUser} = useAuth();
    const [loading,setLoading] = useState(false);
    const [file, setFile] = useState(null);
  const [fileurl, setURL] = useState(null);
  const [datepicked,datePick] = useState(new Date());
  const ref = app.firestore().collection("unverifiedcrimes");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errortwo,setErrorTwo] = useState("");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(false);
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  function saveToDb(url)
  {
    let newdate = new Date();
    let datePick2 = dateformat(datepicked,"dd-mmm-yyyy hh:mm:ss.s")
    
if(crimePlace.current.value)
{
    ref.doc(datePick2).set(
      {
        city:crimePlace.current.value,
        location:crimeLoc.current.value,
        description:crimeDesc.current.value,
        date:`${datePick2}`,
        file:url?url:null,
        uploadedBy:`${fname+' '+lname}`,
        userUid:currentUser.uid,
        dateOfUpload:`${newdate}`
      }
    ).then(()=>
    {
      
    }).catch((err)=>
    {
      
      console.error(err);
    })
  
    setLoading(false);
    setOpen(true);
    setError("Sent for verification, After verification this crime will be added");
    setErrorTwo("")
  } 
  else
  {
  setErrorTwo("Crime not added- Check it out!")
  }
  
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
    
  }
    function addCrime(e)
    {
      setLoading(true);
        e.preventDefault();
        if(file)
        {
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed",console.log,console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
            
          setFile(null);
          setURL(url);
        
          saveToDb(url);
          e.target.reset();
        
        });
    })
}
else
{
    saveToDb(fileurl);
    setLoading(false);

    
    e.target.reset();
   
}

    
  }

    return (
              <div>
          <ToolbarComponent openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
  
        <div id="addCrime" >
           
          <h4 style={{display:'inline'}}>Add Crime</h4><img alt="tagofcrime" src={crime} style={{width:'10em',display:'inline'}}/>
          {errortwo&&<Alert style={{width:'35%', display:'flex',marginBottom:'8px',justifyContent:'center',alignSelf:'center'}}autoHideDuration={100} severity="error">{errortwo}</Alert>}
          
        {error&&
           <Snackbar style={{top:'-180px'}}open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {error}
        </Alert>
      </Snackbar>
}

            <Form onSubmit={addCrime} >
            <Autocomplete
  id="combo-box-demo"
  options={cities}

  getOptionLabel={(option) => option.city}
  style={{}}
  renderInput={(params) => <TextField {...params}
  inputRef={crimePlace} 
  InputLabelProps={{className:classes.textfieldlabel}}
  className={classes.root} label="City of Crime Place"variant="filled" />}
  required/>

                <Form.Group>
                <Form.Control type="name" placeholder="Location of crime (Address)" ref={crimeLoc} required/>
                </Form.Group>
                 <Form.Group>
                    <Form.Control as="textarea" rows={3} placeholder="Crime description" ref={crimeDesc} maxLength="450"/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Date and time of when this crime happen</Form.Label><br/>
                <DateTimePicker  onChange={datePick} value={datepicked} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Any Crime Place Photograph (if you have any)</Form.Label>
                    <Form.Control type="file" onChange={handleChange}  />
                </Form.Group>
                
                <Button id="btnlogin" disabled={loading}  className = "w-100" type="submit">Add</Button> 
            </Form>
           
            {loading && 
             <LinearProgress color="secondary" />}
        </div>
        
<Link to="/home"><footer>
    <div className="texto">
        <span><h5>BACK</h5></span>
    </div>
</footer>
   </Link>
     
        
        </div>
    )
}
