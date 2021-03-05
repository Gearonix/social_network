import React, {useEffect} from 'react';
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
import config from "../../config___";
import {DefaultUserAvatar} from "../profile/profile.items";


export const Liked = ({navigation}) => {
    const {CURRENT_USER : isOtherUser,data} = navigation.state.params
    const current_user_id = useSelector(state => state.login.user_id)
    const dispatch = useDispatch()
    const nav = (id) => async () => {
        await dispatch(getUser({id, current_user_id}))
        navigation.navigate('Profile', {CURRENT_USER: true})
    }
    return <Test current_user_id={current_user_id} data={data} callback={nav} item_id={'user_id'} />
}
const Test = ({data,callback,current_user_id,item_id})  => {
    const elements = data.map(item => <Follower data={item} callback={callback(item[item_id])}
                                                     destroy={item[item_id] === current_user_id}/>)
    if (data.length % 2 !== 0) elements.push(<NoneUser/>)
    return <FullContainer>
        <FollowersContainer>
            {elements}
        </FollowersContainer>
    </FullContainer>
}

const FollowersC = ({navigation}) => {
    const dispatch = useDispatch()
    const isOtherUser = navigation.state.params.CURRENT_USER
    const user_id = useSelector(state => isOtherUser ? state.users.current.user_id : state.login.user_id)
    const current_user_id = useSelector(state => state.login.user_id)
    const {followers, followers_loading: isLoading} = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getFollowers(user_id))
        return () => dispatch(setFollowers([]))
    }, [])
    if (isLoading) return <></>
    const nav = (id) => async () => {
        await dispatch(getUser({id, current_user_id}))
        navigation.navigate('Profile', {CURRENT_USER: true})
    }
    return <Test data={followers} callback={nav} current_user_id={current_user_id} item_id={'subscriber'}/>
}


const Follower = ({data, callback, destroy}) => {
    const {username, avatar_path} = data
    const image = avatar_path ? <Avatar source={{uri: `${config.BASE_URL}/user_avatars/${avatar_path}`}}/>
        : <DefaultUserAvatar text={username} size={'60px'} textSize={'30px'}/>
    return <User>
        <AvaContainer onPress={destroy ? () => {
        } : callback}>{image}</AvaContainer>
        <UserName>{username}</UserName>
        <Button onPress={callback} disabled={destroy} destroy={destroy}
        ><ButtonText>Show profile</ButtonText></Button>
    </User>
}


export default FollowersC