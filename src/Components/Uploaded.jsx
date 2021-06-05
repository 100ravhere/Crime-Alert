import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import app from "../firebase"
import {useAuth} from "../Contexts/AuthContext";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import $ from 'jquery'
import Alert from '@material-ui/lab/Alert';
export default function Uploaded() {
    const history = useHistory();
    const {setDateDesc,setLoc,currentUser} = useAuth();
    const [addedArray,setAddedArray] = useState([])
   
     useEffect(() => {
        function getData()
        {
          app.firestore().collection("users").doc(currentUser.uid).onSnapshot((snap)=>
          {
              let obj={};
              let addedArr=[];
              if(snap.data().addedCrimes)
              {
              snap.data().addedCrimes.forEach((e)=>
              {
                obj={
                 city:e.city,
                 date:e.date,
                  description:e.description,
                 status:e.status,
                  userId:e.userId
                }
                addedArr.push(obj);
              })
              setAddedArray(addedArr);
              addedArr=[];
             
             }
          })
        
        }
         getData()
         
     }, [currentUser.uid])
    
const [isDrawerOpen, setDrawerOpen] = useState(false);
const toggleDrawer = () => {
  setDrawerOpen(false);
};
const openDrawer = () => {
  setDrawerOpen(true);
};

  function rowClick2()
  {
    
    $("#gfg").show().delay(1000).fadeOut(500);
  }
  function rowClick(daterow,cityrow)
  {
    setDateDesc(daterow);
    setLoc(cityrow);
    history.push('/crime-desc');
  }
    return (
        <div>
             <ToolbarComponent onUpdate={(city)=>{setLoc(city)}} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
            <h1>Added crimes</h1>
          <Alert style={{display:'none'}} id="gfg" severity="error" variant="standard">
          Crime is rejected by admin!
        </Alert>
        {addedArray.length!==0?
            <table style={{border:'1px solid'}}className="container2">
              <thead>
              <tr>
                  <th><h1>Date-Time</h1></th>
                  <th><h1>Crime Details</h1></th>
                  <th><h1>City</h1></th>
                  <th><h1>Status</h1></th>
               </tr>
               </thead>
                 <tbody>

                 {addedArray.map((data,i)=>
                 {
                     
                  return(
                    
                    <tr key={i} onClick={()=>data.status==="Crime verified"?rowClick(data.date,data.city):rowClick2()}>
                    <td>{data.date}</td>
                    <td>{data.description.substring(0,30)}</td>
                  <td>{data.city}</td>
                  {data.status==="Crime verified"?<td style={{backgroundColor:'whitesmoke',color:'green'}}><VerifiedUserIcon/>Crime Verified </td>:<td style={{backgroundColor:'whitesmoke',color:'red'}}><DeleteForeverIcon/>Crime rejected</td>}
                  </tr>
                  )
                  
                 })}
                 </tbody>
                 
                 </table>
                 :<Alert severity="warning" style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto',marginTop:'2em'}}>0 Crime found</Alert>}
 <footer onClick={()=> history.goBack()}>
    <div className="texto">
        <span><h5>BACK</h5></span>
    </div>
</footer>
        </div>
    )
}
