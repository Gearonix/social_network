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
    FriendsTitle, ItemHwoLikePost, CircleButton, PostLikesText, LikesAndComments, PeopleWhoLikePost,
    Post,
    PostDate,
    PostHeader,
    PostHeaderContainer,
    PostImage,
    PostInput, PostMessage,
    PostOthers,
    PostTitle,
    PostUserImage, UnderLine,
    UserImageStyle, UserImageContainer, UserText, DefaultBackground
} from "./profile.styles";

import {View} from "react-native";
import {Button, Flex, Margin0Auto, Text} from "../../global/styles";
import {AntDesign, Feather} from "@expo/vector-icons";
import React,{useState,useEffect} from "react";
import config from "../../config";
import {ActionSheetIOS,Platform} from "react-native";
import {randomInteger} from "../../tools";

export const Background = ({image}) => {
    const path =  `${config.BASE_URL}/backgrounds/${image}`
    const element = image ? <BackgroundImage source={{uri  : path}}/> : <DefaultBackground as={View} />
    return <>{element}
        <BackgroundImage as={View}>
            <ArrowLeft>
                <CreateIcon icon={'arrowleft'}/>
            </ArrowLeft>
        </BackgroundImage></>
}

export const EditProfile = ({callback}) => {
    return <Margin0Auto>
        <Button background={'#525252'} width={'193px'} height={'38px'}
                border={'2px solid white'}>
            <Text onPress={callback}>Edit profile</Text>
        </Button>
    </Margin0Auto>
}

export const FollowButtons = () => {
    return <Margin0Auto mt={'22px'} mb={'19px'}>
        <FollowButtonContainer>
            <Button background={'#5458F7'} width={'110px'} height={'32px'}>
                <Text>Follow</Text>
            </Button>
            <Button width={'50px'} height={'32px'}
                    background={'#525252'}>
                <Feather name="message-circle" size={20} color="white"/></Button>
        </FollowButtonContainer>
    </Margin0Auto>
}

export const UserImage = ({username, callback,image}) => {
    const src = `${config.BASE_URL}/user_avatars/${image}`
    const avatar = image ?
        <UserImageStyle source={{uri: src}}/> :
        <DefaultUserAvatar text={username ?? 'User'} callback={() => callback('user_avatars')} />
    return <Margin0Auto mt={'60px'}>
        <UserImageContainer onPress={() => callback('user_avatars')}>
            {avatar}
        </UserImageContainer>
    </Margin0Auto>
}
export const DefaultUserAvatar = ({text,callback=()=>{},mini=false})  => {
    const colors = ['#00d9ff', '#ed77df', '#57eb8b', '#e1eb57', '#f7a120']
    const [color,setColor] = useState(colors[0])
    useEffect(() => {
        setColor(colors[randomInteger(0,colors.length-1)])
    },[])
    return <UserImageContainer color={color} onPress={callback} mini={mini}>
        <UserText mini={mini}>{text.slice(0,2)}</UserText></UserImageContainer>
}
// export const DefaultBackground = () =>

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
            <Feather name="image" size={24} color="white"/>
        </Button>
        <PostInput placeholder={'Add post...'} placeholderTextColor={'#999999'}>
            <Text color={'#999'}>Add post...</Text>
        </PostInput>
        {/*<AntDesign name="arrowright" size={24} color="black" />*/}
        <CreateIcon icon={'arrowright'}/>
    </AddPostContainer>
}
export const Posts = () => {
    const elements = posts_data.map((item, index) => <PostItem data={item} key={index}/>)
    return <>
        {elements}
    </>
}

const posts_data = [
    {
        user_id: 'ewqlkeqwe',
        user_name: 'gear shared event',
        date: '16 April 2019 at 10:47 AM',
        images: [require('./../../source/user_image.jpg')],
        likes: 16,
        liked: true,
        comments: 12,
        chosen: true,
        message: 'qwe',
        people: [require('./../../source/user_image.jpg'),
            require('./../../source/user_image.jpg'), require('./../../source/user_image.jpg'),
            require('./../../source/user_image.jpg')]
    }
]
const PostItem = ({data}) => {
    const people = data.people.map(item => <ItemHwoLikePost source={item}/>)
    const images = data.images.map(item => <PostImage source={item}/>)
    const {user_id, user_name, date, likes, liked, comments, chosen, message} = data
    return <Post>
        <PostHeader>
            <PostUserImage source={require('./../../source/user_image.jpg')}/>
            <PostHeaderContainer>
                <PostTitle>{user_name}</PostTitle>
                <PostDate>{date}</PostDate>
            </PostHeaderContainer>
            <PostOthers><CreateIcon icon={'arrowdown'}/></PostOthers>
        </PostHeader>
        {images}
        <PostMessage>{message}</PostMessage>
        <PostDate>{date}</PostDate>
        <ChosenBlock>
            <Flex jc={'space-between'} ai={'center'}>
                <PeopleWhoLikePost>
                    {people}
                </PeopleWhoLikePost>
                <CreateIcon icon={'hearto'} style={{marginRight: 16}} color={chosen && 'red'}/>
            </Flex>
            <UnderLine/>
            <LikesAndComments>
                <CircleButton liked={liked}>
                    <CreateIcon icon={'like2'}/>
                </CircleButton>
                <PostLikesText liked={liked}>{likes}</PostLikesText>
                <CircleButton style={{marginLeft: 24}}>
                    <Feather name="message-circle" size={22} color="white"/>
                </CircleButton>
                <PostLikesText liked={false}>{comments}</PostLikesText>
                <CircleButton style={{marginLeft: 77}}><Feather name="share" size={22} color="white"/></CircleButton>
            </LikesAndComments>
        </ChosenBlock>
    </Post>
}
const CreateIcon = ({icon, color}) => <AntDesign name={icon} size={24} color={color ?? 'white'}/>