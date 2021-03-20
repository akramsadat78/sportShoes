import React ,{useState} from 'react';

import LoginComponent from './component/LoginComponent';
//import GetInformation from './component/GetInfomation';
//import SignUpComponent from './component/SignUpComponent'
import FirstPage from './component/FirstPage';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App () {

 return ( 
  
  <Router>
             
    <Route exact path = { `/` } component = {LoginComponent}/>
    <Route path = { `/first` } component = {FirstPage}/>

  </Router>
 );
}

export default App;
