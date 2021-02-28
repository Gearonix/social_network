import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./components/profile/profile";


const AppNagigator = createStackNavigator({
    Main: {
        screen: Profile,
        navigationOptions: {
            title : 'Profile',
            headerStyle: {
                backgroundColor: '#191A1D'
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: '20px',
                textAlign : 'center'
            },
        }
    }
})


const AppNavigation = createAppContainer(AppNagigator)

const App = () => {
    return <AppNavigation />
}
export default App
