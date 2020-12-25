import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component:Component, auth, ...rest }) =>{
    return(
        <Route 
            {...rest}
            render={(props)=>{
                if(auth.isAuth === true){
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
}

const mapStateToProps = state =>({
    auth:state.authReducer
})

export default connect(mapStateToProps)(PrivateRoute);