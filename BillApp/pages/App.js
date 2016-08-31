import React,{Component} from 'react';
import {
    View,
    StatusBar,
    Navigator
} from 'react-native';
import Launch from './Launch';
import Util from '../Utils';
let defaultStatusBar = {
                        backgroundColor:"rgba(0,0,0,0)",
                        barStyle: "light-content",
                        animate: true,
                        translucent: true
                    };
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            //创建应用的根导航(路由)
            /**
             * 
             *  Navigator.SceneConfigs.PushFromRight (默认)
                Navigator.SceneConfigs.FloatFromRight
                Navigator.SceneConfigs.FloatFromLeft
                Navigator.SceneConfigs.FloatFromBottom
                Navigator.SceneConfigs.FloatFromBottomAndroid
                Navigator.SceneConfigs.FadeAndroid
                Navigator.SceneConfigs.HorizontalSwipeJump
                Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                Navigator.SceneConfigs.VerticalUpSwipeJump
                Navigator.SceneConfigs.VerticalDownSwipeJump
             */
            <Navigator
                initialRoute={{
                    title:'launch',
                    animate:'VerticalUpSwipeJump',
                    Component:Launch
                }}
                
                configureScene = {(route,routeStack)=>{
                    //return Navigator.SceneConfigs.FloatFromBottom;
                    if(route.animate){
                        //return Navigator.SceneConfigs.FloatFromBottom;
                        return Navigator.SceneConfigs[route.animate];
                    }else if(Util.OS === 'android'){
                        return Navigator.SceneConfigs.FadeAndroid;
                    }else{
                        return Navigator.SceneConfigs.PushFromRight;
                    }
                }}
                renderScene={(route,navigator)=>{
                    let {Component,title,statusBarStyle} = route;
                    
                    let finallyStatusBar =  Object.assign(defaultStatusBar,statusBarStyle);;
                    return (
                        <View style={{flex:1}}>
                            <StatusBar {...finallyStatusBar}/>
                            <Component navigator={navigator} title={title} {...route}/>
                        </View>
                    );
                }}

            />
        );
    }
}
export default App;