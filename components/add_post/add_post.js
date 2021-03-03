import React, {useEffect, useState, useRef} from 'react';
import * as ImagePicker from "expo-image-picker";
import {Header, HeaderText, Input, PostImage, Publication, Share} from "./add_post.styles";
import {Keyboard} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {addPost, UploadImage} from "../../reducers/login_reducer";
import {useDispatch, useSelector} from "react-redux";

const AddPost = ({isOpen,qclose}) =>  {
    const sheetRef = useRef(null);
    const [file, setFile] = useState(null)
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
    const {username,user_id,avatar_path} = useSelector(state => state.login)
    const imageConfig = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    }
    const onSend = async () => {
        qclose()
        const {payload : filename} = await dispatch(UploadImage({file,mode :'post_images'}))
        dispatch(addPost({filename,username,user_id,avatar_path,value}))
        sheetRef.current?.snapTo(1)
    }
    const renderContent = () => {
        const closeBoard = (e) => {
            if (e.nativeEvent.key === "Enter") Keyboard.dismiss()
        }
        return <Publication>
            <Header>
                <HeaderText>New publication</HeaderText>
                <Share onPress={onSend}>Share</Share>
            </Header>
            <Input placeholder={'Add description...'} placeholderTextColor={'#787878'}
                   multiline={true} style={{outline: 'none'}} onKeyPress={closeBoard} value={value}
                   onChangeText={text => setValue(text)}/>
            <PostImage source={{uri:  file.uri}}/>
        </Publication>
    };
    const AsyncUseEffect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync(imageConfig);
        if (result?.cancelled){
            qclose();
            return
        }
        setFile(result)
    }
    useEffect(() => {
        if (isOpen) AsyncUseEffect()
        return () => {
            setFile(null)
            setValue('')
        }
    }, [isOpen])
    if (!file || !isOpen) return <></>
    if (sheetRef.current && isOpen) sheetRef.current.snapTo(0)
    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 0]}
                borderRadius={10}
                renderContent={renderContent}
                onCloseEnd={qclose}
            />
        </>
    );
}

export default AddPost