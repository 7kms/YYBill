/**
 * 启动页面
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    InteractionManager,
    Image
} from 'react-native';
import MainPage from './MainPage';
import Util from '../Utils';
const styles = StyleSheet.create({
    img:{
        resizeMode:'cover',
        width: Util.size.width,
        height: Util.size.height,
        alignItems:'center'
    },
    text:{
        marginTop:260,
        color:Util.themeColor,
        backgroundColor:'transparent',
        fontWeight:'bold',
        fontSize:38
    },
    timeIndicator:{
        position:'absolute',
        top: Util.statusBarHeight,
        right: 5,
        color: '#fff',
        fontSize:14
    }
});
class Launch extends Component{
    constructor(props){
        super(props);
        this.state = {
            timer:5
        }
    }
    _skip(){
        this.timer && clearInterval(this.timer);
        let { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                title:'bill-list',
                animate:'FloatFromBottom',
                Component: MainPage
            });
        });
        
    }
    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }
    componentWillMount(){
        StatusBar.setBarStyle('light-content',true);
        this.timer = setInterval(()=>{
            let timerCount = this.state.timer - 1;
            this.setState({timer:timerCount});
            if(timerCount < 1){
                this._skip();
            }
        },1000);
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Image source={require('../imgs/launch-3.jpg')} style={styles.img}>   
                    <Text 
                    style={styles.timeIndicator}
                    onPress={()=>this._skip()}
                    >{this.state.timer}秒跳过</Text>       
                    <Text style={styles.text}> this is a bill app </Text>
                </Image>
            </View>       
        );
    }
}
export default Launch;