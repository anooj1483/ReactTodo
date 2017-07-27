
import React, { Component } from 'react';
import {
    AppRegistry, View
} from 'react-native';
import {StackNavigator} from "react-navigation"
import Splash from "./src/splash"
import Login from "./src/login"

const ReactToDo = StackNavigator({
    Splash: { screen: Splash },
    Login: {screen:Login}
});

AppRegistry.registerComponent('ReactToDo', () => ReactToDo);
