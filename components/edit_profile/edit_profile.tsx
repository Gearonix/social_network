import * as React from "react";
import {createInput} from "../login/login";
import {useFormik} from "formik";
import {FullContainer,  Text} from "../../global/styles";
import {Button, Container, MT30, Title} from "./edit_profile.styles";
import {useDispatch, useSelector} from "react-redux";
import {changeUserData} from "../../reducers/login_reducer";
import {editProfileValidator} from "../../validators";
import {Error} from "../login/login.styles";

const EditProfile = ({navigation}) => {
    const {username,description,user_id} = useSelector(state => state.login)
    const initialValues = {username: username ?? '', description: description ?? ''}
    const dispatch = useDispatch()
    const onSubmit = data => {
        dispatch(changeUserData({...data,user_id}))
        navigation.navigate('EditProfileSettings')
    }
    const validate = editProfileValidator
    const formik = useFormik({initialValues, onSubmit,validate})
    return <FullContainer>
        <Container>
        <Title>Name</Title>

        {createInput('username', formik)}
        <MT30 />
        <Title>Description</Title>
        {createInput('description', formik,'30')}
        <Button onPress={formik.handleSubmit}><Text>Save!</Text></Button>
        <Error>{formik.errors?.error}</Error>
        </Container>
    </FullContainer>
}


export default EditProfile



