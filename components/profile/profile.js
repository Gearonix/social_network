import React,{useEffect} from 'react'
import {Text, Container, Page} from "../../global/styles";
import {AddPostInput, Background, EditProfile, FollowButtons, Friends, Posts, UserImage} from "./profile.items";
import {FollowersCount, UserName} from "./profile.styles";
import Navbar from "../others/navbar/navbar";
import {useSelector} from "react-redux";

const Profile = ({navigation}) => {
    const {background_path,user_id,avatar_path,username,followers_count} = useSelector((state) => state.login)
    useEffect(() => {
        if (!user_id) navigation.navigate('Login',{MODE : 'LOGIN'})
    },[])
    if (!user_id) return <></>
    return <Page>
        <Container>
        <Background image={background_path}/>
        <UserImage image={avatar_path} username={username}/>
        <UserName>{username}</UserName>
        <FollowersCount>{followers_count} followers</FollowersCount>
        <FollowButtons />
        <EditProfile />
        <Friends data={friends_data}/>
        <AddPostInput />
        <Posts />
        </Container>
        <Navbar />
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