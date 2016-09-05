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
import AddItem from './AddItem';
import actionCreater from '../Actions'
import Util from '../Utils';

let dsCategory = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});

class categoryGrid extends Component{
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
    _selectCategory(rowId){
        if(!this.active){
            this.active = true;
            this.props.selectCategory(rowId);
        }
    }
    render(){
       let {rowId,rowData,activeIndex} = this.props;
       let activeColor =  '#099';
       console.log(rowData);
       const styles = StyleSheet.create({
            iconWrap: {
                justifyContent:'center',
                alignItems:'center',
                width:40,
                height:40,
                borderRadius:20
            },
            active: {
                borderWidth: Util.pixel,
                borderColor: activeColor
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
                onPress={()=>this._selectCategory(rowId)}
                underlayColor="transparent"
                accessibilityComponentType="button"
                >
                <View style={{width:Util.size.width/4,height:50,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                    <View style={activeIndex == rowId ?  [styles.iconWrap,styles.active] : [styles.iconWrap]}>
                        <Animated.View style={ styles.iconface}>
                            <Icon 
                            name={rowData.iconName} 
                            style={{textAlign:'center'}} 
                            size={22} 
                            color={rowData.color}/>
                             <Text>{rowData.name}</Text>
                        </Animated.View>
                       
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
class AddBillView extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            dataSource: dsCategory.cloneWithRows(this.props.categoryList)
        };
    }
    _back(){
        const {navigator} = this.props;
        navigator.pop();
    }
    _addCategory(){
        this.props.navigator.push({
            title:'添加分类',
            Component: AddItem
        });
    }
    _selectCategory(item,index){
        this.setState({
            activeIndex:index,
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
                alignItems:'center',
                backgroundColor:Util.color.heart,
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
    _renderCategory(rowData,sectionId,rowId,hightRow){
        return (
            <categoryGrid 
                activeIndex={this.state.activeIndex}
                selectCategory={this._selectCategory.bind(this)}
            />);
    }
    render(){
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                {this._generateInput()}
                <View style={{flex:1,height:250}}>
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
                            dataSource = {this.state.dataSource}
                            renderRow = {this._renderCategory.bind(this)}
                        />
                        :
                        <Text>还没有任何分类,马上去添加吧!</Text>
                    }
                   <View>
                        <Text onPress={this._addCategory.bind(this)}>添加分类</Text>
                   </View>
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