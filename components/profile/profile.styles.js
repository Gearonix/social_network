import styled from 'styled-components/native';

export const BackgroundImage = styled.Image`
  height: 120px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`
export const ArrowLeft = styled.View`
  position: absolute;
  top: 15px;
  left: 15px;
`
export const UserImageStyle = styled.Image`
  width: 120px;
  height: 120px;
`

export const FollowButtonContainer = styled.View`
  width: 186px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
export const UserName = styled.Text`
  text-align: center;
  margin-top: 8px;
  font-size: 28px;
  color: white;
`
export const FollowersCount = styled.Text`
  color: #c4c4c4;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
`
export const FriendsBlock = styled.View`
  height: 152px;
  width: 100%;
`
export const FriendsTitle = styled.Text`
  margin-top: 10px;
  margin-left: 15px;
  color: white;
  font-size: 18px;
`
export const FriendsItem = styled.View`
  height: 103px;
  width: 80px;
  margin-left: 16px;
  margin-top: 14px;
`
export const FriendImage = styled.Image`
  height: 70px;
  width: 70px;
  border: 2px solid #525252;
  borderRadius: 100;
`
export const FriendName = styled.Text`
  font-size: 14px;
  text-align: center;
  color: white;
`
export const FriendsContainer = styled.ScrollView`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
`
export const AddPostContainer = styled.View`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 76px;
  align-items: center;
  justify-content: space-around;
  margin-top: 25px;
`
export const PostInput = styled.View`
  background: #525252;
  font-size: 17px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 226px;
  height: 42px;
  padding-left: 10px;
  border-radius: 6px;
`
export const Post = styled.View`
  min-height: 422px;
  border-radius: 20px;
  border: 2px solid red;
`
export const PostHeader = styled.View`
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
export const PostUserImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100;
  margin-left: 10px;
`
export const PostTitle = styled.Text`
  font-size: 18px;
  color: white;
  margin-left: 8px;
  margin-top: 5px;
`
export const PostHeaderContainer = styled.View`
  width: 201px;
  height: 100%;
`
export const PostDate = styled.Text`
  color : #c4c4c4;
  margin-top: 6px;
  font-size: 13px;
  margin-left: 8px;

`
export const PostOthers = styled.View`
  height: 100%;
  padding-top: 16px;
  padding-left: 10px;
`
export const PostImage = styled.Image`
  height: 194px;
  width: 100%;
  margin-top: 10px;
`
export const PostMessage = styled(PostTitle)`
  font-size: 16px;
  margin-top: 29px;
`;
export const ChosenBlock = styled.View`
  width: 100%;
  height: 85px;
  border: 2px solid red;
`
export const PeopleWhoLikePost = styled.View`
  width: 113px;
  height: 42px;
  border: 2px solid red;
  display: flex;
  margin-left: -5px;
  flex-direction: row;
  
`
export const ItemHwoLikePost = styled.Image`
  width: 32px;
  height: 100%;
  borderRadius: 100;
`