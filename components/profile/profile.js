import React,{useEffect} from 'react'
import {Text, Container, Page} from "../../global/styles";
import {AddPostInput, Background, EditProfile, FollowButtons, Friends, Posts, UserImage} from "./profile.items";
import {Description, FollowersCount, UserName} from "./profile.styles";
import Navbar from "../others/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {changeUserAvatar} from "../../reducers/login_reducer";
import {ActionSheetIOS, Platform} from "react-native";

const Profile = ({navigation}) => {
    const {background_path,user_id,avatar_path,username,followers_count,
        description} = useSelector((state) => state.login)
    useEffect(() => {
        if (!user_id) navigation.navigate('Login',{MODE : 'LOGIN'})
    },[])
    const imageConfig = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    }
    const dispatch = useDispatch()
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
    if (!user_id) return <></>
    return <Page>
        <Container>
        <Background image={background_path}/>
        <UserImage image={avatar_path} username={username} callback={openActionSheet} />
        <UserName>{username}</UserName>
        <FollowersCount>{followers_count} followers</FollowersCount>
        <Description>{description}</Description>
        <FollowButtons />
        <EditProfile callback={() => navigation.navigate('EditProfileSettings',{userAvatarCallback : openActionSheet})}/>
        <Friends data={friends_data}/>
        <AddPostInput />
        <Posts />
        </Container>
        <Navbar navigate={navigation.navigate}/>
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