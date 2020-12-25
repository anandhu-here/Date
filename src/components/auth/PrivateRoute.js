import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import '../../styles/main.css';
const PrivateRoute = ({ component:Component, auth, ...rest }) =>{
    
    const route = (
        <Route 
            {...rest}
            render={(props)=>{
                
                if(auth.isAuth){
                    
                    return(
                        <Component {...props} />
                    )
                }
                else{
                    
                    return(
                        <Redirect to="/login" />
                    )
                }
            }}
        />
    )
    const loadingdiv=(
        <div className="home-loader">LOADING................... </div>
    )
    return(
        <Fragment>
            {route}
        </Fragment>
    )
}

const mapStateToProps = state =>({
    auth:state.authReducer
})

export default connect(mapStateToProps)(PrivateRoute);