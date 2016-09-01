import React ,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import { Header } from '../Components/public/Header';
import { CustomButton } from '../Components/public/Button';
import Icon from 'react-native-vector-icons/Ionicons';
let IconNames =  Object.keys(Icon.glyphMap).filter((icon,index)=>{
    if(index % 15 == 0){
        return true;
    }
    return false;
});
class AddItemView extends Component{
     _generateHeader(){
        const leftButton = (<CustomButton leftIcon={<Icon name="md-arrow-back" size={20} color="#fff"/>} onPress={()=>this._backToNative()}/>);
        const rightButton = <CustomButton text='保存' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._addBill()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    render(){
        return (
            <View style={{flex:1}}>
               {this._generateHeader()}
               <View>
                    <TextInput 
                        placeholder="请输入类别的名称"
                    />
               </View>
               <View>
               {
                   IconNames.map((name,index)=>{
                       return (<Icon name={name} size={20} color="green"/>);
                    })
                }
               </View>
               <View>
                <Text>
                color content
                </Text>
                    
               </View>
            </View>
        );
    }
}
export default connect(state=>{
    return {}
})(AddItemView);