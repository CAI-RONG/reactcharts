import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../assets/Login.css";
import axios from 'axios';
import {connect} from 'react-redux';
import {getAccessToken,getRefreshToken,isLogin,getID} from '../redux/actions/userActions';
import {Redirect} from 'react-router';

class Login_ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(){
    axios.get('http://localhost:5000/api/auth/',{
            params:{
              email:this.state.email,
              password:this.state.password
            }
        })
        .then(response=>{
            console.log(response.data);
            this.props.getAccessToken(response.data.access_token);
            this.props.getRefreshToken(response.data.refresh_token);
            this.props.getID(response.data.id);
            this.props.login(true);
        })
        .catch((error)=>alert(error.response.data.msg));
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
/*
   handleSubmit = async event => {
    event.preventDefault();

    try {
      await Auth.signIn(this.state.email, this.state.password);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }
*/
  render() {
    if(this.props.isLogin)
      return <Redirect to='/' />
    else
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </form>
        </div>
      );
  }
}

const mapDispatchToState=dispatch=>{
  return {
    getAccessToken:token=>dispatch(getAccessToken(token)),
    getRefreshToken:token=>dispatch(getRefreshToken(token)),
    login:status=>dispatch(isLogin(status)),
    getID:id=>dispatch(getID(id))
  }
}

const Login=connect(
  state=>{
    return {isLogin:state.authReducer.isLogin}
  },
  mapDispatchToState
)(Login_);

export default Login;