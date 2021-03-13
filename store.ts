import {applyMiddleware, combineReducers, createStore} from "redux";
import login from "./reducers/login_reducer";
import users from "./reducers/users_reducer";
import comments from "./reducers/comments_reducer";
import thunk from "redux-thunk";
import messages from "./reducers/messages_reducer";

const reducers = combineReducers({login, users,comments,messages})
const store = createStore(reducers,applyMiddleware(thunk))
// @ts-ignore
window.state = store.getState
type GLOBAL_TYPE = typeof reducers;
export type StateType = ReturnType<GLOBAL_TYPE>

export default store