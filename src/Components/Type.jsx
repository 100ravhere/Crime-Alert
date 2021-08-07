import React,{useState,useRef} from 'react'
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Card,Button} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";
import app from "../firebase";
import Alert from '@material-ui/lab/Alert';
const Render = (props)=>{
    return (
<table className="container2">
              <thead>
              <tr>
                  <th><h1>Date-Time</h1></th>
                  <th><h1>Crime Details</h1></th>
                  <th><h1>City</h1></th>
               </tr>
               </thead>
                 <tbody>

                { props.crimeList.map((data,i)=>
                 {
                     
                  return(
                    
                    <tr key={i} onClick={()=>props.rowClick(data.date,data.city)}>
                    <td>{data.date}</td>
                    <td>{data.description.substring(0,30)}</td>
                  <td>{data.city}</td>
                  
                  </tr>
                  )
                  
                 })}
                 </tbody>
                 
                 </table>
    )
}

export default function Type() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const crimeType = useRef();
    const [crimeList,setCrimeList] = useState([]);
    const history = useHistory();
    const {setLoc,setDateDesc} = useAuth();
    const [searchh,setSearch] = useState(false);
    const [crimeT,setCrimeT] = useState("");
    const toggleDrawer = () => {
        setDrawerOpen(false);
      };
      const openDrawer = () => {
        setDrawerOpen(true);
      };
      const types=[{
        type:'Murder or manslaughter'
      },
      {type:'Burglary'},
      {type:'Sexual harassment'},
      {type:'Cyber Crime'},
      {type:'Domestic abuse'},
      {type:'Fraud'},
      {type:'Rape and sexual assault'},
      {type:'Terrorism'
      }]
  
  function rowClick(daterow,cityrow)
  {
    setDateDesc(daterow);
    setLoc(cityrow);
    history.push('/crime-desc');
  }
      async function search()
      {
          console.log(crimeType.current.value);
          let crimeArrList = [];
            let pr =  new Promise((resolve,reject)=>{
                app.firestore().collection("allCrimes").onSnapshot((snap)=>
                {
                    snap.forEach(objsnap=>{
                        if(objsnap.data().type===crimeType.current.value)
                        {
                            crimeArrList.push(objsnap.data());
                        }
                    })
                    resolve()
                })
            }) 
            pr.then(()=>{
                console.log(crimeArrList);
                setCrimeList(crimeArrList)
                // setTimeout(()=>{;},1000) 
                setCrimeT(crimeType.current.value);
                setSearch(true);
            })
                
          
          
      }
    return (
        <div>
               <ToolbarComponent onUpdate={(city)=>{setLoc(city)}} openDrawerHandler={openDrawer} />
                <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />

       
                <Card style={{width:"60%",margin:"0 auto" ,marginTop:"2%"}}>
                <h1>Select the type of crime:</h1>
               <Autocomplete
  id="combo-box-2"
  options={types}

  getOptionLabel={(option) => option.type}
  style={{}}
  renderInput={(params) => <TextField {...params}
  inputRef={crimeType} 
  InputLabelProps={{}}
 label="Select type..."variant="outlined" />}
  required/>
  <hr/>
        
  <Button type="submit" onClick={()=>search()} >Search</Button>
 </Card>
{searchh && crimeList.length!==0 ?
   <div>
     <br/><h5>{crimeT}</h5>
 <Render crimeList={crimeList} rowClick = {rowClick} />
 </div>  :
 <Alert severity="warning" style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto',marginTop:'2em'}}>0 Crime found</Alert>
 }
               
        </div>
    )
}
