import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  OTP_CREATED,
  OTP_VERIFIED,
  PROFILE_CREATED
} from './types';
import { HeaderConfig } from './utils';


const url = "http://localhost:8000"



// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {

  dispatch({ type: USER_LOADING });
  await axios
    .get(url+'/api/auth/user', HeaderConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      localStorage.setItem('user', res.data.user)
      console.log(res.data.user)
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const ValidatePhone = (phone) => async (dispatch, getState)=>{
  
  const data = JSON.stringify(phone)
  await axios.post(`${url}/api/auth/validate_phone`,data, HeaderConfig(getState))
  .then((response)=>{
    dispatch({
      type:OTP_CREATED,
      payload:response.data
    })
  })
  .catch((e)=>console.log(e))
}

export const ValidateOTP = (otpdata) => async (dispatch, getState)=>{
  
  const data = JSON.stringify(otpdata)
  await axios.post(`${url}/api/auth/validate_otp`,data, HeaderConfig(getState))
  .then((response)=>{
    dispatch({
      type:OTP_VERIFIED,
      payload:response.data
    })
    console.log(response,"poooor")
  })
  .catch((e)=>console.log(e))
}

// LOGIN USER
export const login = (user) => async (dispatch) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request BodySELFIE_UPLOADED
  const body = JSON.stringify(user);

  await axios 
    .post(url+'/api/auth/login', body, config)
    .then((res) => {
      
       dispatch({
        type: LOGIN_SUCCESS,
        payload:res.data
      });
      localStorage.setItem('token', res.data.token)
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ phone, user_name, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ phone, user_name, password });

  await axios
    .post(url+'/api/auth/register', body, config)
    .then((res) => {
       dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      localStorage.setItem('token', res.data.token)
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};


// Setting DP

// Header for form data
function FormDataheader(getstate){
  const token = getstate().authReducer.token;
  console.log(token,"tokeneeyy")
  const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  return config;
}

export const createProfile = (data) =>  async (dispatch, getState) =>{
  console.log(data);
  await axios.post(`${url}/api/profile/`, data,  FormDataheader(getState))
    .then(res=>{
      dispatch({
        type:PROFILE_CREATED,
        payload:res.data
      })
    })
    .catch(error=>{console.log(error)})
}

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  await axios
    .post(url+'/api/auth/logout', null, HeaderConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
       dispatch({
        type: LOGOUT_SUCCESS,
      });
      localStorage.removeItem('token')
    })
    .catch((err) => {
    });
};

// Setup config with token - helper function
