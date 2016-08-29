import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import {
    NativeModules,
    NativeAppEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../Components/public/Button';
import { Header } from '../Components/public/Header';
import actionCreater from '../Actions'
import Utils from '../Utils';
let subscription;
let ReactPage = NativeModules.ReactPage;
const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Utils.themeColor
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 10,
        borderWidth:1,
        borderColor: '#cdcdcd',
    }
});
class NotifyButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
class NotifyView extends Component{
    _back(){
        const {navigator} = this.props;
        navigator.pop();
    }
    _goNative(){
        ReactPage.backToNative('notify page','Beijing China',Date.now());
    }
    _generateHeader(){
        const leftButton = (<CustomButton text='BACK' leftIcon={<Icon name="ios-arrow-back" size={20} color="#fff"/>} onPress={()=>this._back()}/>);
        const rightButton = <CustomButton text='NATIVE' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._goNative()}/>;
        const customHeader = (<Header title="通知" leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    componentDidMount(){
        console.log("subscription");
        subscription = NativeAppEventEmitter.addListener('notifyEmiter',(notify)=>console.log(notify));
    }
    componentWillUnmount(){
        subscription.remove();
    }
    //获取Promise对象处理
    async _updateEvents(){
        try{
            var events = await ReactPage.eventsPromise();
            console.log(events);
            //this.setState({events});
        }catch(e){
            console.error(e);
        }
    }
    render (){
        return (
            <View style={{flex:1}}>
                { this._generateHeader() }
                <View style={{flex:1}}>
                   <NotifyButton text="点击调用原生模块eventsCallback方法"
                        onPress={()=>ReactPage.eventsCallback((error,events)=>{
                            if(error){
                            console.error(error);
                            }else{
                            console.log(events);
                            //this.setState({events:events,});
                            }
                        }
                    )}
                    />
                    <NotifyButton text="点击调用原生模块eventsPromise方法-Promise"
                        onPress={()=>{
                            this._updateEvents();
                        }}
                    />
                    <NotifyButton text="点击调用原生模块sendNotification方法"
                        onPress={()=>ReactPage.sendNotification('准备发送通知...')}
                    />
                </View>
            </View>
        );
    }
}
export default connect(state=>{
    return {}
})(NotifyView);


