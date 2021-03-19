import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/loginpage.css';
export default class SignUpComponent extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);

    this.state = {
        response: '',
        responseToPost: '',//show data from server in client
        username: '',
        password: ''
    }
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault();

    const obj = {
      username: this.state.username,
      password: this.state.password
    };

    alert("form information enterd :) ")

    const response = await fetch('/login/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj) ,
    });
       
    const body = await response.text();

    this.setState({
      responseToPost: body ,
      username: '',
      password: ''
    })

  };
  
  render() {
    return (
      <body>
      <div id="wrap">
        <form onSubmit={this.handleSubmit}>
          <div id = "border" > 

            <div id = "section" >

              <div id = "lables" >
                <label  ><b> : نام کاربری </b></label>
              </div>

              <InputTextField 
                name = "uname"
                type = "text"
                required = "true"
                placeholder = "نام کاربری"
                val = {this.state.username}
                _handleChange ={this.onChangeUserName}
              />

            </div>

            <div id = "section" >

              <div id = "lables" >
                <label><b>: رمز عبور </b></label>
              </div>

              <InputTextField 
                name = "psw"
                type = "text"
                required = "true"
                placeholder = "رمز عبور"
                val = {this.state.password}
                _handleChange = { this.onChangePassword }
              />

              </div>

            </div>
            
            <div id = "sectionSubmit" >
              <button  type="submit" class = "button"> ورود </button> 
            </div>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
      </body>
    );
  }
}
