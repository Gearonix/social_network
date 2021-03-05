import {
    AddPostContainer,
    ArrowLeft,
    BackgroundImage,
    ChosenBlock,
    FollowButtonContainer,
    FriendImage,
    FriendName,
    FriendsBlock,
    FriendsContainer,
    FriendsItem,
    FriendsTitle,
    CircleButton,
    PostLikesText,
    LikesAndComments,
    PeopleWhoLikePost,
    Post,
    PostDate,
    PostHeader,
    PostHeaderContainer,
    PostImage,
    PostInput,
    PostMessage,
    PostOthers,
    PostTitle,
    PostUserImage,
    UnderLine,
    UserImageStyle,
    UserImageContainer,
    UserText,
    DefaultBackground,
    FollowersCountContainer,
    FollowersCount,
    OnlineCircle, ItemHwoLikePost
} from "./profile.styles";

import {View} from "react-native";
import {Button, Flex, Margin0Auto, Text} from "../../global/styles";
import {AntDesign, Feather} from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import config from "../../config___";
import {randomInteger, sortByDate} from "../../tools";
import {changeUseraAvatarAC, LikePost as LikeLogin, UnLikePost as UnLikeLogin} from "../../reducers/login_reducer";
import {
    LikePost,
    likePostAC as likeUsers,
    UnLikePost,
    unlikePostAC as unlikeUsers
} from './../../reducers/users_reducer'
import {UserImage as UserMainImage} from "../comments/comments";
import {useDispatch} from "react-redux";

