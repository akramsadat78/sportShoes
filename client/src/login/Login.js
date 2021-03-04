import React, { Component } from 'react';
import axios from 'axios';

{ /* component of UserComponent for showing user's form and send imformations to backend*/ }
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.onChangeShoeName = this.onChangeShoeName.bind(this);
    this.onChangeShoeCode = this.onChangeShoeCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        shoe_name: '',
        shoe_code: ''
    }
  }

  onChangeShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  onChangeShoeCode(e) {
    this.setState({
        shoe_code: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_code: this.state.shoe_code
    };

    alert("form information enterd :) ")

    axios.post('http://localhost:5000/shoe/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
        shoe_name: '',
      shoe_code: ''
    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Shoe</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Shoe Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.shoe_name}
                      onChange={this.onChangeShoeName}
                      />
                </div>
                <div className="form-group">
                    <label>Shoe Code: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.shoe_code}
                      onChange={this.onChangeShoeCode}
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