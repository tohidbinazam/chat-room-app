import initialState from "./initialState";
import { START_OFF, START_ON } from "./types";


const startReducer = ( state = initialState , { type, payload }) => {
    switch (type) {
        case START_ON:
            return true

        case START_OFF:
            return false

        default:
            return state
    }
}

export default startReducer