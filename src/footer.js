import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

class Footer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onSignout} style={styles.signout}>
                    <Text style={styles.text}>Signout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles    =   StyleSheet.create({
    container:{
        flex:0,
        padding:16,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#4e3127",
        justifyContent:"center"
    },
    signout:{
        flexDirection:"row"
    },
    text:{
        color:"#FFFFFF"
    }
});
export default Footer;