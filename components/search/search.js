import React from 'react';
import {Container, Page} from "../../global/styles";
import Navbar from "../others/navbar/navbar";
import {
    FoundUserItemContainer,
    IconContainer,
    InpContainer,
    InputStyle, Underline,
    UserDataC, UserDescription,
    UserImage,
    UserName
} from "./search.styles";
import {AntDesign} from "@expo/vector-icons";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getUser, search} from "../../reducers/users_reducer";
import config from "../../config";
import {DefaultUserAvatar} from "../profile/profile.items";

const Search = ({navigation}) => {
    const initialValues = {search : ''};
    const dispatch = useDispatch()
    const onSubmit = ({search : value}) => {
        dispatch(search(value.toLowerCase()))
    }
    const {handleChange,handleSubmit,values,submitForm} = useFormik({initialValues, onSubmit})
    const prepareToSubmit = data => {
        handleChange('search')(data)
        submitForm()
    }
    const navigate = (id) => () => {
        dispatch(getUser(id))
        navigation.navigate('Profile',{CURRENT_USER: true})
    }
    const {found_users} = useSelector(state => state.users);
    const found_users_elements = found_users.map(item =>  <FoundUser username={item.username}
    description={item.description} avatar_path={item.avatar_path} callback={navigate(item._id)} />)
    // getUser
    return <Page>
        <Container>
            <InpContainer>
                <IconContainer><Icon name={'search1'}/></IconContainer>
                <InputStyle style={noneBorder} placeholder={'Search'} placeholderTextColor={'white'}
                            value={values.search} onChangeText={prepareToSubmit}/>
            </InpContainer>
            {found_users_elements}
        </Container>
        <Navbar navigate={navigation.navigate}/>
    </Page>
}
const FoundUser = ({username,description,user_id,avatar_path,callback=()=>{}}) => {
    const image_component = avatar_path ?  <UserImage
        source={{uri: `${config.BASE_URL}/user_avatars/${avatar_path}`}}/> :
        <DefaultUserAvatar mini={true} text={username}/>
    return  <FoundUserItemContainer onPress={callback}>
        {image_component}
        <UserDataC>
            <UserName>{username}</UserName>
            <UserDescription>{description}</UserDescription>
        </UserDataC>
        <Underline />
    </FoundUserItemContainer>
}

//NOOOOOO

const noneBorder = {paddingVertical: 0, outline: 'none'}

const Icon = ({name,callback=()=>{}}) => <AntDesign onPress={callback} name={name} size={20} color="white" />

export default Search