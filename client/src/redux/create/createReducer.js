import initialState from "./initialState";
import { CREATE_OFF, CREATE_ON } from "./types";


const createReducer = ( state = initialState , { type, payload }) => {
    switch (type) {
        case CREATE_ON:
            return true

        case CREATE_OFF:
            return false

        default:
            return state
    }
}

export default createReducer