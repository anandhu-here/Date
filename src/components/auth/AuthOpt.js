import React, { Component, Fragment } from 'react'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { clearState } from '../../actions/clearState'
import store from '../../store';
export class AuthOpt extends Component {
    state = {
        phone:"",
        password:"",
        page:"LOGIN",
        activeClasslogin:"auth-select-login-active",
        activeClassreg:"auth-select-register"
    }
    pageToRegister = () =>{
        this.setState({
            page:"REGISTER",
            activeClassreg:"auth-select-register-active",
            activeClasslogin:"auth-select-login"
        })
    }
    pageToLogin = () =>{
        this.setState({
            page:"LOGIN",
            activeClasslogin:"auth-select-login-active",
            activeClassreg:"auth-select-register",
        })

    }
    componentWillUnmount(){
        store.dispatch(clearState())
    }
    render() {
        var AuthDiv;
        const { page } = this.state;
        switch (page){
            case "LOGIN":
                AuthDiv = (
                    <Login />
                )
                break;
            case "REGISTER":
                AuthDiv = (
                    <Register/>
                )
            default:
                break;
        }
        return (<Fragment>
            
            <div className='authOpt'>
            <div className="phoneRegister-icons">
            <div onClick={()=>{this.props.callbackclose()}} className="close"><AiOutlineClose className="close-icon" /></div>
            </div>
                <div className="authOpt-logo">Grab a Date</div>
                <div className="auth-select-cont">
                    <div onClick={()=>this.pageToLogin()} className={this.state.activeClasslogin}>Login</div>
                    <div onClick={()=>this.pageToRegister()} className={this.state.activeClassreg}>Sign Up</div>
                </div>
                <div className="auth-">
                    {AuthDiv}
                </div>
            </div>
            </Fragment>
        )
    }
}
export default connect()(AuthOpt); 
