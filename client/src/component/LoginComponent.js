import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/loginpage.css';
import logo from '../picture/1.png';
export default class LoginComponent extends Component {
  
  constructor(props) {
    super(props);
    this.enterUserName = this.enterUserName.bind(this);
    this.enterPassword= this.enterPassword.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);

    this.state = {
        username: '',
        password: '',
        validation:0 //check username ans password
    }
  }
  
  enterUserName(e) {
    this.setState({
      username: e.target.value
    });
  }

  enterPassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const response = await fetch('/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const body = await response.json();

    body.map(index => {
      if ( (index.username == this.state.username) && (index.password == this.state.password)){
        this.setState({
          validation : 1
        }) 
      }
     })
     
     if(this.state.validation == 0){
       alert("The username or password is incorrect");
     }

  };
 
  render() {
    
    //go to first page after authoriz
    if (this.state.validation == 1) {
      this.props.history.push('/first')
    }

    return (
      <div id="pic">
        
        <form onSubmit={this.handleSubmit}>
          <div id = "border" > 
          <img id="img-firstpage" src={logo} />
            <div id = "section" >

              <div id = "lables" >
                <label  ><b> : نام کاربری </b></label>
              </div>

              <InputTextField 
                name = "uname"
                id = "input-loginpage"
                type = "text"
                required = "true"
                placeholder = "نام کاربری"
                val = {this.state.username}
                _handleChange ={this.enterUserName}
              />

            </div>

            <div id = "section" >

              <div id = "lables" >
                <label><b>: رمز عبور </b></label>
              </div>

              <InputTextField 
                name = "psw"
                id = "input-loginpage"
                type = "number"
                required = "true"
                placeholder = "رمز عبور"
                val = {this.state.password}
                _handleChange = { this.enterPassword }
              />

              </div>

          

            <div id = "sectionSubmit" >
              <button  type="submit" class = "button-firstpage"> ورود </button> 
            </div>
            </div>
        </form>
     
      </div>
    );
  }
}
