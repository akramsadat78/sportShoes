import React from 'react';

import LoginComponent from './component/LoginComponent';

import './App.css';

function App () {
  return ( <LoginComponent/> );
}

export default App;
/*

  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);

    this.state = {
        response: '',
        post: '', // data you sed for server from client
        responseToPost: '',//show data from server in client
        username: '',
        password: ''
    }
  }
  /*state = {
    response: '',
    post: '', // data you sed for server from client
    responseToPost: '',//show data from server in client
  };
  */
  /*componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  */
/* componentDidMount() {
  this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
}

callApi = async () => {
  const response = await axios('/login');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
};


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
   /* axios.post('http://localhost:5000/login/add', obj)
        .then(res => console.log(res.data));
  
      const response = await fetch('/login/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       // body: JSON.stringify({ post: obj }),
       body: JSON.stringify(obj ) ,
      });

       
    const body = await response.text();
    this.setState({
      responseToPost: body ,
      username: '',
      password: ''
    })

    //this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
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
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}


/*import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './login/LoginComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Wellcome Page</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
              <Route path='/login' component={ Login } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

/*
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
*/