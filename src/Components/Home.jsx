
import React,{useState,useEffect}from 'react'
import {Card} from "react-bootstrap";
import {useAuth} from "../Contexts/AuthContext"
import {useHistory} from "react-router-dom"
import app from "../firebase";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";


export default function Home() {
   
    const {currentUser,setfName,fname,setlName,lname,setLoc,setDateDesc,Loc,setNotiLength} = useAuth()
    const history = useHistory()
  const [crimeList,setCrimeList] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  useEffect(()=>{

    app.firestore().collection("users").doc(currentUser.uid).onSnapshot((snap)=>
    {
      setLoc(snap.data().location);
     getData(snap.data().location);
     setfName(snap.data().firstname);
      setlName(snap.data().lastname);
      snap.data().notifications && setNotiLength(snap.data().notifications.length)
    })
    
    
  
    
},[currentUser.uid,setLoc,setfName,setlName,setNotiLength]);
const toggleDrawer = () => {
  setDrawerOpen(false);
};
const openDrawer = () => {
  setDrawerOpen(true);
};

function rowClick(datee)
{
  setDateDesc(datee)
  history.push('/crime-desc');
}
  
  function getData(oc)
  {
    app.firestore().collection(oc).onSnapshot((querySnap)=>
    {
      let crimeArrList=[];
      querySnap.forEach((snap)=>
      {
        crimeArrList.push(snap.data());
      })
      crimeArrList.reverse();
      setCrimeList(crimeArrList);
      
    })

    
  }
  
    return (
        <div>
        <ToolbarComponent onUpdate={(city)=>{
               getData(city);

             }} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
  
         <Card id="homeCard" style={{marginTop:'5px',padding:'10px'}}>
                <Card.Body>
                    
                    <strong className="buttonHome">Hey, {fname}{' '}{lname}<br/> I hope you are doing good.</strong>
                    <br/>
                    
                    </Card.Body>
                    </Card>
                  
                    <strong style={{padding:'22px'}}className="buttonHome">Crimes committed in {Loc}</strong>
                    <hr/>
            <table className="container2">
              <thead>
              <tr>
                  <th><h1>Date-Time</h1></th>
                  <th><h1>Crime Details</h1></th>
                  <th><h1>Location of Crime</h1></th>
               </tr>
               </thead>
                 <tbody>
                 {crimeList.map((data,i)=>
                 {
                  return(
                    
                    <tr key={i} onClick={() =>rowClick(data.date)}>
                     
                      <td>{data.date}</td>
                      <td>{data.description.substring(0,30)}</td>
                      <td>{data.location.substring(0,30)}</td>
                     
                    </tr>
                    
                  )
                 })}
                 </tbody>
                 
                 </table>
                   
                    
      </div>  
       
        )
}


