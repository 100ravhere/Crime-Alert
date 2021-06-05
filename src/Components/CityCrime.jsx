import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import app from "../firebase"
import {useAuth} from "../Contexts/AuthContext";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import Alert from '@material-ui/lab/Alert';
import BarChart from "./BarChart";
export default function CityCrime() {
    const history = useHistory();
    const {setDateDesc,setLoc,Loc,cityCrime} = useAuth();
     const [crimeList,setCrimeList] = useState([]);
     const[Murder,setM] = useState(0);
     const[Burglary,setB] = useState(0);
     const[Sexual,setS] = useState(0);
     const[Cyber,setC] = useState(0);
     const[Domestic,setD] = useState(0);
     const[Fraud,setF] = useState(0);
     const[Rape,setR] = useState(0);
     const[Terrorism,setT] = useState(0);
     
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
         let countM=0,countB=0,countS=0,countC=0,countD=0,countF=0,countR=0,countT=0;
      crimeArrList.forEach((data)=>
      {
       
        if(data.type==="Murder or manslaughter")
        {
          countM+=1;
        }
        else if(data.type==="Burglary")
        {
          countB+=1;
        }
        else if(data.type==="Sexual harassment")
        {
          countS+=1;
        }

        else if(data.type==="Cyber Crime")
        {
          countC+=1;
        }
        else if(data.type==="Domestic abuse")
        {
          countD+=1;
        }
        else if(data.type==="Fraud")
        {
          countF+=1;
        }
        else if(data.type==="Rape and sexual assault")
        {
          countR+=1;
        }
        else if(data.type==="Terrorism")
        {
          countT+=1;
        }
      })
      setM(countM);
      setB(countB);
      setS(countS);
      setC(countC);
      setD(countD);
      setF(countF);
      setR(countR);
      setT(countT);
      
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
             <ToolbarComponent onUpdate={async function(city){
               setCC(city);
               await setLoc(city);
             }} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
      <BarChart murder={Murder}
      
            domestic={Domestic} burglary={Burglary}
            sexual={Sexual}
            cyber={Cyber}
            fraud={Fraud}
            rape={Rape}
            terrorism={Terrorism}
            />   
            <hr/>
            {crimeList.length!==0?
         <div><h1>Crimes committed in {Loc}</h1>
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
                 </div>
                 :<Alert severity="warning" style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto',marginTop:'2em'}}>0 Crime found</Alert>}
                <footer onClick={()=> history.goBack()}>
    <div className="texto">
        <span><h5>BACK</h5></span>
    </div>
</footer>
   
        </div>
    )
}
