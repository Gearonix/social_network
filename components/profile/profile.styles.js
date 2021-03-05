import styled from 'styled-components/native';

export const BackgroundImage = styled.Image`
  height: 120px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`
export const DefaultBackground = styled(BackgroundImage)`
    background: #222222;

`

export const ArrowLeft = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  z-index: 1;
  left: 15px;
`
export const UserImageStyle = styled.Image`
  width: 120px;
  height: 120px;
  borderRadius: 100;
  margin: 0 auto;
`
export const UserText = styled.Text`
  font-size: ${props => props.size};
  color : white;
`
export const UserImageContainer = styled.TouchableOpacity`
  width: ${props => props.size};
  height: ${props => props.size};
  margin-top: ${props => props.mt || '0px'};
  position: relative;
  borderRadius: 100;
  margin-left: ${props => props.size==='45px'  ? '12px' : props.size==='44px' ? '6px' :
          props.size==='60px' ? '10px' : '0px'};
  display: flex;
  align-items: center;
  justify-content: center;
  background : ${props => props.color || 'transparent'};
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
export const FollowersCountContainer = styled.TouchableOpacity`
  margin: 0 auto;
  margin-top: 10px;
`
export const FollowersCount = styled.Text`
  color: ${props => props.count===0 ? '#737373' : '#c4c4c4'};
  text-align: center;
  font-size: 18px;
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
export const AddPostContainer = styled.TouchableOpacity`
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
  min-height: 490px;
  border-radius: 20px;
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
  color: #c4c4c4;
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
  height: 174px;
  width: 320px;
  margin-top: 10px;
`


export const PostMessage = styled(PostTitle)`
  font-size: 16px;
  margin-top: 29px;
`;
export const ChosenBlock = styled.View`
  width: 100%;
  height: 85px;
`
export const PeopleWhoLikePost = styled.TouchableOpacity`
  width: 113px;
  height: 42px;
  display: flex;
  margin-top: 5px;
  flex-direction: row;

`
export const ItemHwoLikePost = styled.Image`
  width: 32px;
  height: 32px;
  margin-top: 5px;
  borderRadius: 360;
`
export const UnderLine = styled.View`
  background: #525252;
  height: 1px;
  width: 90%;
  margin: 0 auto;
  margin-top: 16px;
`
export const LikesAndComments = styled.View`
  height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

`
export const CircleButton = styled.TouchableOpacity`
  borderRadius: 100;
  background: ${props => !props.liked ? '#525252' : '#5458F7'};
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`
export const PostLikesText = styled.Text`
  color: ${props => props.liked ? '#5458F7' : 'white'};
  font-size: 14px;
  margin-left: 8px;

`
export const HeartContainer = styled.View`
  margin-right: 16px;
`
export const Description = styled.Text`
  margin-top: 14px;
  color : rgba(204, 204, 204, 1);
  font-size: 18px;
  text-align: center;
  margin-bottom: ${props => !props.iou ? '16px' : '0px'};
`
export const OnlineCircle = styled.View`
  borderRadius: 100;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  background : #2CE928;
  bottom: 10px;
  border: 3px solid white;
`