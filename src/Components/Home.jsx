
import React,{useState,useEffect}from 'react'
import {Link} from "react-router-dom"
import {Card,Button} from "react-bootstrap";
import {useAuth} from "../Contexts/AuthContext"
import {useHistory} from "react-router-dom"
import app from "../firebase";
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import dateformat from "dateformat";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
      color:'white',
    flexGrow: 1,
  },
  menuButton: {
    color:'white',
    marginRight: theme.spacing(2),
  },
  title: {
    color:'white',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    color:'white',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    color:'white',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Home() {
    const [error,setError] = useState("");
    const [loc,setloc]=useState("");
    const[firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const {currentUser,logout} = useAuth()
    const history = useHistory()
    const classes = useStyles();
    const [crimeList,setCrimeList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  useEffect(()=>{
    app.database()
    .ref(`users/${currentUser.uid}`).on('value',(snapshot)=>{
     setloc(snapshot.val().location);
     getData(snapshot.val().location);
     setFirstName(snapshot.val().firstname);
     setLastName(snapshot.val().lastname);
    })
    return ()=>
    {
      setloc(null)
      setFirstName(null)
      setLastName(null)
    }
},[]);
  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={firstName}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="secondary">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton aria-label="show 11 new notifications" color="inherit">
  //         <Badge badgeContent={11} color="secondary">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );
  
  function getData(oc)
  {
    app.database().ref(`crimes/${oc}`).on('value',function(snapshot)
    {
      let crimeArrList=[];
      snapshot.forEach(
       snap=>{
        crimeArrList.push(snap.val());
       })
       setCrimeList(crimeArrList);

         })
  }
    async function handleLogout()
    {
        setError("")
        try{
            await logout()
            history.push("/")
        }
        catch{
            setError("Failed to log out")
        }
    }

    return (
        <div>
         <div className={classes.grow}>
      <AppBar position="static" style={{backgroundImage: 'linear-gradient(315deg, #36096d 0%, #0D67B1 74%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography id="headnav" className={classes.title} variant="h6" noWrap>
           Crime Alert
          </Typography>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={currentUser}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </div>
         <Card id="homeCard" style={{marginTop:'5px',padding:'10px'}}>
                <Card.Body>
                    {error&&<h2>{error}</h2>}
                    <strong className="buttonHome">Hey, {firstName} {lastName}<br/> I hope you are doing good.</strong>
                    <br/>
                    {/* <strong className="buttonHome">Location: {loc}</strong> */}
                    </Card.Body>
                    </Card>
                   <Link to="/add-crime"><Button variant="success" id="AddCrime">Add Crime</Button></Link>
                    <Button variant="warning" style={{width:'90px' ,marginLeft:'auto'}} onClick={handleLogout}>Log Out</Button>
                    <hr/>
                    <strong className="buttonHome">Crimes in {loc}</strong>
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
                    
                    <tr key={i}>
                      <Link to="crime-description">
                      <td>{dateformat(data.date,"dd-mmm-yyyy hh:mm:ss.s")}</td>
                      <td>{data.description}</td>
                      <td>{data.location}</td>
                      </Link>
                    </tr>
                    
                  )
                 })}
                 </tbody>
                 
                 </table>
                   
                    
      </div>  
       
        )
}


