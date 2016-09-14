import React,{Component} from 'react';
import {
    View,
    StatusBar,
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';
import Launch from './Launch';
import Util from '../Utils';
let defaultStatusBar = {
                        backgroundColor:"rgba(171, 206, 223, 0.88)",
                        barStyle: "light-content",
                        animate: true,
                        translucent: true
                    };
                   
class App extends Component{
    constructor(props){
        super(props);
    }
    static lastBackPressed = null;
    static navigator = null;
    _onBackPressed(){
        const nav = App.navigator;
        let routers;
        if(!nav)return false;
        routers = nav.getCurrentRoutes();
        if(routers.length > 1){
            nav.pop();
            return true;
        }else{
          if(App.lastBackPressed && App.lastBackPressed + 2000 > Date.now()){
                return false;
            }else{
                ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
                App.lastBackPressed = Date.now();
                return true;
            }
        }
    }
    componentWillMount(){
        if(Util.OS === 'android'){
            BackAndroid.addEventListener('hardwareBackPress',this._onBackPressed);
        }
    }
    componentWillUnmount(){
        if(Util.OS === 'android'){
            BackAndroid.removeEventListener('hardwareBackPress',this._onBackPressed);
        }
    }
    render(){
        return(
            //创建应用的根导航(路由)
         <Navigator
                ref={(navigator)=>{
                    App.navigator = navigator;
                }}
                initialRoute={{
                    title:'launch',
                    animate:'VerticalUpSwipeJump',
                    Component:Launch,
                    statusBarStyle:{
                        backgroundColor:'rgba(0,0,0,0)'
                    }
                }}
                configureScene = {(route,routeStack)=>{
                    //return Navigator.SceneConfigs.FloatFromBottom;
                    if(route.animate){
                        return Navigator.SceneConfigs[route.animate];
                    }else if(Util.OS === 'android'){
                        return Navigator.SceneConfigs.FadeAndroid;
                    }else{
                        return Navigator.SceneConfigs.PushFromRight;
                    }
                }}
                renderScene={(route,navigator)=>{
                    let {Component,title,statusBarStyle} = route;
                    let finallyStatusBar =  Object.assign({},defaultStatusBar,statusBarStyle);
                // console.log(finallyStatusBar,statusBarStyle);
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