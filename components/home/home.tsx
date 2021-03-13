import * as React from 'react';
import {Container, Page} from "../../global/styles";
import Navbar from "../others/navbar/navbar";
import {AddPostInput} from "../profile/profile.items";

const Home = ({navigation}) => {
    return <Page>
        <Container>
        </Container>
        <Navbar navigate={navigation.navigate}/>
    </Page>
}


export default Home