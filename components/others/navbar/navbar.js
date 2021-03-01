import styled from 'styled-components/native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Navbar = () => {
    return <Main>
        <Block>
        <Icon name={'home'}/>
        <Icon name={'message1'}/>
        <Icon name={'user'}/>
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

const Icon = ({name}) => <AntDesign name={name} size={28} color="white" />

export default Navbar