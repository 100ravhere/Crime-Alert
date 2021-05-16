import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import app from "../firebase"
import {useAuth} from "../Contexts/AuthContext";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
export default function AllCrime() {
    const history = useHistory();
    const {setDateDesc,setLoc} = useAuth();
     const [crimeList,setCrimeList] = useState([]);
     const [err,setErr]=useState(false);

     useEffect(() => {
         getData()
         
     }, [err])
    
const [isDrawerOpen, setDrawerOpen] = useState(false);
const toggleDrawer = () => {
  setDrawerOpen(false);
};
const openDrawer = () => {
  setDrawerOpen(true);
};

  function getData()
  {
    app.firestore().collection("allCrimes").onSnapshot((snap)=>
    {
      let crimeArrList = [];
      snap.forEach(objsnap=>{
        crimeArrList.push(objsnap.data())
      })
      setCrimeList(crimeArrList)
      setErr(true)
    })
  
  }
  function rowClick(daterow,cityrow)
  {
    setDateDesc(daterow);
    setLoc(cityrow);
    history.push('/crime-desc');
  }
    return (
        <div>
             <ToolbarComponent onUpdate={(city)=>{}} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
            <h1>All crimes</h1>
            <table className="container2">
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
                    
                    <tr key={i} onClick={()=>rowClick(data.date,data.city)}>
                    <td>{data.date}</td>
                    <td>{data.description.substring(0,30)}</td>
                  <td>{data.city}</td>
                  
                  </tr>
                  )
                  
                 })}
                 </tbody>
                 
                 </table>
        </div>
    )
}
