import styled from 'styled-components/native';

export const MessageMain = styled.View`
  border-radius: 16px;
  background: ${props => props.isMine ? '#7A8FAC' : '#525252'};
  width: 200px;
  min-height: 80px;
  margin-left: 8px;
  margin-top: 24px;
`

export const UserName = styled.Text`
  margin-top: 10px;
  color: white;
  font-size: 16px;
  margin-left: 11px;
`
export const Text = styled(UserName)`
  margin-top: 4px;
`
export const Image = styled.Image`
  border-radius: 360px;
  width: 45px;
  height: 45px;
  display: block;
  margin-top: 24px;
`
export const CheckedC = styled.View`
  position: absolute;
  right: 9px;
  bottom: 6px;
`
export const TimeText = styled.Text`
  position: absolute;
  top: 9px;
  right: 9px;
  font-size: 15px;
  color: white;
`