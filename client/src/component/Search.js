import React, { Component } from 'react';
import '../css/Search.css';
import InputTextField from './InputTextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
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
      data: 'Data from parent',
      arrayShowModel:[],
      checked:1,
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma'],
      detail:0,
      arrayShoeName:[],
      arrayShoeColor:[],
      arrayShoeSize:[],
      save_model:'',
      save_name:'',
      save_color:'',
      save_size:'',
      clickedModel: 1,
      clickedName:1,
      clickedColor:1,
      clickedSize:1
      
    }
    
  }
  handleToggleSize(value,index,clickedSize) {
    alert(this.state.save_color)
    if( clickedSize == 1){
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            
            if( (index.shoe_size == value) && (index.shoe_color == this.state.save_color) ){
              alert(index.shoe_size)
            this.setState({
              save_size:index.shoe_size,
              clickedSize: 0
            });
          }
        })
   })
  }else{
    alert("یک مورد انتخاب شده است")
  }

 }
  handleToggleColor(value,index,clickedColor) {
    alert(this.state.save_name)
    if( clickedColor == 1){
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            
            if( (index.shoe_color == value) && (index.shoe_name == this.state.save_name) ){
              alert(index.shoe_size)
              index.shoe_size.map((value) => {
               alert(value)
                this.setState({
                  arrayShoeSize: [...this.state.arrayShoeSize,value],
                  save_color:index.shoe_color,
                  clickedColor: 0
                });
              })
             
          }
        })
   })
  }else{
    alert("یک مورد انتخاب شده است")
  }

 }
  handleToggleName(value,index,clickedName) {
    alert(this.state.save_model)
    if( clickedName == 1){
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            
            if( (index.shoe_name == value) && (index.shoe_model == this.state.save_model) ){
              alert(index.shoe_color)
            this.setState({
              arrayShoeColor: [...this.state.arrayShoeColor,index.shoe_color],
              save_name:index.shoe_name,
              clickedName : 0
            });
          }
        })
   })
  }else{
    alert("یک مورد انتخاب شده است")
  }

 }
  handleToggle(value,index,clickedModel) {
    alert(value)
    if( clickedModel == 1){
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            
            if( index.shoe_model == value){
              alert(index.shoe_name)
            this.setState({
              arrayShoeName: [...this.state.arrayShoeName,index.shoe_name],
              save_model:index.shoe_model,
              clickedModel : 0
            });
          }
        })
   })
    this.setState({
      detail: index
    });
  }else{
    alert("یک مورد انتخاب شده است")
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

  componentDidMount() {
   /* fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

            result.map(index => {
             
                  this.setState({
                  arrayShowModel: [...this.state.arrayShowModel,index.shoe_model]
                  }) 
           
      })
   })
*/
   
  }
  handleSubmit = async e => {
    e.preventDefault();

    alert("model")
    alert(this.state.save_model)
    alert("name")
    alert(this.state.save_name)
    alert("color")
    alert(this.state.save_color)
    alert("size")
    alert(this.state.save_size)

    const response = await fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const body = await response.json();
    var joined ;
    var code ;
    
    body.map(index => {/*
      if(this.state.shoe_size != '' && this.state.shoe_color != ''){
        if(this.state.shoe_code != ''){
          if(this.state.shoe_name != ''){//name,model,code,color,size
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
          }else{//model,code,color,size
            if ((index.shoe_model == this.state.shoe_model) &&
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
          }   
        }else{
          if(this.state.shoe_name != ''){//name,model,color,size
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
          }else{//model,color,size
            if ((index.shoe_model == this.state.shoe_model) &&
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
      }
    }else if(this.state.shoe_size == '' && this.state.shoe_color != ''){
        if(this.state.shoe_code != ''){
          if(this.state.shoe_name != ''){//name,model,code,color
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
          }else{//model,code,color
            if ((index.shoe_model == this.state.shoe_model) &&
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
          }
        }else {
          if(this.state.shoe_name != ''){//name,model,color
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
          }else{//model,color
            if ((index.shoe_model == this.state.shoe_model) &&
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
        }
      }else if(this.state.shoe_size != '' && this.state.shoe_color == ''){
        if(this.state.shoe_code != ''){
          if(this.state.shoe_name != ''){//name,model,code,size
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
          }else{//model,code,size
            if ((index.shoe_model == this.state.shoe_model) &&
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
          }
        }else{
          if(this.state.shoe_name != ''){//name,model,size
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
          }else{//model,size
            if ((index.shoe_model == this.state.shoe_model) &&
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
        }
      }else{
        if(this.state.shoe_code != ''){
          if(this.state.shoe_name != ''){//name,model,code
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
          }else{//model,code
            if ( (index.shoe_model == this.state.shoe_model) &&
               (index.shoe_code == this.state.shoe_code) ){

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
          if(this.state.shoe_name != ''){//name,model
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
          }else{
            if ((index.shoe_model == this.state.shoe_model) ){

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
      }*/
    })
     
     if(this.state.validation == 0){
      alert("not found!!");
    }

  };
  
  render() {
  
    var show;
    var sum=0;
    if(this.state.detail != 0){
     sum = this.state.detail; 
    }

    show=
    <div>
      <p>{sum}</p>
      <p>{this.state.arrayShoeName.length}</p>
      {this.state.arrayShoeName.map((value,index) => {
        <li>
          <label>value</label>
        </li>
      })

      }
    </div>
    return (
      <div>
        <ul id="navbar">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">جستجو</a></li>
        </ul>
                
        <div id="wrap1">
          {this.state.array.map((item, index) => (
          
                <div id = "border_update" >
                  <Link to={ `/shoe${this.state.array_code[index]}` }>
                    <img id="image" src={item}/>
                  </Link>
                </div>
          
             )) 
          }
        </div>

        <div id="wrap2">
      
      {this.state.arraymodel.map((value,index) => {
       

        return (
          <li>
            <label onClick={ () => this.handleToggle(value,index,this.state.clickedModel) }><b>{value}</b></label>
            
            </li>
        );
      })}
      <hr/>
      {this.state.arrayShoeName.map((value,index) => {
        return (
        <li>
          <label onClick={ () => this.handleToggleName(value,index,this.state.clickedName) } ><b>{value}</b></label>
        </li>
        );
      })
      }
       <hr/>
      {this.state.arrayShoeColor.map((value,index) => {
        return (
        <li>
          <label onClick={ () => this.handleToggleColor(value,index,this.state.clickedColor) } ><b>{value}</b></label>
        </li>
        );
      })
      }
       <hr/>
    <p>{this.state.arrayShoeSize.length}</p>
       {this.state.arrayShoeSize.map((value,index) => {
        return (
          <li>
            <label onClick={ () => this.handleToggleSize(value,index,this.state.clickedSize) }><b>{value}</b></label>
          </li>
          );
        })
      }
       <hr/>
      {/*show*/}
      <form onSubmit={this.handleSubmit}>
      <div id = "sectionSubmit-search" >
              <button  type="submit" class = "button-search"> ثبت </button> 
          </div>
      </form>
        {/*<form onSubmit={this.handleSubmit}>
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
              <p  ><b>: نام کفش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
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
        </form>*/}
        </div>
      </div>
    );
  }
}
