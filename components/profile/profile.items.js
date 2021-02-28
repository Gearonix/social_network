import {
    AddPostContainer,
    ArrowLeft,
    BackgroundImage, ChosenBlock,
    FollowButtonContainer,
    FriendImage,
    FriendName,
    FriendsBlock,
    FriendsContainer,
    FriendsItem,
    FriendsTitle, ItemHwoLikePost, PeopleWhoLikePost,
    Post,
    PostDate,
    PostHeader,
    PostHeaderContainer,
    PostImage,
    PostInput, PostMessage,
    PostOthers,
    PostTitle,
    PostUserImage,
    UserImageStyle
} from "./profile.styles";
import {View} from "react-native";
import {Button, Margin0Auto, Text} from "../../global/styles";
import {AntDesign, Feather} from "@expo/vector-icons";
import React from "react";

export const Background = () => {
    return <><BackgroundImage source={require('./../../source/background_profile.png')}/>
        <BackgroundImage as={View}>
            <ArrowLeft>
                <CreateIcon icon={'arrowleft'}/>
            </ArrowLeft>
        </BackgroundImage></>
}

export const EditProfile = () => {
    return  <Margin0Auto>
        <Button background={'#525252'} width={'193px'} height={'38px'}
                border={'2px solid white'}>
            <Text>Edit profile</Text>
        </Button>
    </Margin0Auto>
}

export const FollowButtons = () => {
    return  <Margin0Auto mt={'22px'} mb={'19px'}>
        <FollowButtonContainer>
            <Button background={'#5458F7'} width={'110px'} height={'32px'}>
                <Text>Follow</Text>
            </Button>
            <Button width={'50px'} height={'32px'}
                    background={'#525252'}>
                <Feather name="message-circle" size={20} color="white" /></Button>
        </FollowButtonContainer>
    </Margin0Auto>
}

export const UserImage = () => {
    return  <Margin0Auto mt={'60px'}>
        <View
            style={{
                width: 120,
                height: 120,
                borderTopLeftRadius: 360,
                borderTopRightRadius: 360,
                borderBottomLeftRadius: 360,
                borderBottomRightRadius: 360,
                overflow: 'hidden'
            }}
        >
            <UserImageStyle source={require('./../../source/user_image.jpg')}/>
        </View>
    </Margin0Auto>
}
export const Friends = ({data}) => {
    const renderItem = (item) => {
        return <FriendsItem key={item.user_id}>
        <FriendImage source={item.user_image}/>
        <FriendName>{item.user_name}</FriendName>
        </FriendsItem>
    }
    const elements = data.map(item => renderItem(item))

    return <FriendsBlock>
        <FriendsTitle>Friends</FriendsTitle>
        <FriendsContainer horizontal={true}>
            {elements}
        </FriendsContainer>
    </FriendsBlock>
}
export const AddPostInput = () => {
    return <AddPostContainer>
        <Button background={'#5458F7'} width={'40px'} height={'40px'}>
            <Feather name="image" size={24} color="white" />
        </Button>
        <PostInput placeholder={'Add post...'} placeholderTextColor={'#999999'}>
            <Text color={'#999'}>Add post...</Text>
        </PostInput>
        {/*<AntDesign name="arrowright" size={24} color="black" />*/}
        <CreateIcon icon={'arrowright'} />
    </AddPostContainer>
}
export const Posts = () => {
    const people = [require('./../../source/user_image.jpg'),
        require('./../../source/user_image.jpg'),require('./../../source/user_image.jpg'),
        require('./../../source/user_image.jpg')].map(item => <ItemHwoLikePost source={item} />)
    return <Post>
        <PostHeader>
            <PostUserImage source={require('./../../source/user_image.jpg')} />
            <PostHeaderContainer>
                <PostTitle>Jerome</PostTitle>
                <PostDate>12 April 2019 at 10:47 AM</PostDate>
            </PostHeaderContainer>
            <PostOthers><CreateIcon icon={'arrowdown'} /></PostOthers>
        </PostHeader>
        <PostImage source={require('./../../source/post_image.jpg')}/>
        <PostMessage>Did Procreate change illustration?</PostMessage>
        <PostDate>12 April 2019 at 10:47 AM</PostDate>
        <ChosenBlock>
            <PeopleWhoLikePost>
                {people}
            </PeopleWhoLikePost>
        </ChosenBlock>
    </Post>
}

const posts_data = [
    {
        user_id : 'ewqlkeqwe',
        user_name : 'Jerome shared event',
        date : '12 April 2019 at 10:47 AM',
        images : [require('./../../source/user_image.jpg'),require('./../../source/user_image.jpg')],
        likes : 9,
        liked : false,
        comments: 12,
        chosen : true,
        message : 'Did Procreate change illustration?'
    }
]


const CreateIcon = ({icon}) => <AntDesign name={icon} size={24} color="white" />