import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import API from "../api";
import config from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isWrong} from "../tools";
const _TOKEN =  config._TOKEN


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
        },
        changeImageAC(state,action){
            const avatar_path = action.payload
            return {...state,avatar_path}
        },
        changeUserDataAC(state,action){
            const {username,description} = action.payload
            return {...state,username,description}
        },
        changeBackgroundAC(state,action){
            const background_path = action.payload
            return {...state,background_path}
        }
    }
})
const {loginAC,changeImageAC,changeUserDataAC,changeBackgroundAC} = reducer.actions

export const login = createAsyncThunk('LOGIN',
    async (data, {dispatch}) => {
        const response = await api.login(data);
        if (isWrong(response)) {
            return 'Wrong password or username.'
        }
        try{
            await AsyncStorage.setItem(_TOKEN, response.data.data._id);
        }
        catch (err){
            console.log(err)
        }

        dispatch(loginAC(response.data.data))
    }
)
export const register = createAsyncThunk('REGISTER',
    async (data, {dispatch}) => {
        const response = await api.register(data)
        if (isWrong(response)) {
            return 'This name already exists'
        }
        await AsyncStorage.setItem(_TOKEN, response.data.data._id);
        dispatch(loginAC(response.data.data))
    }
)
export const getAuth = createAsyncThunk('GET_COOKIE',
    async (d, {dispatch}) => {
        await AsyncStorage.getItem(_TOKEN).then(async token => {
            const response = await api.getUserById(token)
            if (isWrong(response)) return
            dispatch(loginAC(response.data.data))
        });
    }
)

export const changeUserAvatar = createAsyncThunk('CHANGE_USER_AVATAR',
    async (data, {dispatch}) => {
        console.log('CHANGE_USER_AVATAR')
        console.log(data)
        const {result,user_id,old_file_name,mode} = data
        if (!result){
            await API.setAvatar(user_id , null , old_file_name,mode)
            const callback = mode==='user_avatars' ? changeImageAC : changeBackgroundAC
            dispatch(callback(null))
            return
        }
        const uri = result.uri;
        const name = uri.split('/').pop();
        const match = /\.(\w+)$/.exec(name);
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('image', {uri, name, type})
        const response = await API.uploadAvatar(formData,mode)
        if (isWrong(response)){
            return
        }
        const filename = response.data.data
        await API.setAvatar(user_id, filename,old_file_name,mode)
        const callback = mode==='user_avatars' ? changeImageAC : changeBackgroundAC
        dispatch(callback(filename))
    }
)
export const changeUserData = createAsyncThunk('CHANGE_USER_DATA',
    async (data,{dispatch}) => {
    debugger
        const response = await api.setUserData(data);
    debugger
        console.log(response)
        dispatch(changeUserDataAC(data))
    }
)

export default reducer.reducer