import React, { Component } from 'react';
import '../css/Search.css';
import InputTextField from './InputTextField';
import Update from './Update';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class Search extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.handleSubmit.bind(this);

    this.enterShoeName = this.enterShoeName.bind(this);
    this.enterShoeModel = this.enterShoeModel.bind(this);
    this.enterShoeCode = this.enterShoeCode.bind(this);
    this.enterShoeColor = this.enterShoeColor.bind(this);
    this.enterShoeSize = this.enterShoeSize.bind(this);

    this.state = {
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
      shoe_size: '',
      response: '',
      responseToPost: '',
      validation:0,
      array:[],
      array_code:[],
      counter:0,
      data: 'Data from parent'
    }
    
  }

  

  enterShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  enterShoeModel(e) {
    this.setState({
      shoe_model: e.target.value
    });
  }
  
  enterShoeCode(e) {
    this.setState({
      shoe_code: e.target.value
    });
  }

  enterShoeColor(e) {
    this.setState({
      shoe_color: e.target.value
    });
  }
  
  enterShoeSize(e) {
    this.setState({
      shoe_size: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const body = await response.json();
    var joined ;
    var code ;
    
    

    body.map(index => {
      if(this.state.shoe_size != '' && this.state.shoe_color != ''){
        if(this.state.shoe_code != ''){
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_code == this.state.shoe_code) &&
               (index.shoe_color == this.state.shoe_color) &&
               (index.shoe_size == this.state.shoe_size) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined,
                array_code : code
              }) 
          }
        } else {
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_color == this.state.shoe_color) &&
               (index.shoe_size == this.state.shoe_size) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined,
                array_code : code
              }) 
          }
        }
      }else if(this.state.shoe_size == '' && this.state.shoe_color != ''){
        if(this.state.shoe_code != ''){
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_code == this.state.shoe_code) &&
               (index.shoe_color == this.state.shoe_color) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined,
                array_code : code
              }) 
          }
        }else {
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_color == this.state.shoe_color) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined,
                array_code : code
              }) 
          }
        }
      }else if(this.state.shoe_size != '' && this.state.shoe_color == ''){
        if(this.state.shoe_code != ''){
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_code == this.state.shoe_code) &&
               (index.shoe_size == this.state.shoe_size) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined ,
                array_code : code
              }) 
          }
        }else{
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_size == this.state.shoe_size) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
               validation : 1,
               array: joined ,
               array_code : code
             }) 
          }
        }
      }else{
        if(this.state.shoe_code != ''){
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_code == this.state.shoe_code) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined ,
                array_code : code
              }) 
          }
        }else{
          if ( (index.shoe_name == this.state.shoe_name) &&
               (index.shoe_model == this.state.shoe_model) ){

              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined ,
                array_code : code
              }) 
          }
        }
      }
    })
     
     if(this.state.validation == 0){
      alert("not found!!");
    }
  };

  onTrigger = (event) => {
    this.props.parentCallback("Data from child");
    event.preventDefault();
}
  
  render() {

  /*  if (this.state.validation == 1) {
      alert(this.state.array_code)
    }*/

    return (
      <div>
        <ul id="navbar">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">جستجو</a></li>
        </ul>
                
        <div id="wrap1">
        {this.state.array.map((item, index) => (
            
            <div id="section1-SubmitInformation">
              <div id = "section1" >
                <div id = "border" >
               <Link to={ `/shoe${this.state.array_code[index]}` }>
                {/*<Update dataParentToChild = {this.state.array_code[index]}/>*/}
                  {/*<a href = { `/shoe${this.state.array_code[index]}` }  >*/} 
                    <img id="image" src={item}/>
                 {/* </a>*/}
                  </Link>
                </div>
              </div>
            </div>
        ))
           
        }
        </div>

        {/*
          
          this.state.array_code.map((item, index) => ( 

            <Router>
           return (  <Route path = { `/shoe4` } component = { Update } />)
            </Router>
          ))
          
        */}
        <div id="wrap2">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <p  ><b>: نام کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
                required = "true"
                placeholder = "نام کفش"
                val = {this.state.shoe_name}
                _handleChange ={this.enterShoeName}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>
        <ul>
            <li>
               <p  ><b>: مدل کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
                required = "true"
                placeholder = "مدل کفش"
                val = {this.state.shoe_model}
                _handleChange ={this.enterShoeModel}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>
        <ul>
            <li>
               <p  ><b>: کد کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
                //required = "true"
                placeholder = "کد کفش"
                val = {this.state.shoe_code}
                _handleChange ={this.enterShoeCode}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>
        <ul>
            <li>
               <p  ><b>: رنگ کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
               // required = "true"
                placeholder = "رنگ کفش"
                val = {this.state.shoe_color}
                _handleChange ={this.enterShoeColor}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>
        <ul>
            <li>
               <p  ><b>: سایز کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
               // required = "true"
                placeholder = "سایز کفش"
                val = {this.state.shoe_size}
                _handleChange ={this.enterShoeSize}
              />
            </li>
              </ul>
              <div class="line">
              <hr/>
            </div>
              <div id = "sectionSubmit-search" >
              <button  type="submit" class = "button-search"> ثبت </button> 
            </div>

              </form>
        </div>
      
     
      </div>
      );
  }
}
