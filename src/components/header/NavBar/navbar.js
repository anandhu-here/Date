import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import '../../../styles/main.css';
import { logout } from '../../../actions/auth';
import { Link, withRouter } from 'react-router-dom';
import { openAuthOpt } from '../../../actions/buttonActions';
export class NavBar extends Component {
    
    _handleAuth = (e) =>{
        if(e.target.value === "Logout"){
            this.props.logout()
        }
        else{
            this.props.openAuthOpt()
        }
    }
    
    render() {
        const {isAuth, userloading} = this.props.auth;
        return (
            
            <Fragment >
                
                {userloading?null:<div className="navbar">
                
                <div className="navbar_left">
                    <Link className="navbar_left_brand" to="/">Grab a Date</Link>
                </div>
                <div className="navbar_right">
                  
                    <input onClick={(e)=>this._handleAuth(e)} className="navbar_right-auth " type="submit" value={isAuth?"Logout":"Login"}/>
                    
                </div>
                

                </div>}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.authReducer,
    button:state.buttonReducer
})

export default connect(mapStateToProps, { logout,openAuthOpt })( withRouter(NavBar));

