import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/header/header';
import '../styles/main.css';


export class Home extends Component {
    state={
        lat:null,
        long:null
    }
   
    render() {

        const { userloading } = this.props.auth;
        const Loading = (
            <div className="home-loader">Grab a Date</div>
        )
        return(
            <div className="Home">
            
                {userloading?Loading:<Header />}
            </div>
        )
    }
}

const mapStateToProps =state=>({
    auth:state.authReducer,
    button:state.buttonReducer
    
})

export default connect(mapStateToProps)(Home);
