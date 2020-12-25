import { CLOSE_AUTH_OPT, OPEN_AUTH_OPT, REG_BTN_CLICKED, SELFIE_CLICKED } from "./types"


export const openAuthOpt =() =>(dispatch, getState) =>{
    dispatch({
        type:OPEN_AUTH_OPT
    });

}
export const closeAuthOPT =() =>(dispatch, getState) =>{
    dispatch({
        type:CLOSE_AUTH_OPT
    });

}
export const registerCLicked = () => (dispatch, getState) =>{
    dispatch({
        type:REG_BTN_CLICKED
    });
}
export const selfieClicked = () => (dispatch, getState) =>{
    dispatch({
        type:SELFIE_CLICKED
    });
}