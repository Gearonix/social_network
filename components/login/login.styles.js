import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background: #5458F7;
  border-radius: 16px;
  width: 90%;
  height: 46px;
  margin: 0 auto;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`
export const Link = styled.Text`
  font-size: 16px;
  color: #78746D;
  margin-top: 12px;
  text-align: center;
  margin-bottom: 150px;
`
export const Error = styled.Text`
  color: #D25B5B;
  font-size: 18px;
  text-align: center;
  margin-top: 16px;

`

export const ButtonText = styled.Text`
  font-size: 18px;
  color: white;

`

export const Image = styled.Image`
  width: 90%;
  height: 253px;
  margin: 0 auto;
  margin-top: 42px;
`
export const Title = styled.Text`
  font-size: 24px;
  color: white;
  margin-top: 23px;
  margin: 0 auto;
  font-weight: normal;
`
export const Input = styled.TextInput`
  background: white;
  border: 2px solid ${props => props.error ? '#D25B5B' : '#BEBAB3'};
  color: #78746D;
  font-size: 16px;
  padding-left: 16px;
  height: 46px;
  width: 90%;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 16px;
`