import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import AddItem from './AddItem';

import actionCreater from '../Actions'
import Utils from '../Utils';

let tempArr = [];
for(let i =0;i<20;i++){
    tempArr.push({icon:"md-bicycle",text:"餐饮"});
}
class AddBillView extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        };
    }
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
    _selectItem(item,index){
        this.setState({
            activeIndex:index
        });
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
                        <Text>支出</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[headerStyles.operateBtn,headerStyles.btnRight]}>
                        <Text>收入</Text>
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
                        ref='money'
                        autoCapitalize="none"
                        autoFocus={true}
                        placeholder="0.00"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        selectionColor="#fff"
                        maxLength={6}
                        style={styles.inputTextStyle}
                    />
                </View>
            </View>
        );
    }
    _generateItems(){
        const styles = StyleSheet.create({
            itemWrap:{
                flex:1,
                paddingTop:10,
                paddingHorizontal:10,
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'space-around'
            },
            icon:{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center'
            },
            active:{
                borderColor:'red',
                borderWidth:Utils.pixel,
                borderRadius:20
            },
            item:{
                width:60,
                height:60,
                marginBottom:10,
                alignItems:'center',
                justifyContent:'center',
            },
            text:{
                fontSize:12,
                color:"#676767"
            },
            textActive:{
                fontSize:14,
                color:Utils.color.heart
            }
        });
        const {categoryList} = this.props;
        return (
            <ScrollView 
                style={{flex:1}}
                keyboardShouldPersistTaps = {false}
            >
                <View style={styles.itemWrap}>
                    {categoryList.map((item,index)=>{
                        let active = index == this.state.activeIndex ? true : false;
                        return (
                            <TouchableOpacity 
                                style={styles.item}
                                key={index}
                                onPress={()=>{
                                    this._selectItem(item,index)
                                }}
                            >
                                <View style={active?[styles.icon,styles.active] : styles.icon}>
                                    <Icon 
                                    name={item.iconName} 
                                    size={active ? 30 : 25} 
                                    color={active ? Utils.color.heart : item.color}/>
                                </View>
                                <Text style={active ?[styles.text,styles.textActive]: [styles.text,{color:item.color}] }>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity 
                            style={styles.item}
                            onPress={()=>{
                                this.props.navigator.push({
                                     title:'添加消费类型',
                                     Component: AddItem
                                });
                            }}
                            >
                        <View style={styles.icon}>
                            <Icon 
                            name="ios-add-circle-outline"
                            size={ 25} 
                            color={Utils.color.grass}/>
                        </View>
                        <Text style={styles.text }>添加</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    render(){
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                {this._generateInput()}
                {this._generateItems()}
            </View>
        );
    }
}
export default connect(state=>{
    const {categoryList} = state;
    return {
        categoryList
    }
})(AddBillView);