//
// import React, { Component } from 'react';
// import {
//   AppRegistry
// } from 'react-native';
// // import App from "./src/app";
// // AppRegistry.registerComponent('ReactToDo', () => App);
// import Splash from "./src/splash"
// AppRegistry.registerComponent('ReactToDo', () => Splash);


import React, { Component } from 'react';
import {
    AppRegistry, View, Navigator
} from 'react-native';

import Splash from "./src/splash"


export default class ReactToDo{
    render(){
      return(
      <Navigator
          initialRoute={{id:'Splash'}}
          renderScene={this.navigationRenderScene}
      />
      )
    }

    navigationRenderScene(route, navigator){
        //_navigator  =   navigator;
        switch(route.id){
            case "Splash":
                return (<Splash navigator={navigator} />);
        }
    }
}
AppRegistry.registerComponent('ReactToDo', () => ReactToDo);
