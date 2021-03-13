import {FullContainer} from "../../global/styles";
import * as React from 'react';
import {useFormik} from "formik";
import {ButtonText, Image, Input, Link, Title, Button, Error} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import {getAuth, login, register} from "../../reducers/login_reducer";
import {loginValidator, registerValidator} from "../../validators";
import {nor} from "../../types";

const Login = ({navigation}) => {
    const isLogin = navigation.state.params?.MODE == 'LOGIN';
    const dispatch = useDispatch()
    const [error, setError] = React.useState(null)
    const user_id : nor= useSelector(state => state.login.user_id)
    const initialValues = {username: '', password: ''}
    const callback = isLogin ? login : register
    const onSubmit = async data => {
        const {payload: Error} = await dispatch(callback(data))
        if (Error) setError(Error)
    }
    React.useEffect(() => {
        dispatch(getAuth())
    }, [])
    const formik = useFormik({initialValues, onSubmit, validate: isLogin ? loginValidator : registerValidator})
    if (user_id) {
        navigation.navigate('Profile')
    }
    const loginOrReg = isLogin ? 'Login' : 'Sign up';
    return <FullContainer>
        <Image source={require("./../../source/Login.png")}/>
        <Title>{loginOrReg}</Title>
        {createInput('username', formik)}
        {createInput('password', formik)}
        <Button onPress={formik.handleSubmit}><ButtonText>{loginOrReg}</ButtonText></Button>
        <Error>{error || formik.errors.error}</Error>
        <Link onPress={() => navigation.navigate('Login', {MODE: isLogin ? 'REGISTER' : "LOGIN"})}>
            {isLogin ? 'Sign up' : 'Login'}</Link>
    </FullContainer>
}

export const createInput = (name : string, formik,maxLength='20') => <Input onChangeText={formik.handleChange(name)} value={formik.values[name]}
                                             style={{paddingVertical: 0, outline: 'none'}}
                                             error={formik.errors[name]} maxLength={maxLength}/>
export default Login