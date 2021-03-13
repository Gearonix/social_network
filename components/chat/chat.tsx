import * as React from 'react';
import {Container, Flex, Page, Text,} from "../../global/styles";
import {Main as NoneBlock, MessageText, Test, UserName} from "../comments/comments.styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Inp, UserImage as UserMainImage} from "../comments/comments";
import {useSelector} from "react-redux";
import {MessageMain,Image, CheckedC, TimeText} from "./chat.styles";
import socket from './../../socket'
import {useEffect,useState} from "react";
import {useDispatch} from 'react-redux'
import {getTime, write } from '../../tools';
import {getMessages,addMessage, setRead} from "../../reducers/messages_reducer";
import {StateType} from "../../store";
import {PostHeader, PostUserImage} from "../profile/profile.styles";
import { Ionicons } from '@expo/vector-icons';

const Chat = ({navigation}) => {
    const [message,setMessage] = useState('')
    const room_id = navigation.state?.params?.room_data._id;
    const dispatch = useDispatch()
    const {username,avatar_path,user_id} = useSelector(state => state.login)
    const messages = useSelector((state : StateType) => state.messages.messages)
    const onSend = () => {
        const data = {user_id,message,room_id,username,avatar_path,read : false,time : getTime()}
        dispatch(addMessage(data));
        socket.emit('send_message',data)
        setMessage('')
    }
    // @ts-ignore
    useEffect(() => {
        const addMessageWithRead = data => {
            socket.emit('set_read',{user_id,room_id})
            dispatch(addMessage(data))
        }
        socket.on('add_message',addMessageWithRead)
        socket.on('get_read',user_id => {
            dispatch(setRead({user_id,room_id}))
        })
        socket.emit('set_read',{user_id,room_id})
        dispatch(getMessages(room_id))
        return () => socket.off('add_message',addMessageWithRead)
    },[])
    const elements = messages.map(item => <Message username={item.username} message={item.message}
                                                   avatar_path={item.avatar_path} isMine={item.user_id===user_id}
                                                   isRead={item.read} time={item.time}  />)
    elements.push(<NoneBlock />)
    return <Test>
        <KeyboardAwareScrollView>
            <Page>
            <Container>
                {elements}
            </Container>
            <Inp callback={text => setMessage(text)} onSend={onSend}
                 username={username} image={avatar_path} value={message}  />
        </Page></KeyboardAwareScrollView>
    </Test>
}
const Message = ({username,message,avatar_path,isMine,isRead,time}) => {
    const checkMark = isRead ? <Ionicons name="checkmark-done" size={24} color="#B5F6FF" /> :
        <Ionicons name="checkmark-outline" size={24} color="#D6D6D6" />
    return <Flex ml={!isMine ? '12px' : '38px'} >
        <UserMainImage size='43px' textSize='22px' image={avatar_path} directory='user_avatars'
                       username={username} AvatarComponent={Image} mt={'24px'} />
        <MessageMain isMine={isMine}>
        <UserName>{username}</UserName>
        <MessageText>{message}</MessageText>
        {isMine && <CheckedC>{checkMark}</CheckedC>}
        <TimeText>{time}</TimeText>
    </MessageMain></Flex>
}


export default Chat