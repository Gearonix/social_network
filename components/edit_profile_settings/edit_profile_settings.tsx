import * as React from 'react'
import {FullContainer} from "../../global/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import {Item, Text} from "./edit_profile_settings.styles";
import {changeBackgroundAC, changeUseraAvatarAC} from "../../reducers/login_reducer";
const EditProfileSettings = ({navigation}) => {
    const userAvatarCallback = navigation.state.params.userAvatarCallback
    const actionOptions = ["Cancel","Change background", "Delete background"]
    return <FullContainer>
        <SetItem text={'Name and description'} callback={() => navigation.navigate('EditProfile')}/>
        <SetItem text={'Background'} callback={() => userAvatarCallback('backgrounds',
            changeBackgroundAC,actionOptions)}/>
        <SetItem text={'Avatar'} callback={() => userAvatarCallback('user_avatars',changeUseraAvatarAC)}/>
    </FullContainer>
}
const SetItem = ({callback,text}) =>
    <Item onPress={callback}>
    <Text>{text}</Text>
    <FontAwesome5 name="chevron-right" size={24} color="#525252" />
    </Item>


export default EditProfileSettings