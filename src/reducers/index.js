import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { buttonReducer } from './buttonReducer';
import {OTPReducer} from './OTPreducer';
const rootReducer = combineReducers({
    authReducer,
    buttonReducer,
    OTPReducer
})

export default rootReducer;