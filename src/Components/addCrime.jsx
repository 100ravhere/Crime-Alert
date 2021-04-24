import React from 'react'
import cities from "../json/in.json"
import {makeStyles} from '@material-ui/core/styles';
import {useState,useRef} from "react";
import {Form,Button,Alert} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import crime from "../crimeAdd.png"
import Autocomplete from '@material-ui/lab/Autocomplete';
import app from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"
import {storage} from "../firebase"


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
    const crimeDate = useRef();
    const [loading,setLoading] = useState(false);
    const [file, setFile] = useState(null);
  const [fileurl, setURL] = useState(null);
  function saveToDb(url)
  {
    app.database().ref('/crimes/'+crimePlace.current.value+'/'+crimeDate.current.value).set(
        {
            location:crimeLoc.current.value,
            description:crimeDesc.current.value,
            date:crimeDate.current.value,
            file:url?url:null
        }
    )
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
    function addCrime(e)
    {
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
            console.log(url);
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
    e.target.reset();
}
    setError("Sent for verification, After verification this crime will be added");
  }
    return (
        <div>
        <div style={{border:'1px solid',display:'inline-block' ,marginBottom:'2%',width:'70%' ,marginTop:'5%',marginRight:'10%', marginLeft:'10%' ,padding:'2%'}}>
           <h2 style={{display:'inline-block'}}>Add Crime</h2><img alt="tagofcrime" src={crime} style={{width:'200px',display:'inline-block'}}/>
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
/>

                <Form.Group>
                <Form.Control type="name" placeholder="Location of crime (Address)" ref={crimeLoc} required/>
                </Form.Group>
                 <Form.Group>
                    <Form.Control type="text" placeholder="Crime description" ref={crimeDesc} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="datetime-local" placeholder="Date and time of when this crime happened" ref={crimeDate} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Any Crime Place Photograph (if you have any)</Form.Label>
                    <Form.Control type="file" onChange={handleChange}  />
                </Form.Group>
                {error && <Alert variant="success">{error}</Alert>}
                <Button id="btnlogin" disabled={loading}  className = "w-100" type="submit">Add</Button> 
            </Form>
            
        </div>
        <Link to="/home"><Button className={classes.root} style={{display:'block',margin:'auto',textDecoration: 'inherit' }}><FontAwesomeIcon icon={faChevronLeft}/> BACK</Button></Link>
       <img src={fileurl} alt="img tag" style={{width:'100px' ,height:'100px' }} />
        
        </div>
    )
}
