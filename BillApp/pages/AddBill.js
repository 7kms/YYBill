import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
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
        paddingLeft:10,
        color:Utils.selectedColor,
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
       // marginBottom:100,
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
class AddBillView extends Component{
    _back(){
        const {navigator} = this.props;
        navigator.pop();
    }
    _saveBill(){
        const {navigator,dispatch} = this.props;
        let money = parseFloat(this.refs['money']._lastNativeText);
        let category = this.refs['category']._lastNativeText;
        let description = this.refs['description']._lastNativeText;
        let bill = {
            money,
            category,
            description,
            time: new Date()
        };
        dispatch(actionCreater.addBill(bill));
        console.log(bill);
        navigator.pop();
    }
    _generateHeader(){
        let headerStyles = {
            wrap : {
                flexDirection:'row',
                backgroundColor:"#fff",
                height: Utils.size.navHeight,
                alignItems:'flex-end',
                paddingBottom:10
            },
            back:{
                position:'absolute',
                left: 0,
                top: 35,
                width: 40,
                alignItems:'center'
            },
            btnWrap:{
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
            },
            operateBtn:{
                paddingVertical:3,
                paddingHorizontal:25,
                borderWidth: Utils.pixel,
                borderColor:'#999'
            },
            btnLeft:{
                borderTopLeftRadius:5,
                borderBottomLeftRadius:5
            },
            btnRight:{
                borderTopRightRadius:5,
                borderBottomRightRadius:5
            },
            btnActive:{
                borderColor:Utils.color.heart,
                color:Utils.color.heart
            }
        };
       return (
           <View style={headerStyles.wrap}>
                <TouchableOpacity style={headerStyles.back} onPress={()=>this._back()}>
                    <Icon name="md-arrow-back"  size={25} color="#bbb"/>
                </TouchableOpacity>
                <View style={headerStyles.btnWrap}>
                    <TouchableOpacity style={[headerStyles.operateBtn,headerStyles.btnLeft]}>
                        <Text>
                            支出
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[headerStyles.operateBtn,headerStyles.btnRight]}>
                        <Text>
                            收入
                        </Text>
                    </TouchableOpacity>
            </View>
           </View>
       );
    }
    _generateInput(){
        const styles = StyleSheet.create({
            inputContainer:{
                height:80,
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:Utils.color.heart,
            },
            item:{
                width:100,
                textAlign:'center',
                fontSize:20,
                color:'#fff'
            },
            inputTextStyle:{
                height: 80,
                marginRight:15,
                fontSize:30,
                textAlign:'right',
                color:'#fff',
                borderWidth:0,
                borderColor:'transparent'
            }

        });
        return (
            <View style={styles.inputContainer}>
                <View>
                    <Text  style={styles.item}>花钱</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput 
                        autoCapitalize="none"
                        autoFocus={true}
                        placeholder="0.00"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        selectionColor="#fff"
                        maxLength={5}
                        style={styles.inputTextStyle}
                    />
                </View>
            </View>
        );
    }
    render(){
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                {this._generateInput()}
                <View style={styles.billContent}>
                    <WithLabel label="消费金额:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='money'
                            autoCapitalize='none'
                            autoFocus={false}
                            keyboardType='numeric'
                            maxLength={5}
                            clearButtonMode='while-editing'
                            placeholder="请输入$$"
                        />
                    </WithLabel>
                     <WithLabel label="消费项目:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='category'
                            placeholder="请输入$$"
                        />
                    </WithLabel>
                    <WithLabel label="描述:">
                        <TextInput 
                            style={styles.textInputStyle}
                            ref='description'
                            multiline={true}
                            placeholder="请输入$$"
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
                            保存
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
})(AddBillView);