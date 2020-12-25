import { CLEAR_STATE, OTP_CREATED, OTP_VERIFIED } from "../actions/types"

const initialState = {
    otpStatus:null,
    otpVerfiedStatus:false

}


export const OTPReducer = (state=initialState, aciton) =>{
    switch(aciton.type){
        case OTP_CREATED:
            return {
                ...state,
                otpStatus:aciton.payload.status
                
            }
        case OTP_VERIFIED:
            return {
                ...state,
                otpVerfiedStatus:aciton.payload.status

            }
        case CLEAR_STATE:
            return{
                ...state,
                otpStatus:null,
                otpVerfiedStatus:false
            }
        default :
            return{
                ...state
            }
        }
}