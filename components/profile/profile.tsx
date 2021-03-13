import * as React from 'react'
import {Container, NoneBlock, Page} from "../../global/styles";
import {
    AddPostInput,
    Background,
    EditProfile,
    FollowButtons,
    FollowersC,
    Friends,
    Posts,
    UserImage
} from "./profile.items";
import {Description, UserName} from "./profile.styles";
import Navbar from "../others/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {changeImage, UploadImage} from "../../reducers/login_reducer";
import {ActionSheetIOS, Platform} from "react-native";
import {clearCurrent, follow, unfollow} from "../../reducers/users_reducer";
import socket from "../../socket";
import AddPost from "../add_post/add_post";
import {ForbiddenWeb, write} from "../../tools";
import {Text} from 'react-native';
import {setMessages, addMessage, setRooms,addRoom} from './../../reducers/messages_reducer'
import {useEffect} from "react";

const Profile = ({navigation}) => {
    const isOtherUser = navigation.state.params?.CURRENT_USER
    const {
        background_path, user_id, avatar_path, username, followers_count,
        description, subscribed, posts
    } = useSelector((state) => isOtherUser ? state.users.current : state.login)
    const current_user_id = useSelector(state => state.login.user_id)
    const nav = navigation.navigate
    const [online, setOnline] = React.useState(true)
    const [addPost, showPost] = React.useState(false)
    const dispatch = useDispatch()
    if (!isOtherUser) {
        //@ts-ignore
        dispatch(clearCurrent())
    }
    React.useEffect(() => {
        if (!current_user_id) {
            nav('Login', {MODE: 'LOGIN'})
            return
        }
        // nav('Chat')
        socket.on('get_rooms', (data: Array<any>) => {
            dispatch(setRooms(data))
        })
        socket.on('enter_room',data => {
            dispatch(addRoom(data.room))
        })
        socket.emit('ONLINE', {user_id: current_user_id})
    }, [current_user_id])
    //@ts-ignore
    React.useEffect(() => {
        if (user_id !== current_user_id) {
            socket.on('user', ({online}) => {
                setOnline(online)
            })
            socket.emit('follow_user', {user_id})
            return () => socket.emit('unfollow_user', {user_id})
        }
    }, [user_id])
    const imageConfig = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    }
    const pickImage = async (mode: string, callback: Function, isDelete: boolean) => {
        const data = {user_id: current_user_id, old_file_name: avatar_path, mode, filename: null, callback}
        if (isDelete) {
            dispatch(changeImage(data))
            return
        }
        //@ts-ignore
        const result = await ImagePicker.launchImageLibraryAsync(imageConfig);
        const {payload: filename} = await dispatch(UploadImage({file: result, mode}))
        data.filename = filename
        dispatch(changeImage(data))

    };
    //todo : add preloader
    const openActionSheet = Platform.OS !== 'web' ? (mode, callback, actionOptions = ["Cancel", "Change photo", "Delete photo"]) =>
        ActionSheetIOS.showActionSheetWithOptions({
            options: actionOptions, cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
        }, index => {
            console.log(callback)
            switch (index) {
                case 1:
                    pickImage(mode, callback, false);
                    break;
                case 2:
                    pickImage(mode, callback, true);
                    break;
            }
        }) : ForbiddenWeb
    const followOrUnfollow = subscribed ? unfollow : follow
    //
    const enterRoom = () => {
        // socket.emit('init_room',{user_id : current_user_id,receiver_id : user_id})
    }
    if (!user_id) return <></>
    return <Page>
        <Container>
            <Background image={background_path} nav={nav} isOther={isOtherUser}/>
            <UserImage image={avatar_path} username={username}
                       callback={isOtherUser ? () => {
                       } : openActionSheet} isOnline={online}/>
            <UserName>{username}</UserName>
            <FollowersC count={followers_count} callback={() => nav('Followers', {CURRENT_USER: isOtherUser})}/>
            <Description iou={isOtherUser}>{description}</Description>
            {isOtherUser && <FollowButtons enterRoom={enterRoom}
                callback={() => dispatch(followOrUnfollow({user_id: current_user_id, follow_to: user_id}))}
                subscribed={subscribed}/>}
            {!isOtherUser && <EditProfile callback={() => nav('EditProfileSettings',
                {userAvatarCallback: openActionSheet})}/>}
            <Friends data={friends_data}/>
            <AddPostInput callback={Platform.OS === 'web' ? ForbiddenWeb : () => showPost(true)}/>
            <Posts data={posts} nav={nav} isOther={isOtherUser} current_user_id={current_user_id}/>
            <NoneBlock/>
        </Container>
        <Navbar navigate={nav}/>
        <AddPost isOpen={addPost} qclose={() => showPost(false)}/>
    </Page>
}

const ChatHeader = () => {
    //header for chat component lmao

    // return
}

const friends_data = [
    {
        user_id: 'sfsdfsdlkj',
        user_name: 'hello',
        user_image: require('./../../source/user_image.jpg')
    },
    {
        user_id: '123123123',
        user_name: 'hello',
        user_image: require('./../../source/user_image.jpg')
    },
    {
        user_id: 'gfdgdgdfgfdg',
        user_name: 'hello',
        user_image: require('./../../source/user_image.jpg')
    },
    {
        user_id: 'sfddqewqeqw',
        user_name: 'hello',
        user_image: require('./../../source/user_image.jpg')
    }
]

export default Profile