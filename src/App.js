import React, { Component, Fragment } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './components/header/NavBar/navbar';
import Login from './components/auth/Login';
import './styles/main.css';
import PrivateRoute from './components/auth/PrivateRoute';
import { connect, Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
  timeout:3000,
  position:positions.MIDDLE
}




export class App extends Component {
  state={
    profile:null,
    isloading:false,
    loginClicked:false,
    loginClickedAgain:false,
    registerShow:false
  }
  componentDidMount(){
    store.dispatch(loadUser());  
  
  }
 

  _usernameCallback(username){
    console.log(username)
    this.setState({
      profile:username
    })
  }
  _test(){
    alert("maireweee")
  }
  _closeauthOpt = () =>{
    this.setState({
        loginClicked:false,
        registerShow:false
    })
}
  _handleLogin = ()=>{
      this.setState({
          loginClicked:false,
          registerShow:true
      });

  }
  _handleAuth = (e) =>{
    if(e.target.value === "Logout"){
        this.props.logout()
    }
    else{
        this.setState({
            loginClicked:true
        })
        
    }
}
submit_p = (e)=>{
  e.preventDefault();
  console.log(e.target.file)
}

  
  render() {
    const is_loading = store.getState().authReducer.isloading;
    
    return (
      <Provider store={store} >
      <Fragment >
      
        <Router>
        <AlertProvider template={AlertTemplate} {...alertOptions} >
          <NavBar  />
          <Switch>
          <Route exact path="/" render={
            (props)=>{
              return(
                <Home />
              )
            }
          }/>
          </Switch> 
          </AlertProvider>
        </Router>
        
      </Fragment>
     
      </Provider>
      
    )
  }
}



export default App;
