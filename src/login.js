import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Button,StatusBar,AsyncStorage} from "react-native";
import { NavigationActions } from 'react-navigation'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    LoginManager,
    GraphRequest,
    GraphRequestManager
} = FBSDK;
const infoRequest = new GraphRequest(
    '/me',
    null,
    this._responseInfoCallback,
);
class Login extends Component{

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentWillMount(){
        AsyncStorage.getItem("isLoggedIn").then((json) =>{
            try{
                const logDetail =   JSON.parse(json);
                if(logDetail.isLoggedIn){
                    this.setState({isLoggedIn: true});
                }else{
                    this.setState({isLoggedIn: false});
                }

            }catch(e){}

        })
    }

    componentDidUpdate () {
        if (this.state.isLoggedIn) {
            this._navigateTo('Todo')
        }
    }

    _navigateTo = (routeName: string) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
        this.props.navigation.dispatch(resetAction)
    };

    _responseInfoCallback(error: ?Object, result: ?Object) {
        console.log(result)
        console.log(error)
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            alert('Success fetching data: ' + result.toString());
        }
    }
    fbLogin(){
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
                console.log(result);
                if (result.isCancelled) {
                    //alert('Login cancelled');
                } else {
                    // alert('Login success with permissions: '
                    //     +result.grantedPermissions.toString());
                    new GraphRequestManager().addRequest(new GraphRequest(
                        '/me',
                        null,
                        this._responseInfoCallback,
                    )).start();
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    }

    render(){

        return(
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Image
                    source={require('./public/images/react_todo.png')}
                />

                {/*<Button*/}
                    {/*onPress={this.fbLogin}*/}
                    {/*title="Facebook Login"*/}
                    {/*color="#841584"*/}
                    {/*accessibilityLabel="Login to facebook"*/}
                {/*/>*/}
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("login is cancelled.");
                            } else {

                                this.setState({isLoggedIn: true});
                                result.isLoggedIn = true;
                                AsyncStorage.setItem("isLoggedIn",JSON.stringify(result))
                            }
                        }
                    }
                    onLogoutFinished={() => alert("Logged Out Successfully")}/>


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