export const Background = ({image, nav, isOther}) => {
    const path = `${config.BASE_URL}/backgrounds/${image}`
    const element = image ? <BackgroundImage source={{uri: path}}/> : <DefaultBackground as={View}/>
    return <>{element}
        <BackgroundImage as={View}>
            {isOther && <ArrowLeft onPress={() => nav('Search')}>
                <CreateIcon icon={'arrowleft'}/>
            </ArrowLeft>}
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

export const FollowersC = ({count, callback}) => {
    return <FollowersCountContainer onPress={count !== 0 ? callback : () => {
    }}>
        <FollowersCount count={count}>
            {count} followers</FollowersCount>
    </FollowersCountContainer>
}

export const FollowButtons = ({callback, subscribed}) => {
    return <Margin0Auto mt={'22px'} mb={'19px'}>
        <FollowButtonContainer>
            <Button background={'#5458F7'} width={'110px'} height={'32px'} onPress={callback}>
                <Text>{!subscribed ? 'Follow' : 'Unfollow'}</Text>
            </Button>
            <Button width={'50px'} height={'32px'}
                    background={'#525252'}>
                <Feather name="message-circle" size={20} color="white"/></Button>
        </FollowButtonContainer>
    </Margin0Auto>
}

export const UserImage = ({username, callback, image, isOnline}) => {
    const src = `${config.BASE_URL}/user_avatars/${image}`
    const avatar = image ?
        <UserImageStyle source={{uri: src}}/> :
        <DefaultUserAvatar text={username ?? 'User'} callback={() => callback('user_avatars',
            changeUseraAvatarAC)}
                           size={'120px'} textSize={'50px'}/>
    return <Margin0Auto mt={'60px'}>
        <UserImageContainer onPress={() => callback('user_avatars',changeUseraAvatarAC)} size={'120px'}>
            {avatar}
            {isOnline && <OnlineCircle/>}
        </UserImageContainer>
    </Margin0Auto>
}
export const DefaultUserAvatar = ({text, callback = () => {}, size, textSize,mt}) => {
    const colors = ['#00d9ff', '#ed77df', '#57eb8b', '#e1eb57', '#f7a120']
    const [color, setColor] = useState(colors[0])
    useEffect(() => {
        setColor(colors[randomInteger(0, colors.length - 1)])
    }, [])
    return <UserImageContainer color={color} onPress={callback} size={size} mt={mt}>
        <UserText size={textSize}>{text.slice(0, 2)}</UserText></UserImageContainer>
}
//e
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
export const AddPostInput = ({callback}) => {
    // ImageBrowser
    return <AddPostContainer onPress={callback}>
        <Button background={'#5458F7'} width={'40px'} height={'40px'}>
            <Feather name="image" size={24} color="white"/>
        </Button>
        <PostInput placeholder={'Add post...'} placeholderTextColor={'#999999'}
                   onPress={callback}>
            <Text color={'#999'}>Add post...</Text>
        </PostInput>
        {/*<AntDesign name="arrowright" size={24} color="black" />*/}
        <CreateIcon icon={'arrowright'}/>
    </AddPostContainer>
}
export const Posts = ({data,nav,isOther,current_user_id}) => {
    const elements = [...data].sort(sortByDate).map((item, index) => <PostItem data={item} key={index}
    nav={nav} current_user_id={current_user_id}
                                                                               isOther={isOther} />)
    return <>
        {elements}
    </>
}

const PostItem = ({data,nav,current_user_id,isOther}) => {
    //todo : THIS
    const {creator_id :user_id, creator_name, full_date, message,creator_avatar_path:user_image,
        image_path : image,comments,liked,_id : post_id} = data
    const dispatch = useDispatch()
    const navToLikes = () => nav('LikedPeople',{CURRENT_USER : isOther,data : liked})
    const isLiked = liked.findIndex(item => item.user_id===current_user_id)!==-1
    const likeCallback = isOther ? isLiked ? () => dispatch(UnLikePost({post_id,user_id: current_user_id})) :
        () => dispatch(LikePost(post_id)) : () => alert('You can\'t like yourself')
    const likedPeople = liked.map((item,index) => <UserMainImage size={'32px'} textSize={'14px'}
    image={item.avatar_path} directory={'user_avatars'} username={item.username}
    AvatarComponent={ItemHwoLikePost} mt={'5px'} callback={navToLikes} key={index}/>)
    return <Post>
        <PostHeader>
            <UserMainImage size='60px' textSize='23px' image={user_image} directory='user_avatars'
                                   username={creator_name} AvatarComponent={PostUserImage} />
            {/*<PostUserImage source={{uri : `${config.BASE_URL}/user_avatars/${user_image}`}}/>*/}
            <PostHeaderContainer>
                <PostTitle>{creator_name}</PostTitle>
                <PostDate>{`${full_date?.date} at ${full_date?.time}`}</PostDate>
            </PostHeaderContainer>
            <PostOthers><CreateIcon icon={'arrowdown'}/></PostOthers>
        </PostHeader>
        <PostImage source={{uri : `${config.BASE_URL}/post_images/${image}`}} />
        <PostMessage>{message}</PostMessage>
        <PostDate>{`${full_date?.date} at ${full_date?.time}`}</PostDate>
        <ChosenBlock>
            <Flex jc={'space-between'} ai={'center'}>
                <PeopleWhoLikePost onPress={navToLikes}>
                    {likedPeople}
                </PeopleWhoLikePost>
                <CreateIcon icon={'hearto'} style={{marginRight: 16}} color={false && 'red'}/>
            </Flex>
            <UnderLine/>
            <LikesAndComments>
                <CircleButton liked={isLiked} onPress={likeCallback} >
                    <CreateIcon icon={'like2'} />
                </CircleButton>
                <PostLikesText liked={isLiked}>{liked.length}</PostLikesText>
                <CircleButton style={{marginLeft: 24}} onPress={() => nav('Comments',{id : post_id,isOther})}>
                    <Feather name="message-circle" size={22} color="white"/>
                </CircleButton>
                <PostLikesText liked={false}>{comments}</PostLikesText>
                <CircleButton style={{marginLeft: 77}}><Feather name="share" size={22} color="white"/></CircleButton>
            </LikesAndComments>
        </ChosenBlock>
    </Post>
}
const CreateIcon = ({icon, color}) => <AntDesign name={icon} size={24} color={color ?? 'white'}/>