const { CLEAR_STATE } = require("./types")

export const clearState = () => dispatch=>{
    dispatch({
        type:CLEAR_STATE
    })
}