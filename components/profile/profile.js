import React,{useEffect} from 'react'
import {Text, Container, Page} from "../../global/styles";
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
import {Description, FollowersCount, FollowersCountContainer, UserName} from "./profile.styles";
import Navbar from "../others/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {changeUserAvatar} from "../../reducers/login_reducer";
import {ActionSheetIOS, Platform} from "react-native";
import {clearCurrent, follow, unfollow} from "../../reducers/users_reducer";
import {write} from "../../tools";

const Profile = ({navigation}) => {
    const isOtherUser = navigation.state.params?.CURRENT_USER
    const {background_path,user_id,avatar_path,username,followers_count,
        description,subscribed} = useSelector((state) => isOtherUser ? state.users.current : state.login)
    const current_user_id = useSelector(state => state.login.user_id)
    const nav = navigation.navigate
    write('other',isOtherUser)
    const dispatch = useDispatch()
    if (!isOtherUser){
        dispatch(clearCurrent())
    }
    useEffect(() => {
        if (!user_id) nav('Login',{MODE : 'LOGIN'})
    },[])
    const imageConfig = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    }
    const pickImage = async (mode,isDelete) => {
        if (isDelete){
            dispatch(changeUserAvatar({result : null,user_id,avatar_path,mode}))
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync(imageConfig);
        dispatch(changeUserAvatar({result,user_id,avatar_path,mode}))
    };
    //todo : add preloader
    const openActionSheet = Platform.OS!=='web' ? (mode,actionOptions =  ["Cancel","Change photo", "Delete photo"]) =>
        ActionSheetIOS.showActionSheetWithOptions({
            options: actionOptions, cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
        }, index => {
            const callback = index===1 ? () => pickImage(mode) : () => pickImage(mode,true)
            callback()
        }) : () => alert('Forbidden for web devices.')
    const followOrUnfollow  = subscribed ? unfollow : follow
    //
    if (!user_id) return <></>
    return <Page>
        <Container>
        <Background image={background_path} nav={navigation}/>
        <UserImage image={avatar_path} username={username} callback={isOtherUser ? ()=>{} : openActionSheet} />
        <UserName>{username}</UserName>
        <FollowersC count={followers_count} callback={() => nav('Followers',{CURRENT_USER : isOtherUser})} />
        <Description iou={isOtherUser}>{description}</Description>
        {isOtherUser && <FollowButtons
            callback={() => dispatch(followOrUnfollow({user_id : current_user_id,follow_to: user_id }))}
            subscribed={subscribed}/>}
            {!isOtherUser && <EditProfile callback={() => nav('EditProfileSettings',
            {userAvatarCallback : openActionSheet})} />}
        <Friends data={friends_data}/>
        <AddPostInput />
        <Posts />
        </Container>
        <Navbar navigate={nav}/>
    </Page>
}




const friends_data =  [
    {
        user_id : 'sfsdfsdlkj',
        user_name : 'hello',
        user_image : require('./../../source/user_image.jpg')
    },
    {
        user_id : '123123123',
        user_name : 'hello',
        user_image : require('./../../source/user_image.jpg')
    },
    {
        user_id : 'gfdgdgdfgfdg',
        user_name : 'hello',
        user_image : require('./../../source/user_image.jpg')
    },
    {
        user_id : 'sfddqewqeqw',
        user_name : 'hello',
        user_image : require('./../../source/user_image.jpg')
    }
]


export default Profile