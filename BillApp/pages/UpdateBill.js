import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../Components/public/Button';
import { Header } from '../Components/public/Header';
import actionCreater from '../Actions'
import Utils from '../Utils';
const styles = StyleSheet.create({
    billContent:{
        flex:1
    },
    labelContainer:{
        flexDirection:'row',
        alignItems:'center',
        height: 60,
    },
    label:{
        width:100,
    },
    textLabel:{
        textAlign:'right',
        color:'#777',
        fontSize:16
    },
    input:{
        flex:1,
        marginHorizontal:20,
    },
    textInputStyle:{
        height:40,
        borderColor:Utils.selectedColor,
        borderWidth: Utils.pixel
    },
    saveContent:{
        flex:1,
        height:60,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    saveBtn:{
        justifyContent:'center',
        width:200,
        height:40,
        borderRadius:5,
        marginBottom:100,
        backgroundColor:Utils.themeColor,
    },
    saveText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
    }
});
class WithLabel extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text style={styles.textLabel}>{this.props.label}</Text>
                </View>
                <View style={styles.input}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
class UpdateBillView extends Component{
    _back(){
        const {navigator} = this.props;
        navigator.pop();
    }
    _deleteBill(){
        const {navigator,dispatch,index} = this.props;
        dispatch(actionCreater.deleteBill(index));
        navigator.pop();
    }
    _saveBill(){
        const {navigator,dispatch,index,bill} = this.props;
        let money = this.refs['money']._lastNativeText || bill.money;
        let category = this.refs['category']._lastNativeText || bill.category;
        let description = this.refs['description']._lastNativeText || bill.description;
        let tempBill = {
            money,
            category,
            description,
            time: bill.time
        };
        tempBill.money = parseFloat(tempBill.money);
        dispatch(actionCreater.updateBill(index,tempBill));
        navigator.pop();
    }
    _generateHeader(){
        const leftButton = (<CustomButton text='BACK' leftIcon={<Icon name="ios-arrow-back" size={20} color="#fff"/>} onPress={()=>this._back()}/>);
        const rightButton = <CustomButton text='删除' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._deleteBill()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    render(){
        let {bill} = this.props;
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                <View style={styles.billContent}>
                    <WithLabel label="消费金额:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='money'
                            autoCapitalize='none'
                            keyboardType='numeric'
                            maxLength={5}
                            clearButtonMode='while-editing'
                            placeholder="请输入$$"
                            defaultValue = {String(bill.money)}
                        />
                    </WithLabel>
                     <WithLabel label="消费项目:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='category'
                            placeholder='category'
                            defaultValue = {bill.category}
                        />
                    </WithLabel>
                    <WithLabel label="描述:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='description'
                            multiline={true}
                            placeholder='description'
                            defaultValue = {bill.description}
                        />
                    </WithLabel>
                    <View style={styles.saveContent}>
                        <TouchableHighlight
                        activeOpacity={0.8}
                        underlayColor={Utils.selectedColor}
                        onPress={()=>this._saveBill()}
                        style={styles.saveBtn}
                    >
                        <Text style={styles.saveText}>
                            保存修改
                        </Text>
                    </TouchableHighlight>
                    </View>
                    
                </View>
            </View>
        );
    }
}
export default connect(state=>{
    return {}
})(UpdateBillView);