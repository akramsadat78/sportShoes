import React, { Component } from 'react';
import '../css/Search.css';
import DropdownSelect from './DropdownSelect';
import DropdownSelectName from './DropdownSelectName';
import {Link} from "react-router-dom";
export default class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      shoe_name: '',//shoe_name in DB
      shoe_model: '',//shoe_model in DB
      shoe_code: '',//shoe_code in DB
      shoe_color: '',//shoe_color in DB
      shoe_size: '',//shoe_size in DB
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma'],
      arrayShoeName:[],//keep names of model that is  selected
      arrayShoeColor:[],//keep colors of model and name that are selected
      save_model:'',//model that user is selected
      save_name:'',//name that user is selected
      save_color:'',//color that user is selected
      save_size:'',//size that user is selected 
      array_image:[],//save image of search => model,name,color
      array_code:[],//save code of search => model,name,color
      array_size : [],//save image of search => size
      array_code_size : '',//save code of search => size
      validation:0,//check information (search model,name,color) is selected true or not (and check also  user does not search empty)
      validationsize:0//check information (search size) is selected true or not (and check also  user does not search empty)
     
    }
    
  }

  /* search and submit -> model,name,color */  
  handleModel(event) {
    let value = event.currentTarget.value

    this.setState({
      arrayShoeName: [],
      arrayShoeColor:[],
      save_model:value,
      save_name:'',
      save_color:''
    });

    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

      result.map(index => {
         
          if( index.shoe_model == value){//select model there is in DB(data base)
            var check_duplicate = 0;

            this.state.arrayShoeName.map((item,ind) =>{ // find duplicate name if there is
              if( item == index.shoe_name){
                check_duplicate = 1
              }else if(check_duplicate != 1){
                check_duplicate = 0
              }
            })

            if(check_duplicate == 1){//there is duplicate name for the same model so -> do not add it to arrayShoeName
              this.setState({
                save_model:index.shoe_model
              });
            }else{
              this.setState({//add name to arrayShoeName
                arrayShoeName: [...this.state.arrayShoeName,index.shoe_name],
                save_model:index.shoe_model
              });
            }    
          }
      })
    })
  }

  handleName(event) {
    let value = event.currentTarget.value;

    this.setState({
    arrayShoeColor:[],
    save_name:value,
    save_color:''
  });

  fetch('/information', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(result => {

      result.map(index => {

        //select name and chosen model there are in DB(data base) 
        if( (index.shoe_name == value) && (index.shoe_model == this.state.save_model) ){
          var check_duplicate = 0;

          this.state.arrayShoeColor.map((item,ind) =>{ // find duplicate color if there is
            if( item == index.shoe_color){
              check_duplicate = 1
            }else if(check_duplicate != 1){
              check_duplicate = 0
            }
          })

          if(check_duplicate == 1){//there is duplicate color for the same model and name so -> do not add it to arrayShoeColor
            this.setState({
              save_name:index.shoe_name
            });
          }else{
              this.setState({
                arrayShoeColor: [...this.state.arrayShoeColor,index.shoe_color],
                save_name:index.shoe_name
              });
          }    
        }

      })
    })
  }
  
  handleColor(event) {
    let value = event.currentTarget.value
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            
          //select color and chosen name and chosen model there are in DB(data base) 
          if((index.shoe_model == this.state.save_model) ){
            if( (index.shoe_name == this.state.save_name) ){
              if( (index.shoe_color == value)){
                index.shoe_size.map((value) => {
                  this.setState({
                    save_color:index.shoe_color
                  });
                })
              }
            }
          }
          
        })
    })
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
      
      if(this.state.save_model != ''  && this.state.save_name != '' && this.state.save_color != '' ){ //user selectes model and name and color
        
        if(this.state.save_model == index.shoe_model  && this.state.save_name == index.shoe_name 
            && this.state.save_color == index.shoe_color ){
            
                joined = this.state.array_image.concat(index.shoe_image);
                code = this.state.array_code.concat(index.shoe_code);
  
                this.setState({
                  validation : 1,
                  array_image: joined,
                  array_code : code
                })
            
          }

        }else if(this.state.save_model != ''  && this.state.save_name != ''  ){ //user selectes model and name

          if(this.state.save_model == index.shoe_model  && this.state.save_name == index.shoe_name  ){
            
              joined = this.state.array_image.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array_image: joined,
                array_code : code
              })
          
          }

        }else if(this.state.save_model != ''  ){ //user selectes model

          if(this.state.save_model == index.shoe_model ){
        
            joined = this.state.array_image.concat(index.shoe_image);
            code = this.state.array_code.concat(index.shoe_code);

            this.setState({
              validation : 1,
              array_image: joined,
              array_code : code
            })
      
          }

        }

    })
     
    if(this.state.validation == 0){
      alert("کفش موجود نیست");
    }

    if(this.state.validation == 1){
      this.setState({
        validation : 0
      })
    }

  };
  
 /* search and submit -> size */
  handelSearchSize(event) {
    this.setState({
      save_size: event.currentTarget.value
    }); 
  }

  handleSubmitSize = async e => {
    e.preventDefault();

    const response = await fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const body = await response.json(); 
    
    body.map(index => {
      index.shoe_size.map((item,index2) => {
        if(this.state.save_size == item){
          
          this.setState({
            array_size: [...this.state.array_size,index.shoe_image],
            array_code_size : [...this.state.array_code_size,index.shoe_code],
            validationsize : 1
          })
            
        }
      })
    })

   
    if(this.state.validationsize == 0){
      alert("سایز کفش موجود نیست");
    }

    if(this.state.validationsize == 1){
      this.setState({
        validationsize : 0
      })
    }
  
  };


  render() {
    var arraysize_1_to_60 = Array.from(Array(60).keys()) // 1 to 60
    
    return (
      <div>

        <ul id="navbar">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">جستجو</a></li>
        </ul>
                
        <div id="wrap1">

          {/*show shoe(s) after search model,name,color*/}
          {this.state.array_image.map((item, index) => (
            <div id = "border_update" >
              <Link to={ `/shoe${this.state.array_code[index]}` }>
                <img id="image" src={item}/>
              </Link>
            </div>
      
          ))}

           {/*show shoe(s) after search size*/}
          {this.state.array_size.map((item, index) => (
            <div id = "border_update" >
              <Link to={ `/shoe${this.state.array_code_size[index]}` }>
                <img id="image" src={item}/>
              </Link>
            </div>
            ))}

        </div>

         {/*search model,name,color*/}
        <div id="wrap3">
          <div id="wrap2">
            <DropdownSelectName 
              name = "heoo"
              lableName = "برند"
              placeholder = "برند کفش"
              val = {this.state.arraymodel}
              _handleChange = {event => this.handleModel(event)}
              />

            <DropdownSelectName 
              name = "heoo"
              lableName = "نام"
              placeholder = "نام کفش"
              val = {this.state.arrayShoeName}
              _handleChange = {event => this.handleName(event) }
              />

            <DropdownSelectName 
              name = "heoo"
              lableName = "رنگ"
              placeholder = "رنگ کفش"
              val = {this.state.arrayShoeColor}
              _handleChange = {event => this.handleColor(event) }
              />
          </div>

          <form onSubmit={this.handleSubmit}>
            <div id = "sectionSubmit-search" >
              <button  type="submit" class = "button-search"> جستجو </button> 
            </div>
          </form>

        </div>

         {/*search size*/}
        <div id="wrap4">
          <div id="wrap5">
            <DropdownSelect 
              name = "heoo"
              lableName = "numbers"
              placeholder = "سایز کفش"
              val = {arraysize_1_to_60}
              _handleChange = {event =>  this.handelSearchSize(event) }
              /> 
          </div>

          <form onSubmit={this.handleSubmitSize}>
            <div id = "sectionSubmit-search" >
              <button  type="submit" class = "button-search"> ثبت </button> 
            </div>
          </form>
        </div>

      </div>
    );
  }
}
