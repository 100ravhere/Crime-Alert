import React, { useState ,useRef} from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import {makeStyles} from '@material-ui/core/styles';
import cities from "../../json/in.json"
import {useHistory} from "react-router-dom"
import app from "../../firebase"
import {useAuth} from "../../Contexts/AuthContext"
import Popup from "../Popup"
import Alert from '@material-ui/lab/Alert';
import firebase from "firebase/app"
import $ from 'jquery';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
makeStyles((theme) => ({
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
      color:'white'
  }
}));
const styles = (theme) => ({
  textfieldlabel:
  {
      color:'white'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "55%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width:'400px',


    
    
  },
  IconButton:{
    display:'block'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    textcolor:'white',
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
 
  sectionMobile: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  }
});

const ToolbarComponent = (props) => {
  const crimePlace = useRef();
  const history = useHistory();
  const [isOpen,setIsOpen] = useState(false);
  const {currentUser,notiLength,setNotiLength,setDateDesc,setLoc} = useAuth();
  const [notiArray,setNotiArray] = useState([]);
  const toggleNoti=()=>
  {
    setIsOpen(!isOpen);
    getNoti()
    setNotiLength(0);
  }
  function getNoti()
  {
    let obj={};
    let notiArr = [];
   app.firestore().collection("users").doc(currentUser.uid).onSnapshot((snap)=>
   {
     if(snap.data().notifications)
     {
     snap.data().notifications.forEach((e)=>
     {
       obj={
        city:e.city,
        date:e.date,
         description:e.description,
        status:e.status,
         userId:e.userId
       }
       notiArr.push(obj);
     })
     notiArr.reverse();
     setNotiArray(notiArr);
     notiArr=[];
    
    }
   })
  }
  function rowRemove(objj)
  {
    let userRef = app.firestore().collection("users").doc(currentUser.uid);
 
       userRef.update({
         notifications:firebase.firestore.FieldValue.arrayRemove(objj)
       })
  $('#gfg').show().delay(1000).fadeOut(200);
       
       
  }
  function rowClick(objj,datee,citee,uid)
{
  setDateDesc(datee)
  setLoc(citee)
  let userRef = app.firestore().collection("users").doc(currentUser.uid);
  console.log(objj)
       userRef.update({
         notifications:firebase.firestore.FieldValue.arrayRemove(objj)
       })
  history.push('/crime-desc');
}

  function cityoCrime(e)
  {
    // e.preventDefault();
    
    // selectCityCrime(e);
    
    try{
      props.onUpdate(e)  
  

    }
    catch(error){
      console.log(error)
    }
    
    if(window.location.href.indexOf("Type")!==-1||window.location.href.indexOf("add-crime")!==-1||window.location.href.indexOf("home")!==-1||window.location.href.indexOf("all-crimes")!==-1||window.location.href.indexOf("Added-crimes")!==-1){
      
      history.push("city-crime/"+e)
  
    }
    else{
      history.push(e)
    }
  
  }

  const { classes } = props;
 return (
    <div className={classes.grow}>
      

      <AppBar position="static" style={{backgroundImage: 'linear-gradient(315deg, #36096d 0%, #0D67B1 74%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={props.openDrawerHandler}
          >
            <MenuIcon />
          </IconButton>
          <Typography id="headnav" className={classes.title} variant="h6" noWrap>
           Crime Alert
          </Typography>
    
          <div className={classes.search}>
            <div className={classes.searchIcon}>
           
            </div>
            {/* <Form onSubmit={cityoCrime}> */}
            <Autocomplete
  id="combo-box-demo"
  onKeyPress={(event)=>{
    if(event.nativeEvent.key==="Enter"){
      cityoCrime(event.target.value);
    }
  }}
  
  options={cities}
  getOptionLabel={(option) => option.city}
  renderInput={(params) => <TextField {...params}
  inputRef={crimePlace}
  
  InputLabelProps={{className:classes.textfieldlabel}}
  className={classes.inputRoot} label="Search for cities"variant="filled" />}


/>
{/* </Form> */}

            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            /> */}
            
          </div>
          <SearchIcon />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={toggleNoti}>
              <Badge badgeContent={notiLength} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
           
          
            
          </div>
          
        </Toolbar>
      </AppBar>
      
      {isOpen &&<Popup content={
              <>
               
          <Alert id="gfg"style={{width:'100%',display:'none'}} severity="warning" autoHideDuration={3000} variant="standard">Crime is deleted by admin!</Alert>
              <table className="popuptable">

                <thead>
                  
                  <th style={{fontSize:'14px'}}colSpan='2'>
                  
                  </th>
               
                </thead>

                <tbody>
              
                {notiArray.length>0?
              notiArray.map((obj,i)=>
              {
                return(
                  <tr key={i} onClick={()=>obj.status==="denied"?rowRemove(obj):rowClick(obj,obj.date,obj.city,obj.userId)}>
                    
                    <td style={{fontSize:'10px',width:'28px',borderRight:'0.5px dashed'}}>{obj.date}</td>
                    <td style={{fontSize:'15px',borderRight:'0.5px dashed'}}>{obj.description.substring(0,100)}</td>
                    {console.log(obj.status)}
                    {obj.status==="Crime verified"||obj.status==='New crime reported at your city'?<td style={{fontSize:'10px' ,color:'green'}}>{obj.status}</td>:<td style={{fontSize:'10px' ,color:'red'}}>Not such crime committed</td>}
                  </tr>
                  
                  
                )
              }):<tr><td colSpan='2'><Alert severity="info" style={{justifyContent:'center',alignItems:'center'}}>No Notification</Alert></td></tr>
              }
             
             
  </tbody>
  </table>
              </>
            }handleClose={toggleNoti} />}
    </div>
  );
};

export default withStyles(styles)(ToolbarComponent);
