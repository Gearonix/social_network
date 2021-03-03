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
        background_path: null,
        user_id: null,
        subscribed: false,
        posts : []
    },
    followers: [],
    followers_loading : false
}

const reducer = createSlice({
    name: 'USERS_REDUCER',
    initialState,
    reducers: {
        setFoundUsers(state, action) {
            return {...state, found_users: action.payload}
        },
        setCurrentUser(state, action) {
            const {
                username, description, avatar_path, followers_count,
                background_path, _id, online, subscribed,posts
            } = action.payload
            return {
                ...state, current: {
                    ...state.current, username, description, avatar_path, followers_count,
                    user_id: _id, background_path, online, subscribed,posts
                }
            }
        },
        toggleFollow(state, action) {
            const followers_count = action.payload ? state.current.followers_count + 1 :
                state.current.followers_count - 1
            return {...state, current: {...state.current, subscribed: action.payload, followers_count}}
        },
        clearCurrent(state, action) {
            return {...state, current: initialState.current}
        },
        setFollowers(state, action) {
            return {...state, followers: action.payload}
        },
        setFollowLoading(state,action){
            return {...state,followers_loading: action.payload}
        }
    }

})
export const {setFoundUsers, setCurrentUser, toggleFollow, clearCurrent, setFollowers,
    setFollowLoading} = reducer.actions

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
    async ({id, current_user_id}, {dispatch}) => {
        const response = await api.getUserById(id, current_user_id);
        dispatch(setCurrentUser(response.data.data))
        return response
    }
)
export const follow = createAsyncThunk('FOLLOW',
    async (data, {dispatch}) => {
        const {user_id, follow_to} = data;
        await api.follow(user_id, follow_to);
        dispatch(toggleFollow(true))
    }
)
export const unfollow = createAsyncThunk("UNFOLLOW",
    async (data, {dispatch}) => {
        const {user_id, follow_to} = data;
        await api.unfollow(user_id, follow_to);
        dispatch(toggleFollow(false))
    }
)
export const getFollowers = createAsyncThunk('GET_FOLLOWERS',
    async (user_id, {dispatch}) => {
        dispatch(setFollowLoading(true))
        const response = await api.getFollowers(user_id);
        if (isWrong(response)) return
        dispatch(setFollowers(response.data.data))
        dispatch(setFollowLoading(false))
    }
)

export default reducer.reducer