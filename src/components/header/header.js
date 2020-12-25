import React, { Component, Fragment } from 'react';
import '../../styles/main.css';
import pic from '../../img/date_md.jpg'
import { connect } from 'react-redux';
import AuthOpt from '../auth/AuthOpt';
import { logout } from '../../actions/auth';
import { openAuthOpt, closeAuthOPT, registerCLicked } from '../../actions/buttonActions';
export class Header extends Component {
    state = {
        loginClicked:false,
        loginClickedAgain:false,
        registerShow:false,
        profile_updated:false,
        login_updated:false
    }
    _handleAuth = (e) =>{
        if(e.target.value === "Logout"){
            this.props.logout()
        }
        else{
            
            this.props.openAuthOpt()
        }
    }
    _closeauthOpt = () =>{
        this.props.closeAuthOPT()
    }
    _handleLogin = ()=>{
        this.props.registerCLicked()
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            if(!this.state.profile_updated){
                if(this.props.auth.profileCreated){
                    this.props.closeAuthOPT();
                    this.setState({
                        profile_updated:true
                    })
                }
            }
            if(!this.state.login_updated){
                if(this.props.auth.isloaded){
                    this.props.closeAuthOPT();
                    this.setState({
                        login_updated:true
                    })
                }
            }
        }
    }
    render() {
        const {user, isAuth} = this.props.auth;
        const {openAuth, registerShow} = this.props.button;
        console.log(openAuth, "lplplplp")
        var header_bottom_nav;
        if(isAuth){
            header_bottom_nav = (
                <div className="header-bottom-nav">
                    <div className="header-bottom-nav-setting"><h5>Settings</h5></div>
                    <div className = "header-bottom-nav-profile"><h5>{ user.name }</h5></div>
                </div>
            )
        }
        return (
            <Fragment>
            {openAuth?<AuthOpt 
                callbackclose={this._closeauthOpt} 
                />:null}
            <div className="header" >
            
                <div className="header_img">
                    <img src={pic} alt="imaghhhe"/>
                    <div className="header_img-text">
                    {isAuth?<div className="header_img-text-head"><p>Welcome {user.name}</p><input type="submit" className="header_img-text-input" value="Grab your Date" /></div>:<div className="header_img-text-head">Grab your Date now.</div>}
                        
                    </div>
                    <div className="header_img-auth">
                        {isAuth?
                            <input onClick={(e)=>this._handleAuth(e)} className="header_img-auth-login" value="Logout" type="submit"></input> 
                            :<div><input onClick={(e)=>this._handleAuth(e)} className="header_img-auth-login" value="Login" type="submit"></input>
                            <input className="header_img-auth-register " value="Create an Account" type="submit" ></input></div>
                        }
                        
                        
                    </div>
                    {header_bottom_nav}
                </div>
                
                </div>
                </Fragment>
            
        )
    }
}
const mapStateToProps = state => ({
    auth:state.authReducer,
    button:state.buttonReducer  
})

export default connect(mapStateToProps, {openAuthOpt,registerCLicked, closeAuthOPT, logout})(Header)
