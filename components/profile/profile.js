import React from 'react'
import {Text,Container} from "../../global/styles";
import {AddPostInput, Background, EditProfile, FollowButtons, Friends, Posts, UserImage} from "./profile.items";
import {FollowersCount, UserName} from "./profile.styles";

const Profile = () => {
    return <Container>
        <Background />
        <UserImage />
        <UserName>Tyler, The Creator</UserName>
        <FollowersCount>1.2M followers</FollowersCount>
        <FollowButtons />
        <EditProfile />
        <Friends data={friends_data}/>
        <AddPostInput />
        <Posts />
    </Container>
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