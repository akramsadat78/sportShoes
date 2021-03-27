import React, {useState,useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../css/FirstPage.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    alignItems: 'center',
    backgroundColor: 'rgb(11, 99, 99)',
    cursor: "default",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function PermanentDrawerRight() {
  const classes = useStyles();
  const [array_images, update_array_images] = useState([]);
  const [array_codes, update_array_codes] = useState([]);

  useEffect(() => {
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
           update_array_images( arr => [...arr, index.shoe_image]);
           update_array_codes( arr => [...arr, index.shoe_code]);
      })
   })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
           کفش ورزشی
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div id="wrap_first_page">
        
          {array_images.map((item, index) => (
          
                <div id = "border_first" >
                  <Link to={ `/shoe${array_codes[index]}` }>
                    <img id="image" src={item}/>
                  </Link>
                </div>
          
             )) 
          }
        </div>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
      
        <Divider />
        <List id="firstpagelist"> 

          <ListItem  style={{display:'flex', justifyContent:'center',padding:'10%'}}>  
            <a href = { `/SubmitInformation` } ><b>ثبت اطلاعات</b></a> 
          </ListItem>
          <Divider />

          <ListItem  style={{display:'flex', justifyContent:'center',padding:'10%'}}>
            <a  href = { `/Search` } ><b>جستجو</b></a> 
          </ListItem>
          <Divider />

          <ListItem  style={{display:'flex', justifyContent:'center',padding:'10%'}}>  
            <a href = { `/ProfitCalculation` } ><b>محاسبه درامد</b></a> 
          </ListItem>
          <Divider />

        </List>
      </Drawer>
    </div>
  );
}

function FirstPage () {
  return <PermanentDrawerRight />;
 }

 export default FirstPage;