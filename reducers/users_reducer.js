import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import {isWrong} from "../tools";

const initialState = {
    found_users: [],
    current: {
        username: null,
        description: null,
        avatar_path: null,
        followers_count: null,
        online: null,
        background_path: null
    }
}

const reducer = createSlice({
    name: 'USERS_REDUCER',
    initialState,
    reducers: {
        setFoundUsers(state, action) {
            return {...state, found_users: action.payload}
        },
        setCurrentUser(state, action) {
            return {...state, current: action.payload}
        }
    }
})
const {setFoundUsers, setCurrentUser} = reducer.actions

export const search = createAsyncThunk('SEARCH_USERS',
    async (value, {dispatch}) => {
        if (!value) {
            dispatch(setFoundUsers([]))
            return
        }

        const response = await api.search(value);
        if (isWrong(response)) return
        dispatch(setFoundUsers(response.data.data))
        console.log(response.data.data)
    }
)
export const getUser = createAsyncThunk("GET_USER",
    async (id, {dispatch}) => {
        const response = await api.getUserById(id);
        dispatch(setCurrentUser(response.data.data))
    }
)

export default reducer.reducer