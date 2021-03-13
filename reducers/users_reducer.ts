import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import {isWrong} from "../tools";
import {actionType, nor, usersType} from './../types'

const initialState : usersType = {
    found_users: [],
    current: {
        username: null,
        description: null,
        avatar_path: null,
        followers_count: null,
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
        toggleFollow(state, action : actionType<boolean>) {
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
        },
        setCommentsCount(state,action){
            return {...state,current : {...state.current,posts :
                        state.current.posts.map(item => item._id===action.payload ? {...item,
                    comments : item.comments+1} : item)}}
        },
        unlikePostAC(state, action) {
            const e = item => ({...item, liked: item.liked.filter(item => item.user_id!==action.payload)})
            return {...state,current : {...state.current,posts : state.current.posts.map(item => e(item))}}
        },
        likePostAC(state,action){
            const {avatar_path, user_id, username,post_id} = action.payload
            const e = item => item._id===post_id ? {...item,liked : [...item.liked,{avatar_path, user_id, username}]} :
                item
            return {...state,current : {...state.current,posts : state.current.posts.map(item => e(item))}}
        }
    }

})
export const {setFoundUsers, setCurrentUser, toggleFollow, clearCurrent, setFollowers,
    setFollowLoading,setCommentsCount,unlikePostAC,likePostAC} = reducer.actions

export const search = createAsyncThunk('SEARCH_USERS',
    async (value : string, {dispatch}) => {
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
type getUserT = {
    id : nor
    current_user_id : string
}
export const getUser = createAsyncThunk("GET_USER",
    async ({id, current_user_id} : getUserT, {dispatch}) => {
        const response = await api.getUserById(id, current_user_id);
        dispatch(setCurrentUser(response.data.data))
        return response
    }
)
type followT = {
    user_id : string,
    follow_to : string
}
export const follow = createAsyncThunk('FOLLOW',
    async (data : followT, {dispatch}) => {
        const {user_id, follow_to} = data;
        await api.follow(user_id, follow_to);
        dispatch(toggleFollow(true))
    }
)
export const unfollow = createAsyncThunk("UNFOLLOW",
    async (data : followT, {dispatch}) => {
        const {user_id, follow_to} = data;
        await api.unfollow(user_id, follow_to);
        dispatch(toggleFollow(false))
    }
)

export const getFollowers = createAsyncThunk('GET_FOLLOWERS',
    async (user_id : string, {dispatch}) => {
        dispatch(setFollowLoading(true))
        const response = await api.getFollowers(user_id);
        if (isWrong(response)) return
        dispatch(setFollowers(response.data.data))
        dispatch(setFollowLoading(false))
    }
)
export const LikePost = createAsyncThunk('LIKE_POST',
    async (post_id : string, {dispatch, getState}) => {
        //@ts-ignore
        const {avatar_path, user_id, username} = getState().login
        const data = {avatar_path, user_id, username, post_id}
        await api.likePost(data)
        dispatch(likePostAC(data))
    }
)
export const UnLikePost = createAsyncThunk('UNLIKE_POST',
    async (data : {user_id : string,post_id : string}, {dispatch}) => {
        dispatch(unlikePostAC(data.user_id))
        await api.unlikePost(data)
    }
)
export default reducer.reducer