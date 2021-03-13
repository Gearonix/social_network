import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import {isWrong} from "../tools";
import {actionType, commentsType} from './../types'

const initialState : commentsType = {
    comments: [],
    loading: false
}

const reducer = createSlice({
    name: 'COMMENTS',
    initialState,
    reducers: {
        setComments(state, action : actionType<Array<any>>) {
            return {...state, comments: action.payload}
        },
        setLoading(state, action : actionType<boolean>) {
            return {...state, loading: action.payload}
        },
        addCommentAC(state,action : actionType<any>){
            return {...state, comments: [...state.comments,action.payload]}
        }
    }
})
export const {setComments, setLoading,addCommentAC} = reducer.actions

export const getComments = createAsyncThunk('GET_COMMENTS',
    async (id : string, {dispatch}) => {
        dispatch(setLoading(true))
        const response = await api.getComments(id);
        if (isWrong(response)) return
        dispatch(setComments(response.data.data))
        dispatch(setLoading(false))
    }
)
type addCommentT = {message : string,user_id : string,avatar_path : string| null, username : string,post_id : string}

export const addComment = createAsyncThunk('ADD_COMMENT',
    async (data : addCommentT, {dispatch}) => {
        const response = await api.addComment(data)
        if (isWrong(response)) return
        dispatch(addCommentAC(response.data.data))
    }
)

export default reducer.reducer