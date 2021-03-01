import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    username: null,
    user_id: null,
    description: null,
    avatar_path: null,
    followers_count: null,
    background_path: null
}
const reducer = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginAC(state, action) {
            const {username, description, avatar_path, followers_count, background_path} = action.payload
            return {
                ...state, username, description, avatar_path, followers_count,
                user_id: action.payload._id, background_path
            }
        }
    }
})
const {loginAC} = reducer.actions

export const login = createAsyncThunk('LOGIN',
    async (data, {dispatch}) => {
        const response = await api.login(data);
        if (response.data.status !== 200) {
            return 'Wrong password or username.'
        }
        dispatch(loginAC(response.data.data))
    }
)
export const register = createAsyncThunk('REGISTER',
    async (data, {dispatch}) => {
        const response = await api.register(data)
        if (response.data.status!==200){
            return 'This name already exists'
        }
        debugger
        dispatch(loginAC(response.data.data))
    }
)
export const getcookie = createAsyncThunk('GET_COOKIE',
    async (d,{dispatch}) => {
    const response = await api.getcookie();
    console.log(response)
    debugger
    }

    )

export default reducer.reducer