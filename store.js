import {applyMiddleware, combineReducers, createStore} from "redux";
import login from "./reducers/login_reducer";
import users from "./reducers/users_reducer";
import comments from "./reducers/comments_reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({login, users,comments})
const store = createStore(reducers,applyMiddleware(thunk))
window.state = store.getState

export default store