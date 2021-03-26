import React ,{Component} from 'react';

import LoginComponent from './component/LoginComponent';
import FirstPage from './component/FirstPage';
import SubmitInformation from './component/SubmitInformation';
import Search from './component/Search';
import ProfitCalculation from './component/ProfitCalculation';
import Update from './component/Update';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
//function App () {
  constructor(props){
    super(props);
    this.state = {
        array_code: Array.from(Array(1000).keys())
    }
}

  render() {
 return ( 
  <Router>
    <Route exact path = { `/` } component = {LoginComponent}/>
    <Route path = { `/first` } component = {FirstPage}/>
    <Route path = { `/SubmitInformation` } component = {SubmitInformation}/>
    <Route path = { `/Search` } component = {Search}/>
    <Route path = { `/ProfitCalculation` } component = {ProfitCalculation}/>
    

     {this.state.array_code.map((item, index) => ( 
        <Route path = { `/shoe${item}` }
              component = {() => < Update dataParentToChild = { item }/>}
        />
       ))
    }
   
    {/*<Route path = { `/shoe4` } 
                        component =  {() =>  <Update message="hello"/> }
 />
    <Route path = { `/shoe4` } 
                        component =  {() =>  <Update parentCallback = {this.handleCallback}/> }
                  />
                  {this.state.data}
     {/* this.props.message.map((item, index) => ( 
        <Router>
          <Route path = { `/shoe4` } component = { Update } />
        </Router>
      )) 
     */}
    
    
  </Router>

 );
  }
}

//export default App;
