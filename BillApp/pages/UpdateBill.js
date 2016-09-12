import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ListView,
    Animated,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import { Header } from '../Components/public/Header';
import { CustomButton } from '../Components/public/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import AddItem from './AddItem';
import actionCreater from '../Actions'
import Util from '../Utils';
let toastIsBusy = false;
let dsCategory = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});

class CategoryGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeId: this.props.activeId,
            scaleAnim: new Animated.Value(1)
        };
    }
    _changeView(props){
        let {rowData,activeId} = props;
        if(rowData.id == activeId){
            this.active = true;
            this.shouldupdate = true;
            Animated.timing(
                this.state.scaleAnim,
                {
                    toValue:1.5,
                    duration:200,
                },
            ).start();
        }else if(this.active){
            this.shouldupdate = true;
            this.active = false;
            Animated.timing(
                this.state.scaleAnim,
                {
                    toValue:1,
                    duration:200,
                },
            ).start();
        }else{
            this.shouldupdate = false;
        }
    }
    componentDidMount(){
        this._changeView(this.props);
    }
    componentWillReceiveProps(nextProps){
       this._changeView(nextProps);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.shouldupdate;
    }
    _selectCategory(rowId,rowData){
        if(!this.active){
            this.active = true;
            this.props.selectCategory(rowData);
        }
    } 
    render(){
       let {rowId,rowData,activeId} = this.props;
       const styles = StyleSheet.create({
            iconWrap: {
                justifyContent:'center',
                alignItems:'center',
                width:40,
                height:40,
                borderRadius:20
            },
            
            iconface: {
                transform:[
                    {scale:this.state.scaleAnim.interpolate({
                        inputRange:[1,2],
                        outputRange:[1,2]
                    })}
                ]
            }
        });
        return (
            <TouchableHighlight 
                onPress={()=>this._selectCategory(rowId,rowData)}
                underlayColor="transparent"
                accessibilityComponentType="button"
                >
                <View style={{width:Util.size.width/4,height:60,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                    <View style={styles.iconWrap}>
                        <Animated.View style={ styles.iconface}>
                            <Icon 
                            name={rowData.iconName} 
                            style={{textAlign:'center'}} 
                            size={22} 
                            color={rowData.color}/>
                        </Animated.View>
                    </View>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode='middle'
                        style={rowData.id == activeId ? {color:rowData.color} : {color:'#999'}}
                    >{rowData.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
class UpdateBillView extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeId:this.props.bill.category.id,
            activeCategory:this.props.bill.category,
        };
    }
    _checkMoney(money){
        var reg = /(^[1-9]\d*\.?\d*$)|(^0\.?\d*[1-9]\d*$)/;
        if(typeof money == 'undefined'){
            return false;
        }
        return reg.test(money);
    }
    _saveBill(){
        let money = this.refs['money']._lastNativeText || this.refs['money'].props.defaultValue;
        if(!this._checkMoney(money)){
            if(toastIsBusy) return false;
            Toast.show('你输入的金额有误',{
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow(){
                    toastIsBusy = true;
                },
                onHidden(){
                    toastIsBusy = false;
                }
            });
            return false;
        }
        money = parseFloat(money);
        let { categoryList,dispatch ,navigator,index,bill} = this.props;
        let category = this.state.activeCategory;
        let newBill = Object.assign({},bill,{
            description:'',
            updateTime: new Date(),
            money,
            category
        });
        dispatch(actionCreater.updateBill(index,newBill));
        navigator.pop();
    }
    _selectCategory(item){
        this.setState({
            activeCategory:item,
            activeId: item.id,
            activeColor: item.color,
            activeName: item.name,
            dataSource: dsCategory.cloneWithRows(this.props.categoryList)
        });
    }
    _generateHeader(){
        const leftButton = (<CustomButton text='列表' leftIcon={<Icon name="ios-arrow-back" size={20} color="#fff"/>} onPress={()=>this.props.navigator.pop()}/>);
        const rightButton = <CustomButton text='保存' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._saveBill()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    _generateInput(){
        const styles = StyleSheet.create({
            inputContainer:{
                height:80,
                flexDirection:'row',
                alignItems:'center'
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

        let {activeColor,activeName} = this.state;
        if(!activeColor){
            activeColor = this.props.bill.category.color;
            activeName = this.props.bill.category.name;
        }
        return (
            <View style={[styles.inputContainer,{backgroundColor:activeColor}]}>
                <View>
                    <Text  style={styles.item}>{activeName}</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput 
                        ref='money'
                        style={styles.inputTextStyle}
                        autoCapitalize="none"
                        placeholder="0.00"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        defaultValue={String(this.props.bill.money)}
                        maxLength={6}
                        onSubmitEditing={()=>this._saveBill()}
                    />
                </View>
            </View>
        );
    }
    _renderCategory(rowData,sectionId,rowId,hightRow){
        return (
            <CategoryGrid 
                rowData={rowData}
                activeId={this.state.activeId}
                selectCategory={this._selectCategory.bind(this)}
            />);
    }
    componentWillMount(){
        let { dispatch } = this.props;
        dispatch(actionCreater.getCategoryList());
    }
    render(){
        let styles = StyleSheet.create({
            emptyWrap:{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            },
            btn:{
                paddingHorizontal:20,
                paddingVertical:10,
                backgroundColor:Util.themeColor,
                borderRadius:10,
                overflow:'hidden'
            },
            text:{
                fontSize:18,
                color:'#fff',
            }
        });
        let dataSource =  dsCategory.cloneWithRows(this.props.categoryList);
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                {this._generateInput()}
                <View style={{flex:1}}>
                   <ListView 
                        style={{flex:1}}
                        enableEmptySections={true}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start'
                        }}
                        keyboardDismissMode={'on-drag'}
                        initialListSize = {15}
                        pageSize = {5}
                        dataSource = {dataSource}
                        renderRow = {this._renderCategory.bind(this)}
                     />
                </View>
           </View>
        );
    }
}
export default connect(state=>{
    const {categoryList} = state;
    return {
        categoryList
    }
})(UpdateBillView);