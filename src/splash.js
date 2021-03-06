import React, {Component} from "react";
import {View, Text, StyleSheet, Navigator, StatusBar, Image, Button, AsyncStorage} from "react-native";
import Todo from "./todo";
import Login from "./login"
import { NavigationActions } from 'react-navigation'

class Splash extends Component{
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            timePassed: false
        };
    }

    componentDidMount() {
        setTimeout(() => {this.setTimePassed()}, 3000)
    }
    setTimePassed() {

        this.setState({timePassed: true});
    }
    componentDidUpdate () {
        if (this.state.timePassed) {
            AsyncStorage.getItem("isLoggedIn").then((json) =>{
                try{
                    const logDetail =   JSON.parse(json);
                    if(logDetail.isLoggedIn){
                        this._navigateTo('Todo')
                    }else{
                        this._navigateTo('Login')
                    }

                }catch(e){
                    this._navigateTo('Login')
                }

            })

        }
    }
    _navigateTo = (routeName: string) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
        this.props.navigation.dispatch(resetAction)
    };
    render(){
        const { navigate } = this.props.navigation;
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <Image
                        style={styles.logo}
                        source={require('./public/images/react_todo.png')}
                    />
                    <Text>A React Native Basic TODO App</Text>
                    <Text>Developed by Synclovis Systems Pvt Ltd</Text>

                </View>
            );
    }
}

const styles    =   StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFFFFF"
    },
    logo: {
        height: 500,
        width:120,
        justifyContent: "space-around",
        resizeMode: "contain",
    }
});
export default Splash;