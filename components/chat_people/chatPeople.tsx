import * as React from 'react';
import {Container, Page} from "../../global/styles";
import Navbar from "../others/navbar/navbar";
import {FoundUser, Inp} from "../search/search";
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {StateType} from "../../store";

const ChatPeople = ({navigation}) => {
    const nav = navigation.navigate
    const rooms = useSelector((state : StateType) => state.messages.rooms);
    const current_user_id = useSelector((state : StateType) => state.login.user_id)
    const dispatch = useDispatch();
    const renderItem = item => {
        const {username,description,avatar_path} = item.users.filter(user => user.user_id!==current_user_id)[0]
        return <FoundUser
            username={username} callback={() => nav('Chat',
            {room_data : item})} description={description ?? ''} avatar_path={avatar_path} />
    }
    return <Page>
        <Container>
            <Inp />
            {rooms.map(renderItem)}
        </Container>
        <Navbar navigate={nav}/>
    </Page>
}



export default ChatPeople