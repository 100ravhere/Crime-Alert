import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import app from "../firebase"
import {useAuth} from "../Contexts/AuthContext";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
export default function CityCrime() {
    const history = useHistory();
    const {setDateDesc,setLoc,cityCrime} = useAuth();
     const [crimeList,setCrimeList] = useState([]);

      const [ cc, setCC ]=useState(cityCrime)

     useEffect(() => {
      function getData(city)
      {
      let strObj = window.location.href;
      let CityCrime = "";
      CityCrime = strObj.split("/")[4]
      app.firestore().collection(city?city:CityCrime!==""?CityCrime:cc).onSnapshot((querySnap)=>
      {
        let crimeArrList=[];
        querySnap.forEach(
         snap=>{
            crimeArrList.push(snap.data());
         })
         console.log(crimeArrList.length)
        
         setCrimeList(crimeArrList);
      
      })
    
      }
         getData()
         
     },[cc])
    
const [isDrawerOpen, setDrawerOpen] = useState(false);
const toggleDrawer = () => {
  setDrawerOpen(false);
};
const openDrawer = () => {
  setDrawerOpen(true);
};

  
  function rowClick(daterow,cityrow)
  {
    setDateDesc(daterow);
    setLoc(cityrow);
    history.push('/crime-desc');
  }
    return (
        <div>
             <ToolbarComponent onUpdate={(city)=>{
               setCC(city);
             }} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
           
            {crimeList.length!==0?
           
            <table style={{marginTop:'20px'}}className="container2">
              <thead>
              <tr>
                  <th><h1>Date-Time</h1></th>
                  <th><h1>Crime Details</h1></th>
                  <th><h1>City</h1></th>
               </tr>
               </thead>
                 <tbody>

     
               {crimeList.map((data,i)=>
                 {
                    
                  return(
                    
                    <tr key={crimeList.length+i} onClick={()=>rowClick(data.date,data.city)}>
                      <td>{data.date}</td>
                      <td>{data.description.substring(0,30)}</td>
                      <td>{data.city}</td>
                  </tr>
                  )
                  
                 })
                
                }
                
                 </tbody>
                 
                 </table>
                 :
                  <h1>No Data Found</h1>}
                   
        </div>
    )
}
