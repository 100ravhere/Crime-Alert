import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import app from "../firebase";
import {useAuth} from "../Contexts/AuthContext";
import dateformat from "dateformat";
import ToolbarComponent from "./Toolbar/Toolbar";
import DrawerComponent from "./Drawer/Drawer";
import {Divider} from "@material-ui/core";
import "../style/stylecard.scss";
export default function CrimeDesc() {
    const {Loc,dateDesc} = useAuth();
    const history = useHistory();
const [imgUrl,setImageUrl] = useState();
const [description,setDescription] = useState("");
const [Location,setLocation] = useState("");
const [dateCrime,setDateOfCrime] = useState("");
const [uploadedBy,setUploadedBy] = useState("");
const [uploadDate,setUploadDate] = useState("");
const [ city,setCity] = useState("");
const [isDrawerOpen, setDrawerOpen] = useState(false);
const toggleDrawer = () => {
  setDrawerOpen(false);
};
const openDrawer = () => {
  setDrawerOpen(true);
};

useEffect(()=>
{
    
app.firestore().collection(Loc).doc(dateDesc).onSnapshot((querySnap)=>
{
    if(querySnap.data()!=null)
    {
        
    setImageUrl(querySnap.data().file);
    setDescription(querySnap.data().description);
    setLocation(querySnap.data().location);
    setDateOfCrime(querySnap.data().date);
    setUploadedBy(querySnap.data().uploadedBy);
    setUploadDate(querySnap.data().dateOfUpload);
    setCity(querySnap.data().city);
    }
})

},[Loc,dateDesc])
    return (
        <div >
             <ToolbarComponent openDrawerHandler={openDrawer} />
      <DrawerComponent open={isDrawerOpen} toggleDrawerHandler={toggleDrawer} />

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
