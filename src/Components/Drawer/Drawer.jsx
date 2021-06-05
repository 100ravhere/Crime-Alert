import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link,useHistory} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer
} from "@material-ui/core";
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import LocationCitySharpIcon from '@material-ui/icons/LocationCitySharp';
import AddLocationSharpIcon from '@material-ui/icons/AddLocationSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import HomeWorkSharpIcon from '@material-ui/icons/HomeWorkSharp';
import SearchIcon from '@material-ui/icons/Search';
const styles = (theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const DrawerComponent = (props) => {
  const { classes } = props;
  const {logout,currentUser} = useAuth();
  const history = useHistory();
  async function handleClick()
  {
    await logout()
    history.push("/");
  }
  const sideList = () => (
  
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawerHandler}
      onKeyDown={props.toggleDrawerHandler}
    >
      
      
      <List>
        {currentUser.email==="adminlogin@gmail.com" && <Link style={{textDecoration:'none',color:'black'}} to="/admin-check"><ListItem button ><ListItemIcon> <HomeWorkSharpIcon/></ListItemIcon><ListItemText primary="Admin Home"/></ListItem></Link> }
      <Link style={{textDecoration:'none',color:'black'}} to="/home"><ListItem button ><ListItemIcon><HomeSharpIcon/></ListItemIcon><ListItemText primary="Home"/></ListItem></Link>
      <Link style={{textDecoration:'none',color:'black'}} to="/add-crime"><ListItem button ><ListItemIcon><AddAlertIcon /></ListItemIcon><ListItemText primary="Add Crime"/></ListItem></Link>
      <Link style={{textDecoration:'none',color:'black'}} to="/all-crimes"><ListItem button ><ListItemIcon><LocationCitySharpIcon/></ListItemIcon><ListItemText primary="All Crimes"/></ListItem></Link>
         <Link style={{textDecoration:'none',color:'black'}} to="/Added-crimes"><ListItem button ><ListItemIcon><AddLocationSharpIcon/></ListItemIcon><ListItemText primary="Added Crime"/></ListItem></Link>
         <Link style={{textDecoration:'none',color:'black'}} to="/Type"><ListItem button ><ListItemIcon><SearchIcon/></ListItemIcon><ListItemText primary="Crime Search"/></ListItem></Link>
      
      </List>
      <Divider />
      <List>
      <ListItem button onClick={handleClick} ><ListItemIcon><ExitToAppSharpIcon/></ListItemIcon><ListItemText primary="Log out"/></ListItem>
     
      </List>
    </div>
  );

  return (
    <Drawer open={props.open} onClose={props.toggleDrawerHandler}>
      {sideList()}
    </Drawer>
  );
};

export default withStyles(styles)(DrawerComponent);
