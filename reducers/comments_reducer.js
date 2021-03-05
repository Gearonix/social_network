import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import {isWrong} from "../tools";

const initialState = {
    comments: [],
    loading: false
}

const reducer = createSlice({
    name: 'COMMENTS',
    initialState,
    reducers: {
        setComments(state, action) {
            return {...state, comments: action.payload}
        },
        setLoading(state, action) {
            return {...state, loading: action.payload}
        },
        addCommentAC(state,action){
            return {...state, comments: [...state.comments,action.payload]}
        }
    }
})
export const {setComments, setLoading,addCommentAC} = reducer.actions

export const getComments = createAsyncThunk('GET_COMMENTS',
    async (id, {dispatch}) => {
        dispatch(setLoading(true))
        const response = await api.getComments(id);
        if (isWrong(response)) return
        dispatch(setComments(response.data.data))
        dispatch(setLoading(false))
    }
)
export const addComment = createAsyncThunk('ADD_COMMENT',
    async (data, {dispatch}) => {
        const response = await api.addComment(data)
        if (isWrong(response)) return
        dispatch(addCommentAC(response.data.data))
    }
)

export default reducer.reducer