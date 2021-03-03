import styled from 'styled-components/native';

export const User = styled.View`
  width: 136px;
  height: 160px;
  border-radius: 12px;
  background: #525252;
  margin-top: 20px;
`
export const NoneUser = styled(User)`
  background: transparent;
`
export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  borderRadius: 100;
`
export const AvaContainer = styled.View`
  margin: 0 auto;
  margin-top: 20px;
`

export const UserName = styled.Text`
  text-align: center;
  margin-top: 6px;
  color: white;
  font-size: 16px;
`
export const Button = styled.TouchableOpacity`
  width: 90px;
  height: 30px;
  background: ${props => props.destroy ? '#90939D' : '#5458F7'};
  border-radius: 48px;
  margin: 0 auto;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ButtonText = styled.Text`
  color: white;
  font-size: 11px;
`
export const FollowersContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`