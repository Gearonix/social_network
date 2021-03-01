import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./components/profile/profile";
import Login from "./components/login/login";
import {Provider} from "react-redux";
import store from "./store";

const headerStyle = (title,options={}) => ({
    title,
    headerStyle: {
        backgroundColor: '#191A1D',
        elevation : 0,
        borderBottomWidth: 0,
    },
    headerTintColor: options.color ?? "white",
    headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: options.fz ?? '20px',
        textAlign: 'center',
    },
    ...options.left
})


const AppNagigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: headerStyle('Profile')
    },
    Login: {
        screen: Login,
        navigationOptions: headerStyle('Welcome!',{color : 'white',left : {headerLeft : null}})
    }
})


const AppNavigation = createAppContainer(AppNagigator)

const App = () => {
    return <Provider store={store}>
        <AppNavigation/>
    </Provider>

}
export default App
