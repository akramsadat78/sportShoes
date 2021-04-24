import React, { Component } from 'react';
import '../css/Search.css';
import DropdownSelect from './DropdownSelect';
import DropdownSelectName from './DropdownSelectName';
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
      save_model:'',
      save_name:'',
      save_color:'',
      save_size:'',
      clickedModel: 1,
      clickedName:1,
      clickedColor:1,
      clickedSize:1,
      searchSize : '',
      arraySize : [],
      array_code_size : ''
    }
    
  }

  handelSearchSize(event) {
    this.setState({
      searchSize: event.currentTarget.value
    }); 
  }

  handleToggleColor(event,clickedColor) {
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
            
          if((index.shoe_model == this.state.save_model) ){
            if( (index.shoe_name == this.state.save_name) ){
              if( (index.shoe_color == value)){
                index.shoe_size.map((value) => {
                  this.setState({
                    save_color:index.shoe_color,
                    clickedColor: 0
                  });
                })
              }
            }
          }
          
        })
    })
  }


  handleToggleName(event,clickedName) {
    let value = event.currentTarget.value
    this.setState({
      arrayShoeColor:[],
      save_name:value,
      save_color:'',
      save_size:'',
      clickedName:1,
      clickedColor:1,
      clickedSize:1
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
          if( (index.shoe_name == value) && (index.shoe_model == this.state.save_model) ){
            if( clickedName == 1){
              this.setState({
                arrayShoeColor: [...this.state.arrayShoeColor,index.shoe_color],
                save_name:index.shoe_name,
                clickedName : 0
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

  handleToggle(event,clickedModel) {
    let value = event.currentTarget.value

    this.setState({
      arrayShoeName: [],
      arrayShoeColor:[],
      save_model:value,
      save_name:'',
      save_color:'',
      save_size:'',
      clickedModel : 1,
      clickedName:1,
      clickedColor:1,
      clickedSize:1
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
            var check_duplicate = 0

            if( index.shoe_model == value){
              if( clickedModel == 1){


                this.state.arrayShoeName.map((item,ind) =>{
                  if( item == index.shoe_name){
                    check_duplicate = 1
                  }else{
                    check_duplicate = 0
                  }
                })

                if(check_duplicate == 1){
                  this.setState({
                    save_model:index.shoe_model,
                    clickedModel : 0
                  });
                }else{
                  this.setState({
                    arrayShoeName: [...this.state.arrayShoeName,index.shoe_name],
                    save_model:index.shoe_model,
                    clickedModel : 0
                  });
                }
  
              }else{

                this.state.arrayShoeName.map((item,ind) =>{
                  if( item == index.shoe_color){
                    check_duplicate = 1
                  }else{
                    check_duplicate = 0
                  }
                })

                if(check_duplicate == 1){
                  this.setState({
                    arrayShoeName: [...this.state.arrayShoeName,index.shoe_name],
                    save_model:index.shoe_model
                  });
                }else{
                  this.setState({
                    arrayShoeName: [...this.state.arrayShoeName,index.shoe_name],
                    save_model:index.shoe_model
                  });
                }

              }
            }
        })
      })

    this.setState({
      detail: 1
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
        if(this.state.searchSize == item){
          
          this.setState({
            arraySize: [...this.state.arraySize,index.shoe_image],
            array_code_size : [...this.state.array_code_size,index.shoe_code]
          })
            
        }
      })
    })
  
  };


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
      
      if(this.state.save_model != ''  && this.state.save_name != '' && this.state.save_color != '' ){
        
        if(this.state.save_model == index.shoe_model  && this.state.save_name == index.shoe_name 
            && this.state.save_color == index.shoe_color ){
            
                joined = this.state.array.concat(index.shoe_image);
                code = this.state.array_code.concat(index.shoe_code);
  
                this.setState({
                  validation : 1,
                  array: joined,
                  array_code : code
                })
            
          }

        }else if(this.state.save_model != ''  && this.state.save_name != ''  ){

          if(this.state.save_model == index.shoe_model  && this.state.save_name == index.shoe_name  ){
            
              joined = this.state.array.concat(index.shoe_image);
              code = this.state.array_code.concat(index.shoe_code);

              this.setState({
                validation : 1,
                array: joined,
                array_code : code
              })
          
          }

        }else if(this.state.save_model != ''  ){

          if(this.state.save_model == index.shoe_model ){
        
            joined = this.state.array.concat(index.shoe_image);
            code = this.state.array_code.concat(index.shoe_code);

            this.setState({
              validation : 1,
              array: joined,
              array_code : code
            })
      
          }

        }

    })
      
    if(this.state.validation == 0){
      alert("گزینه ای انتخاب نشده است");
    }

  };
  
  render() {
    var arraysize_1_to_100 = Array.from(Array(100).keys()) // 0 to 100
    
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
      
          ))}

          {this.state.arraySize.map((item, index) => (
            <div id = "border_update" >
              <Link to={ `/shoe${this.state.array_code_size[index]}` }>
                <img id="image" src={item}/>
              </Link>
            </div>
            ))}

        </div>

        <div id="wrap3">
          <div id="wrap2">
            <DropdownSelectName 
              name = "heoo"
              lableName = "برند"
              placeholder = "برند کفش"
              val = {this.state.arraymodel}
              _handleChange = {event => this.handleToggle(event,this.state.clickedModel)}
              />

            <DropdownSelectName 
              name = "heoo"
              lableName = "نام"
              placeholder = "نام کفش"
              val = {this.state.arrayShoeName}
              _handleChange = {event => this.handleToggleName(event,this.state.clickedName) }
              />

            <DropdownSelectName 
              name = "heoo"
              lableName = "رنگ"
              placeholder = "رنگ کفش"
              val = {this.state.arrayShoeColor}
              _handleChange = {event => this.handleToggleColor(event,this.state.clickedColor) }
              />
          </div>

          <form onSubmit={this.handleSubmit}>
            <div id = "sectionSubmit-search" >
              <button  type="submit" class = "button-search"> ثبت </button> 
            </div>
          </form>

        </div>

        <div id="wrap4">
          <div id="wrap5">
            <DropdownSelect 
              name = "heoo"
              lableName = "numbers"
              placeholder = "سایز کفش"
              val = {arraysize_1_to_100}
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
