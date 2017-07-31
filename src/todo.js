import React, {Component} from "react";
import {View, Text, StyleSheet, Platform, ListView, Keyboard, AsyncStorage, StatusBar, Navigator, NativeModules} from "react-native";
import Header from "./header";
import Footer from "./footer";
import Row from "./row";
import { NavigationActions } from 'react-navigation'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken,
} = FBSDK;
class Todo extends Component{
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        const ds    =   new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
        this.state={
            allComplete:false,
            value:"",
            items:[],
            dataSource:ds.cloneWithRows([]),
            isLoggedIn: true
        }
        this.setSource =    this.setSource.bind(this);
        this.handleAddItem =    this.handleAddItem.bind(this);
        this.handleRemoveItem =    this.handleRemoveItem.bind(this);
        this.handleToggleComplete =  this.handleToggleComplete.bind(this);
        this.handleToggleAllComplete =  this.handleToggleAllComplete.bind(this);
        this.onSignout =  this.onSignout.bind(this);

    }

    componentWillMount(){
        AsyncStorage.getItem("items").then((json) =>{
            try{
                const items =   JSON.parse(json);
                this.setSource(items, items);
            }catch(e){}

        })
    }

    componentDidUpdate () {
        if (this.state.isLoggedIn) {
            this._navigateTo('Login')
        }
    }
    _navigateTo = (routeName: string) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
        this.props.navigation.dispatch(resetAction)
    };

    setSource(items, itemDataSource, otherState){
        this.setState({
            items,
            dataSource:this.state.dataSource.cloneWithRows(itemDataSource),
            ...otherState
        });
        AsyncStorage.setItem("items",JSON.stringify(items))
    }

    handleRemoveItem(key){
        const newItems  =   this.state.items.filter((item) => {
            return item.key != key;
        })

        this.setSource(newItems,newItems);
    }

    handleToggleComplete(key, complete){
        const newItems  =   this.state.items.map((item) => {
            if(item.key != key) return item;
            return {
                ...item,
                complete
            }
        });
        this.setSource(newItems,newItems)
    }

    handleToggleAllComplete(){
        const complete  =   !this.state.allComplete;
        const newItems  =   this.state.items.map((item) =>({
            ...item,
            complete
        }));

        this.setSource(newItems, newItems, {allComplete:complete})
    }
    handleAddItem(){
        if(!this.state.value) return;
        const newItems=[
            ...this.state.items,
            {
                key:Date.now(),
                text:this.state.value,
                complete:false
            }
        ];
        this.setSource(newItems, newItems, {value:""})
    }

    onSignout(){
        //alert("on")
        AsyncStorage.setItem("isLoggedIn",JSON.stringify({isLoggedIn:false}))
        this.setSource(this.state.items,this.state.items,{isLoggedIn:false});
        //FBLoginManager.logout((error, data) => {
        // FBLoginManager.logout((data) => {
        //     this.setSource(this.state.items,this.state.items,{isLoggedIn:false});
        //     AsyncStorage.setItem("isLoggedIn",JSON.stringify({isLoggedIn:false}))
        //     this.props.onLogout()
        // })

    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Header
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    onChange={(value) => this.setState({value})}
                    onToggleAllComplete={this.handleToggleAllComplete}
                />
                <View style={styles.content}>
                    <ListView
                        style={styles.list}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        onScroll={()=>Keyboard.dismiss()}
                        renderRow={({key, ...value}) => {
                            return(
                                <Row
                                    key={key}
                                    onRemove={() => this.handleRemoveItem(key)}
                                    onComplete={(complete) => this.handleToggleComplete(key, complete)}
                                    {...value}
                                />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return <View key={rowId} style={styles.separator} />
                        }}
                    />
                </View>
                <Footer
                    onSignout={this.onSignout}
                />

            </View>
        );
    }
}

const styles =   StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#795548",
        ...Platform.select({
            ios:{paddingTop:30},
            android:{paddingTop:20}
        })
    },
    content:{
        flex:1
    },
    list:{
        backgroundColor:"#795548"
    },
    separator:{
        borderWidth:1,
        borderColor:"#795548"
    }
})
export default Todo;