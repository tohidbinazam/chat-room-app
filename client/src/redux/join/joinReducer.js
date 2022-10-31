import initialState from "./initialState";
import { JOIN_OFF, JOIN_ON } from "./types";


const joinReducer = ( state = initialState , { type, payload }) => {
    switch (type) {
        case JOIN_ON:
            return true

        case JOIN_OFF:
            return false

        default:
            return state
    }
}

export default joinReducer