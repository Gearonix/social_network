import React from 'react'
import {FullContainer} from "../../global/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import {Item, Text} from "./edit_profile_settings.styles";
import {useSelector} from "react-redux";
const EditProfileSettings = ({navigation}) => {
    const userAvatarCallback = navigation.state.params.userAvatarCallback
    const background = useSelector(state => state.login.background_path)
    const actionOptions = background ? ["Cancel","Change background", "Delete background"] :
        ["Cancel", "Change background"]
    return <FullContainer>
        <SetItem text={'Name and description'} callback={() => navigation.navigate('EditProfile')}/>
        <SetItem text={'Background'} callback={() => userAvatarCallback('backgrounds',actionOptions)}/>
        <SetItem text={'Avatar'} callback={() => userAvatarCallback('user_avatars')}/>
    </FullContainer>
}
const SetItem = ({callback,text}) =>
    <Item onPress={callback}>
    <Text>{text}</Text>
    <FontAwesome5 name="chevron-right" size={24} color="#525252" />
    </Item>


export default EditProfileSettings