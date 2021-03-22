import React ,{useState} from 'react';

import LoginComponent from './component/LoginComponent';
import FirstPage from './component/FirstPage';
import SubmitInformation from './component/SubmitInformation';
import Search from './component/Search';
import ProfitCalculation from './component/ProfitCalculation';
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
    <Route path = { `/SubmitInformation` } component = {SubmitInformation}/>
    <Route path = { `/Search` } component = {Search}/>
    <Route path = { `/ProfitCalculation` } component = {ProfitCalculation}/>
    
  </Router>
 );
}

export default App;
