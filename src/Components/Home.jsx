
import React,{useState,useEffect}from 'react'
import {Card} from "react-bootstrap";
import {useAuth} from "../Contexts/AuthContext"
import {useHistory} from "react-router-dom"
import app from "../firebase";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import Alert from '@material-ui/lab/Alert';
import BarChart from "./BarChart";
export default function Home() {
   
    const {currentUser,setfName,fname,setlName,lname,setLoc,setDateDesc,Loc,setNotiLength} = useAuth()
    const history = useHistory()
  const [crimeList,setCrimeList] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const[Murder,setM] = useState(0);
  const[Burglary,setB] = useState(0);
  const[Sexual,setS] = useState(0);
  const[Cyber,setC] = useState(0);
  const[Domestic,setD] = useState(0);
  const[Fraud,setF] = useState(0);
  const[Rape,setR] = useState(0);
  const[Terrorism,setT] = useState(0);
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
  
    return (
        <div>
        <ToolbarComponent onUpdate={(city)=>{
               getData(city);
                setLoc(city);
             }} openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />
  
         <Card id="homeCard" style={{marginTop:'5px',padding:'10px'}}>
                <Card.Body>
                    
                    <strong className="buttonHome">Hey, {fname}{' '}{lname}<br/> I hope you are doing good.</strong>
                    <br/>
                    <BarChart murder={Murder}
                    domestic={Domestic} burglary={Burglary}
                    sexual={Sexual}
                    cyber={Cyber}
                    fraud={Fraud}
                    rape={Rape}
                    terrorism={Terrorism}
                    />   
                    </Card.Body>
                    </Card>
                  
                    <p style={{marginLeft:'10px'}}className="buttonHome">Crimes committed in {Loc}</p>
                    <hr/>
                    {crimeList.length!==0?
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
                 
                 </table>:<Alert severity="warning" style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto',marginTop:'2em'}}>0 Crime found</Alert>
}
       
      </div>  
       
        )
}


