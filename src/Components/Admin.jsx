import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom";
import app from "../firebase"
import {useAuth} from "../Contexts/AuthContext"
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";

export default function Admin() {
    const [crimeList,setCrimeList] = useState([]);
    const {setDateDesc} = useAuth();
    const history = useHistory();
    useEffect(() => {
        getData();
    },[]);
    
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(false);
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };
    function rowClick(opo)
    {
        setDateDesc(opo);
        console.log(opo);
        history.push("/admin-crime-details");

    }
    function getData()
    {
      app.firestore().collection("unverifiedcrimes").onSnapshot((querySnap)=>
      {
        let crimeArrList=[];
        querySnap.forEach(snap=>
          {
            crimeArrList.push(snap.data())
          })
          setCrimeList(crimeArrList);
      })
     
    }
    return (
        <div>
   <ToolbarComponent openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
  
            <h1>Requests:</h1>
         
            <table className="container2">
              <thead>
              <tr>
                  <th><h1>Crime City</h1></th>
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
                     <td>{data.city}</td>
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
