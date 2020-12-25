import {  CLOSE_AUTH_OPT, OPEN_AUTH_OPT, REG_BTN_CLICKED, SELFIE_CLICKED } from "../actions/types"

const initialState = {
    openAuth:false,
    registerShow:false,
    SelfieStream:false
}

export const buttonReducer = (state=initialState, action) =>{
    switch(action.type){
        case OPEN_AUTH_OPT:
            return {
                ...state,
                openAuth:true,
                registerShow:false
            }
        case CLOSE_AUTH_OPT:
            return {
                ...state,
                openAuth:false,
                registerShow:false
            }
        case REG_BTN_CLICKED:
            return {
                ...state,
                openAuth:false,
                registerShow:true
            }
        case SELFIE_CLICKED:
            return{
                ...state,
                SelfieStream:true
            }
        default:
            return{
                ...state
            }
    }
}