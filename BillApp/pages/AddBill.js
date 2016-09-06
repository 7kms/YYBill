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
            activeIndex: this.props.activeIndex,
            scaleAnim: new Animated.Value(1)
        };
    }
    _changeView(props){
        let {rowId,rowData,activeIndex} = props;
        if(rowId == activeIndex){
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
            this.props.selectCategory(rowId,rowData);
        }
    } 
    render(){
       let {rowId,rowData,activeIndex} = this.props;
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
                        style={rowId == activeIndex ? {color:rowData.color} : {color:'#999'}}
                    >{rowData.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
class AddBillView extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        };
    }
    _checkMoney(money){
        var reg = /(^[1-9]\d*\.?\d*$)|(^0\.?\d*[1-9]\d*$)/;
        if(typeof money == 'undefined'){
            return false;
        }
        return reg.test(money);
    }
    _back(){
        const {navigator} = this.props;
        navigator.pop();
    }
    _addBill(){
        let money = this.refs['money']._lastNativeText;
        if(!this._checkMoney(money)){
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
        let { categoryList,dispatch } = this.props;
        let category = categoryList[this.state.activeIndex];
        console.log(category);
        dispatch(actionCreater.addBill({
            description:'',
            time: new Date(),
            money,
            category
        }));
    }
    _addCategory(){
        this.props.navigator.push({
            title:'添加分类',
            Component: AddItem
        });
    }
    _selectCategory(index,item){
        this.setState({
            activeIndex: index,
            activeColor: item.color,
            activeName: item.name,
            dataSource: dsCategory.cloneWithRows(this.props.categoryList)
        });
    }
    _generateHeader(){
        let headerStyles = {
            wrap : {
                flexDirection:'row',
                backgroundColor:"#fff",
                height: Util.size.navHeight,
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
                borderWidth: Util.pixel,
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
                borderColor:Util.color.heart,
                color:Util.color.heart
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
            let item = this.props.categoryList[this.state.activeIndex];
            activeColor = item.color;
            activeName = item.name;
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
                        maxLength={6}
                        onSubmitEditing={()=>this._addBill()}
                    />
                </View>
            </View>
        );
    }
    _renderCategory(rowData,sectionId,rowId,hightRow){ 
        return (
            <CategoryGrid 
                rowData={rowData}
                rowId={rowId}
                activeIndex={this.state.activeIndex}
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
                height:200,
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
                {
                    this.props.categoryList.length >0 ? this._generateInput() : null
                }
                <View style={{flex:1}}>
                    {
                       this.props.categoryList.length > 0 
                       ? 
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
                        :
                        <View style={styles.emptyWrap}>
                            <Text style={{color:'#ccc',fontSize:18}}>还没有任何分类,请先创建!</Text>
                            <TouchableHighlight 
                                onPress={()=>this._addCategory()}
                                underlayColor="transparent"
                                >
                                <View style={styles.btn}>
                                    <Text style={styles.text} onPress={this._addCategory.bind(this)}>添加分类</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                   </View>
                   <View style={{height:100,flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'#eee'}}>
                        {
                            this.props.categoryList.length > 0 
                            ?
                            <TouchableHighlight 
                               onPress={this._addBill.bind(this)}
                                underlayColor="transparent"
                                >
                                <View style={styles.btn}>
                                    <Text style={styles.text} >保存账单</Text>
                                </View>
                            </TouchableHighlight>
                            :
                            null
                        }
                        <TouchableHighlight 
                            onPress={()=>this._addCategory()}
                            underlayColor="transparent"
                            >
                            <View style={styles.btn}>
                                <Text style={styles.text} onPress={this._addCategory.bind(this)}>添加分类</Text>
                            </View>
                        </TouchableHighlight>
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
})(AddBillView);