import styled from 'styled-components/native';

export const InputStyle = styled.TextInput`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color : white;
  margin: 0 auto;
  background : #525252;
  padding-left: 42px;
  font-size: 16px;
`
export const InputText = styled.Text`
  font-size: 14px;
  color: white;
`
export const InpContainer = styled.View`
  width: 288px;
  height: 32px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 8px;
  position: relative;
`
export const IconContainer = styled.View`
  position: absolute;
  width: 25px;
  left: 14px;
  top: 6px;
  height: 25px;
  z-index: 2;
`
export const FoundUserItemContainer = styled.TouchableOpacity`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 288px;
  margin: 0 auto;
  background: #191A1D;
  position: relative;
`
export const UserName = styled.Text`
  margin-top: 5px;
  color : white;
  font-size: 18px;
`
export const UserImage = styled.Image`
  borderRadius: 100;
  height: 45px;
  width: 45px;
  margin-left: 12px;
`
export const UserDataC = styled.View`
  height: 100%;
  margin-left: 14px;
`
export const UserDescription = styled.Text`
  color : #989898;
  margin-top: 8px;
  font-size: 16px;
`
export const Underline = styled.View`
  background: #525252;
  height: 1px;
  width: 256px;
  position: absolute;
  bottom: -2px;
  margin-left: 15px;
`