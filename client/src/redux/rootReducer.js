import { combineReducers } from "redux"
import createReducer from "./create/createReducer";
import startReducer from "./start/startReducer";
import joinReducer from "./join/joinReducer";
import chatReducer from "./chat/chatReducer";


const rootReducer = combineReducers({
    start: startReducer,
    create : createReducer,
    join: joinReducer,
    chat: chatReducer

})

export default rootReducer