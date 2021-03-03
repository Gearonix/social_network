import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./components/profile/profile";
import Login from "./components/login/login";
import {Provider} from "react-redux";
import store from "./store";
import EditProfileSettings from "./components/edit_profile_settings/edit_profile_settings";
import EditProfile from "./components/edit_profile/edit_profile";
import Search from "./components/search/search";
import Followers from "./components/followers/followers";

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
        fontSize: options.fz ?? 20,
        textAlign: options.ta ? 'left' : 'center',
    },
    ...options.others,
})


const AppNagigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: headerStyle('Profile')
    },
    Login: {
        screen: Login,
        navigationOptions: headerStyle('Welcome!',{others : {headerLeft : null}})
    },
    EditProfileSettings : {
        screen : EditProfileSettings,
        navigationOptions: headerStyle('Settings',{ta : true})
    },
    EditProfile : {
        screen : EditProfile,
        navigationOptions: headerStyle('Edit profile',{ta: true})
    },
    Search : {
        screen: Search,
        navigationOptions: headerStyle('Search',{others : {headerLeft : null,animationEnabled: false,}})
    },
    Followers : {
        screen : Followers,
        navigationOptions: headerStyle('Followers',{ta : true})
    }
})


const AppNavigation = createAppContainer(AppNagigator)



const App = () => {
    return <Provider store={store}>
        <AppNavigation/>
    </Provider>

}
export default App
