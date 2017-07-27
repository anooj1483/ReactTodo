import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Button} from "react-native";

class Login extends Component{
    static navigationOptions = {
        header:null
    };
    render(){

        return(
            <View style={styles.container}>
                <Image
                    source={require('./public/images/react_todo.png')}
                />
                <Button/>
            </View>
        );
    }
}

const styles    =   StyleSheet.create({
    container:{
        flex:1,
        paddingTop:16,
        alignItems: 'center',
        backgroundColor:"#FFFFFF"
    },
});
export default Login;