import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, USER_LOADING, LOGOUT_SUCCESS, REGISTER_SUCCESS, PROFILE_CREATED } from '../actions/types';
var initialState;


if (localStorage.getItem('user')!=="undefined"){
    initialState = {
        isAuth:true,
        user:localStorage.getItem('user'),
        isloading:false,
        isloaded:true,
        token:localStorage.getItem('token'),
        newUser:false,
        profileCreated:false

    }
}

else{
    initialState = {
        isAuth:false,
        user:null,
        id:null,
        isloading:false,
        token:null,
        isloaded:false,
        newUser:false,
        profileCreated:false
    
    }
}

export const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                userloading:true,
                token:localStorage.getItem('token')
            }
        case USER_LOADED:
            return{
                ...state,
                isAuth:true,
                userloading:false,
                user:action.payload,
                isloaded:true
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuth:true,
                isloading:false,
                user:action.payload.user,
                token:action.payload.token,
                isloaded:true
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuth:true,
                isloading:true,
                newUser:true,
                user:action.payload.user,
                token:action.payload.token,
                profileCreated:false
            }
        case PROFILE_CREATED:
            return{
                ...state,
                isloading:false,
                profileCreated:true

            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuth:false,
                user:null,
                userloading:false,
                token:null,
                
                
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuth:false,
                user:null,
                isloading:false,
                token:null
                
            }
        
            
        default:
            return{
                ...state
            }
    }

} 