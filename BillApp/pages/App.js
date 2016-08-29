import React,{Component} from 'react';
import {
    Navigator
} from 'react-native';
import Launch from './Launch';
import Util from '../Utils';
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
                        return Navigator.SceneConfigs.FloatFromBottom;
                    }else{
                        return Navigator.SceneConfigs.PushFromRight;
                    }
                }}
                renderScene={(route,navigator)=>{
                    let {Component,title} = route;
                    return <Component navigator={navigator} title={title} {...route}/>
                }}

            />
        );
    }
}
export default App;