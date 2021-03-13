import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";
import {isWrong} from "../tools";
import {actionType, messagesType} from './../types'
import API from "../api";

const initialState: messagesType = {
    messages: [],
    rooms: []
}

const reducer = createSlice({
    name: 'MESSAGES',
    initialState,
    reducers: {
        setMessages(state, action : actionType<Array<any>>) {
            return {...state, messages: action.payload}
        },
        addMessage(state, action) {
            return {...state, messages: [...state.messages, action.payload]}
        },
        setRooms(state, action: actionType<Array<any>>) {
            return {...state, rooms: action.payload}
        },
        addRoom(state,action){
            return {...state, rooms : [...state.rooms,action.payload]}
        },
        setRead(state,action : actionType<{ room_id : string,user_id : string }>){
            const {room_id, user_id} = action.payload
            return {...state,messages : state.messages.map(item => item.room_id===room_id &&
                    item.user_id!==user_id ? {...item,read : true} : item)}
        }
    }
})
export const {setRead,addRoom,setMessages, addMessage, setRooms} = reducer.actions

export const getMessages = createAsyncThunk('GET_MESSAGES',
    async (room_id : string, {dispatch}) => {
        const response = await API.getMessages(room_id);
        dispatch(setMessages(response.data.data))
    }
)

export default reducer.reducer