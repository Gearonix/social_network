import {applyMiddleware, combineReducers, createStore} from "redux";
import login_reducer from "./reducers/login_reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    login : login_reducer
})
const store = createStore(reducers,applyMiddleware(thunk))
window.state = store.getState

export default store