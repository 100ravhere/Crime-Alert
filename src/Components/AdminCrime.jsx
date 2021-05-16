import React,{useState,useEffect} from 'react';
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import app from "../firebase"
import firebase from "firebase/app"
import {useAuth} from "../Contexts/AuthContext";
import {Card,Button} from "react-bootstrap"
import dateformat from "dateformat";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
export default function AdminCrime() {
const {dateDesc} = useAuth();
const [imgUrl,setImageUrl] = useState("");
const [city,setCity] = useState("");
const [description,setDescription] = useState("");
const [Location,setLocation] = useState("");
const [dateCrime,setDateOfCrime] = useState("");
const [uploadedBy,setUploadedBy] = useState("");
const [uploadDate,setUploadDate] = useState("");
const [loading] = useState(false);
const [error,setError] = useState("");
const [uid,setUid] = useState("");

useEffect(()=>
{

  app.firestore().collection("unverifiedcrimes").doc(dateDesc).onSnapshot((snap)=>
  {
    console.log(snap.data())
    if(snap.data()!=null)
  {
    setCity(snap.data().city);
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
        location:Location,
        description:description,
        date:dateCrime,
        file:imgUrl?imgUrl:null,
        uploadedBy:uploadedBy,
        dateOfUpload:uploadDate
  })
  app.firestore().collection("allCrimes").doc(dateDesc).set({
    city:city,
        location:Location,
        description:description,
        date:dateCrime,
        file:imgUrl?imgUrl:null,
        uploadedBy:uploadedBy,
        dateOfUpload:uploadDate
  })

  console.log("done")
  console.log(uid);
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
           console.log(snap.data())
           if(snap.data().location===city)
           {
             console.log(city)
             console.log(snap.data().location)
             console.log(snap.data().uid)
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
            <Card style={{background: '#eee',display:'inline'}}>
            <h1>Crime Details</h1>
            <img src={imgUrl} alt="Unavailable"  style={{marginTop:'20px',width:'35%' ,height:'70vh',border:'1px solid'}}/>
            <Card style={{float:'right' ,width:'55%', marginTop:'20px'}}>
            <p className="crimedesc">DATE:</p>{dateCrime}
            <p></p>
           
        <p className="crimedesc">LOCATION:</p>{Location}
            <p className="crimedesc">DETAILS:</p>{description}
            <p className="crimedesc">UPLOADED BY:</p>{uploadedBy}
            &nbsp; on {dateformat(uploadDate,"dd-mmm-yyyy hh:mm:ss.s")}
            <br />
            <Button disabled={loading} onClick={()=>verify()}variant="success" style={{width:'100px'}}>Verify</Button>
            <Button variant="danger" onClick={()=>reject()} style={{width:'100px',position:'absolute',right:'10%',bottom:'0'}}>Decline</Button>
            </Card>
            
            <Card style={{display:'inline-block',padding:'5%' ,width:'500px'}}>
            
           </Card>
            </Card>
            <Link to="/admin-check"><footer>
    <div className="texto">
        <span><h5>BACK</h5></span>
    </div>
</footer>
   </Link>
              </div>
              
    )
}
