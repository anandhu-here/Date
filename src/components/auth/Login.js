import React, { Component } from 'react'
import { login } from '../../actions/auth'
import store  from '../../store'

export class Login extends Component {
    state = {
        phone:"",
        password:"",
    }

    
    handleChange = (e) =>{
        e.preventDefault()
        console.log(e.target.value, e.target.name)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    _Login = (e) =>{
        e.preventDefault();
        const data = this.state;
        store.dispatch(login(data));
    }

    render() {
        const {  phone, password } = this.state;
        return (
            <div className="Login">
                <input 
                    className = "Login-input" 
                    value={phone}
                    placeholder="Enter your phone number"
                    onChange = {(e)=>this.handleChange(e)}
                    name = "phone"
                />
                <input 
                    className = "Login-input" 
                    value={password}
                    placeholder="Password"
                    onChange = {(e)=>this.handleChange(e)}
                    name = "password"
                />
                <button onClick = {(e)=>this._Login(e)} className="Login-submit-btn" >Login</button>
                <div className="Login-text">Hope you had a nice day !</div>
            </div>
        )
    }
}

export default Login;
