import React, {useEffect, useState} from 'react';
import {Container, Page} from "../../global/styles";
import {
    Avatar, AvatarContainer,
    Date, IconContainer,
    Input,
    InputAvatar,
    InputBlock,
    InputContainer,
    Main,
    Message, PageComments,
    Test,
    UserData,
    UserName
} from "./comments.styles";
import {addComment, getComments, setComments} from "../../reducers/comments_reducer";
import {useDispatch, useSelector} from "react-redux";
import {DefaultUserAvatar} from "../profile/profile.items";
import config from "../../config___";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Ionicons} from '@expo/vector-icons';
import {getUser, setCommentsCount as commentCountUsers} from "../../reducers/users_reducer";
import Navbar from "../others/navbar/navbar";
import {setCommentsCount as commentsCountlogin} from "../../reducers/login_reducer";

const Comments = ({navigation}) => {
    const [message, setMessage] = useState('')
    const post_id = navigation.state?.params?.id
    const isOtherUser = navigation.state?.params?.isOther
    const {avatar_path, username, user_id} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {loading, comments} = useSelector(state => state.comments)
    console.log(isOtherUser)
    useEffect(() => {
        dispatch(getComments(post_id))
        return () => dispatch(setComments([]))
    }, [])
    if (loading) return <Page/>
    const onSend = () => {
        dispatch(addComment({message, user_id, avatar_path, post_id, username}))
        const callback = !isOtherUser ? commentsCountlogin : commentCountUsers
        dispatch(callback(post_id))
        setMessage('')
    }
    const navigate = (id) => async () => {
        await dispatch(getUser({id, user_id}))
        navigation.navigate('Profile', {CURRENT_USER: true})
    }
    const elements = comments.map(item => <Comment data={item} callback={navigate(item.user_id)}/>)
    elements.push(<Main />)
//
    return <Test><KeyboardAwareScrollView><Page>
        <Container>
            {elements}
        </Container>
        <InputBlock>
            <UserImage size={'30px'} textSize={'14px'} image={avatar_path} directory={'user_avatars'}
                       username={username} AvatarComponent={InputAvatar} />
            <InputContainer>
                <Input placeholder={'Write message...'} placeholderTextColor={"#9B9B9B"}
                       style={{outline : 'none'}} onChangeText={text => setMessage(text)}
                       value={message}/>
                {message.length>0 && <IconContainer onPress={onSend}>
                    <Ionicons name="send" size={24} color="#2FC3F1" />
                </IconContainer>}
            </InputContainer>
        </InputBlock>
    </Page></KeyboardAwareScrollView></Test>
}


const Comment = ({data, callback}) => {
    const {message, user_id, username, avatar_path, time} = data
    return <Main>
        <UserImage size={'44px'} textSize={'15px'} image={avatar_path} directory={'user_avatars'}
                   username={username} AvatarComponent={({source,onPress}) => <AvatarContainer
            onPress={onPress}>
            <Avatar source={{uri : source.uri}}/>
        </AvatarContainer>} callback={callback}/>
        <UserData>
            <UserName onPress={callback}>{username}</UserName>
            <Message>{message}</Message>
        </UserData>
        <Date>{time}</Date>
    </Main>
}
export const UserImage = ({
                       size, textSize, image, directory, callback = () => {
    }, username, AvatarComponent ,mt
                   }) => {
    const src = `${config.BASE_URL}/${directory}/${image}`
    const avatar = image ?
        <AvatarComponent source={{uri: src}} onPress={callback}/> :
        <DefaultUserAvatar text={username ?? 'User'} callback={callback} size={size} textSize={textSize}
                           mt={mt}
        />
    return avatar
}

export default Comments