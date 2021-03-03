import React,{useEffect} from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getFollowers, getUser, setFollowers} from "../../reducers/users_reducer";
import {
    AvaContainer,
    Avatar,
    Button,
    ButtonText,
    FollowersContainer,
    NoneUser,
    User,
    UserName
} from "./followers.styles";
import {FullContainer} from "../../global/styles";
import {splitArr, write} from "../../tools";
import config from "../../config_";
import {DefaultUserAvatar} from "../profile/profile.items";

const Followers = ({navigation}) => {
    const dispatch = useDispatch()
    const isOtherUser = navigation.state.params.CURRENT_USER
    const user_id = useSelector(state => isOtherUser ? state.users.current.user_id : state.login.user_id)
    const current_user_id = useSelector(state => state.login.user_id)
    const {followers,followers_loading:isLoading} =useSelector(state => state.users)
    useEffect(() => {
        dispatch(getFollowers(user_id))
        return () => dispatch(setFollowers([]))
    },[])
    if (isLoading) return <></>
    const nav = (id) => async () => {
        await dispatch(getUser({id,current_user_id}))
        navigation.navigate('Profile',{CURRENT_USER: true})
    }
    // NoneUser
    const elements = followers.map(item => <Follower data={item} callback={nav(item.subscriber)}
    destroy={item.subscriber === current_user_id}/>)
    if (followers.length%2!==0) elements.push(<NoneUser />)
    return <FullContainer>
        <FollowersContainer>
            {elements}
        </FollowersContainer>

    </FullContainer>
}

const Follower = ({data,callback,destroy}) => {
    const {username,avatar_path} = data
    const image =  avatar_path ? <Avatar source={{uri : `${config.BASE_URL}/user_avatars/${avatar_path}`}}/>
    : <DefaultUserAvatar text={username} size={'60px'} textSize={'30px'} />
    return <User>
        <AvaContainer>{image}</AvaContainer>
        <UserName>{username}</UserName>
        <Button onPress={callback} disabled={destroy} destroy={destroy}
        ><ButtonText>Show profile</ButtonText></Button>
    </User>
}


export default Followers