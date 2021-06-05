import React,{useState,useEffect} from 'react';
import {Alert} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import app from "../firebase"
import firebase from "firebase/app"
import {useAuth} from "../Contexts/AuthContext";
import {Divider} from "@material-ui/core";
import {Button} from "react-bootstrap"
import dateformat from "dateformat";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
export default function AdminCrime() {
const {dateDesc} = useAuth();
const [imgUrl,setImageUrl] = useState("");
const [city,setCity] = useState("");
const [ type,setType] = useState("");
const [description,setDescription] = useState("");
const [Location,setLocation] = useState("");
const [dateCrime,setDateOfCrime] = useState("");
const [uploadedBy,setUploadedBy] = useState("");
const [uploadDate,setUploadDate] = useState("");
const [loading] = useState(false);
const [error,setError] = useState("");
const [uid,setUid] = useState("");
const history = useHistory();
useEffect(()=>
{

  app.firestore().collection("unverifiedcrimes").doc(dateDesc).onSnapshot((snap)=>
  {
   
    if(snap.data()!=null)
  {
    setCity(snap.data().city);
    setType(snap.data().type);
    setImageUrl(snap.data().file);
    setDescription(snap.data().description);
    setLocation(snap.data().location);
    setDateOfCrime(snap.data().date);
    setUploadedBy(snap.data().uploadedBy);
    setUploadDate(snap.data().dateOfUpload);
    setUid(snap.data().userUid);
  }})

},[dateDesc])
function verify()
{
  app.firestore().collection("unverifiedcrimes").doc(dateDesc).delete()
  .catch((err)=>{
    console.error(err);
  })
  let ref2 = app.firestore().collection(city).doc(dateDesc);
  ref2.set({
    city:city,
    type:type,
        location:Location,
        description:description,
        date:dateCrime,
        file:imgUrl?imgUrl:null,
        uploadedBy:uploadedBy,
        dateOfUpload:uploadDate
  })
  app.firestore().collection("allCrimes").doc(dateDesc).set({
    city:city,
    type:type,
        location:Location,
        description:description,
        date:dateCrime,
        file:imgUrl?imgUrl:null,
        uploadedBy:uploadedBy,
        dateOfUpload:uploadDate
  })

  
       let userRef = app.firestore().collection("users").doc(uid);
       userRef.update({
         notifications:firebase.firestore.FieldValue.arrayUnion({
           date:dateCrime,
           description:description,
           city:city,
           userId:uid,
          status:'Crime verified'})
       })
       app.firestore().collection("users").onSnapshot((querySnap)=>
       {
        
         querySnap.forEach((snap)=>
         {
          
           if(snap.data().location===city)
           {
            let userRef = app.firestore().collection("users").doc(snap.data().uid);
            userRef.update({
              notifications:firebase.firestore.FieldValue.arrayUnion({
                date:dateCrime,
                description:description,
                city:city,
                userId:uid,
               status:'New crime reported at your city'})
            })
           }
         })
       })
       
       userRef.update({
         addedCrimes:firebase.firestore.FieldValue.arrayUnion({
           date:dateCrime,
           description:description,
           city:city,
           userId:uid,
          status:'Crime verified'})
       })


  setError("Crime has been added to our crime database")
}

const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(false);
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };
function reject()
{
  let userRef = app.firestore().collection("users").doc(uid);
       userRef.update({
         addedCrimes:firebase.firestore.FieldValue.arrayUnion({
           date:dateCrime,
           description:description,
           city:city,
           userId:uid,
          status:'Not such crime committed'})
       })
  app.firestore().collection("unverifiedcrimes").doc(dateDesc).delete()
  .catch((err)=>{
    console.error(err);
  })
  let userRef2 = app.firestore().collection("users").doc(uid);
  userRef2.update({
    notifications:firebase.firestore.FieldValue.arrayUnion({
      date:dateCrime,
      description:description,
      city:city,
      userId:uid,
     status:'denied'})
  })
    setError("Crime has been removed");
}

    return (
        <div >
               <ToolbarComponent openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
      
          {error&&<Alert variant="success">{error}</Alert>}
           
<div className="container3">

<img id="imgDesc"style={{color:'black',marginTop:'1em',borderColor:'white',width: '500px',
height: 'auto',borderStyle:'solid',borderWidth:'2px'}}src={imgUrl} alt="Unavailable" />
         
  <div className="post">
      <div className="header_post">
      
      <Divider/>
      <h4 style={{color:'black',display:'inline'}}>Date:&nbsp;</h4><h4 style={{color:'black',display:'inline'}}>{dateCrime}</h4>
      <br/> <h4 style={{color:'black',display:'inline-block'}}>City: &nbsp;</h4><h4 style={{color:'black',display:'inline'}}>{city}</h4>
     <br/> <h4 style={{color:'black',display:'inline-block'}}>Location: &nbsp;</h4><h4 style={{color:'black',display:'inline'}}>{Location}</h4>
          </div>

      <div className="body_post">
          <div className="post_content">
         
              <h5>Type of crime: {type}</h5>
              
              <h1>Details</h1>
              <p>{description}</p>

              <div className="container_infos">
                  <div className="postedBy">
                      <span>Uploaded by</span>
                      {uploadedBy}
                  </div>

                  <div className="container_tags">
                      <span>On</span>
                      {dateformat(uploadDate,"dd-mmm-yyyy hh:mm:ss.s")}

                  </div>
                  <Button disabled={loading} onClick={()=>verify()}variant="success" style={{width:'100px'}}>Verify</Button>
            <Button variant="danger" onClick={()=>reject()} style={{width:'100px',right:'10%',bottom:'0'}}>Decline</Button>
              
              </div>
          </div>
      </div>
  </div>
</div>


<footer onClick={()=> history.goBack()}>
    <div className="texto">
        <span><h5>BACK</h5></span>
    </div>
</footer>
 </div>     
    )
}
