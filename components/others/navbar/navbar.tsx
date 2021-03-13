import styled from 'styled-components/native';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Navbar = ({navigate}) => {
    return <Main>
        <Block>
        <Icon name={'home'} callback={() => navigate('Home')}/>
        <Icon name={'search1'} callback={() => navigate('Search')}/>
        <Icon name={'message1'} callback={() => navigate('ChatPeople')}/>
        <Icon name={'user'} callback={() => navigate('Profile',{CURRENT_USER : false})}/>
        </Block>
    </Main>
}

const Main = styled.View`
  width: 100%;
  height: 70px;
  background : #252525;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
 
`
const Block = styled.View`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
`

const Icon = ({name,callback=()=>{}}) => <AntDesign onPress={callback} name={name} size={28} color="white" />

export default Navbar