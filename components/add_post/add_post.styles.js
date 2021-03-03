import styled from 'styled-components/native';

export const Publication = styled.View`
  width: 100%;
  background: #292A2D;
  height: 457px;
`
export const Header = styled.View`
 
  width: 92%;
  display: flex;
  flex-direction: row;
  height: 37px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 23px;
`
export const HeaderText = styled.Text`
  font-size: 19px;
  color: white;
`
export const Share = styled(HeaderText)`
  color : #51D5FF;
  text-decoration: underline;
  text-decoration-color: #51D5FF;
`
export const PostImage = styled.Image`
  min-height: 144px;
  width: 286px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 32px;
`
export const Input = styled.TextInput`
  width: 95%;
  margin: 0 auto;
  margin-top: 18px;
  border-bottom-color: #9E8B8B;
  border-bottom-width: 1px;
  border-top-color: #9E8B8B;
  border-top-width: 1px;
  background: transparent;
  color : #DDDDDD;
  height: 69px;
  font-size: 15px;
  padding-top: 7px;
  padding-left: 7px;
`
export const Page = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;

`