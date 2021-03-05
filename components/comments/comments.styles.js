import styled from 'styled-components/native';
import {Dimensions} from "react-native";


export const Main = styled.View`
  width: 93%;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0 auto;
  margin-top: 17px;
`
export const UserName = styled.Text`
  font-size: 17px;
  color: white;
`
export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 360px;
`
export const AvatarContainer = styled.TouchableOpacity`
  margin-top: 4px;
  width: 50px;
  height: 50px;
  border-radius: 360px;
`
export const UserData = styled.View`
  margin-left: 12px;
  height: 100%;
  width: 200px;
`
export const Message = styled(UserName)`
  margin-top: 3px;
`
export const Date = styled.Text`
  color : #989898;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 5px;
`
export const InputBlock = styled.View`
  width: 100%;
  height: 55px;
  background : #252525;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-width: 1px;
  border-top-color: #C4C4C4;
  display: flex;
  align-items: center;
  flex-direction: row;
`
export const InputAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 360px;
  margin-left: 17px;
`

export const Input = styled.TextInput`
  height: 100%;
  border-radius: 10px;
  width: 100%;
  background: #525252;
  font-size: 14px;
  padding-left: 9px;
  color : white;
`
export const InputContainer = styled.View`
  height: 35px;
  width: 245px;
  margin-left: 12px;
`
export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 6px;
  right: 15px;
`


export const Test = styled.View`
  background: #191A1D;
  height: ${Dimensions.get('window').height-55+'px'};
  position: relative;
`
export const PageComments = styled.View`
    width: 100%;
    height: 100%;
    background: rgba(25, 26, 29, 1);
    position: relative;
`