import React, { Component } from 'react';
import axios from 'axios';


{ /* component of UserComponent for showing user's form and send imformations to backend*/ }
export default class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      username: this.state.username,
      password: this.state.password
    };

    alert("form information enterd :) ")

    axios.post('http://localhost:5000/login/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      username: '',
      password: ''
    })
  }
 
  render() {

     return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Login page</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>username :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.username}
                      onChange={this.onChangeUserName}
                      />
                </div>
                <div className="form-group">
                    <label>Password : </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Register Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )

  }
}