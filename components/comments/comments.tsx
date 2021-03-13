import * as React from 'react';
import {Container, Page} from "../../global/styles";
import {
    Avatar, AvatarContainer,
    Date, IconContainer,
    Input,
    InputAvatar,
    InputBlock,
    InputContainer,
    Main,
    MessageText as Message, PageComments,
    Test,
    UserData,
    UserName
} from "./comments.styles";
import {addComment, getComments, setComments} from "../../reducers/comments_reducer";
import {useDispatch, useSelector} from "react-redux";
import {DefaultUserAvatar} from "../profile/profile.items";
import config from "../../config";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Ionicons} from '@expo/vector-icons';
import {getUser, setCommentsCount as commentCountUsers} from "../../reducers/users_reducer";
import {setCommentsCount as commentsCountlogin} from "../../reducers/login_reducer";
import {nor} from "../../types";

const Comments = ({navigation}) => {
    const {useEffect,useState} = React
    const [message, setMessage] = useState('')
    const post_id = navigation.state?.params?.id
    const isOtherUser = navigation.state?.params?.isOther
    const {avatar_path, username, user_id} = useSelector(state => state.login)
    const dispatch = useDispatch();
    const {loading, comments} = useSelector(state => state.comments)
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
        await dispatch(getUser({id, current_user_id : user_id}))
        navigation.navigate('Profile', {CURRENT_USER: true})
    }
    const elements = comments.map(item => <Comment data={item} callback={navigate(item.user_id)}/>)
    elements.push(<Main />)
//
    return <Test><KeyboardAwareScrollView><Page>
        <Container>
            {elements}
        </Container>
        <Inp callback={text => setMessage(text)} image={avatar_path} username={username}
             onSend={onSend} value={message}/>
    </Page></KeyboardAwareScrollView></Test>
}
type InpType = {username : string ,image : string| null,onSend : Function,value : string,callback : Function}
export const Inp = ({username,image,callback,onSend,value} : InpType) => {
    return <InputBlock>
        <UserImage size={'30px'} textSize={'14px'} image={image} directory={'user_avatars'}
                   username={username} AvatarComponent={InputAvatar} />
        <InputContainer>
            <Input placeholder={'Write message...'} placeholderTextColor={"#9B9B9B"}
                   style={{outline : 'none'}} onChangeText={callback}
                   value={value}/>
            {value.length>0 && <IconContainer onPress={onSend}>
                <Ionicons name="send" size={24} color="#2FC3F1" />
            </IconContainer>}
        </InputContainer>
    </InputBlock>
}

type CommentType = {data : any , callback : Function}

const Comment = ({data, callback}  :CommentType) => {
    const {message, user_id, username, avatar_path, time} = data
    return <Main>
        <UserImage size={'44px'} textSize={'15px'} image={avatar_path} directory={'user_avatars'}
                   username={username} AvatarComponent={({source,onPress}) => <AvatarContainer
            onPress={onPress}>
            <Avatar source={{uri : source.uri}}/>
            {/*@ts-ignore*/}
        </AvatarContainer>} callback={callback}/>
        <UserData>
            <UserName onPress={callback}>{username}</UserName>
            <Message>{message}</Message>
        </UserData>
        <Date>{time}</Date>
    </Main>
}
type UserImageT = {
    size : string
    textSize : string,
    image : null | string
    directory : string,
    callback?: Function
    username : string,
    AvatarComponent : any
    mt?: null | string
}

export const UserImage = ({
                       size, textSize, image, directory, callback = () => {
    }, username, AvatarComponent ,mt='0px'
                   } : UserImageT) => {
    const src = `${config.BASE_URL}/${directory}/${image}`
    const avatar = image ?
        <AvatarComponent source={{uri: src}} onPress={callback}/> :
        <DefaultUserAvatar text={username ?? 'User'} callback={callback} size={size} textSize={textSize}
                           mt={mt}
        />
    return avatar
}

export default Comments