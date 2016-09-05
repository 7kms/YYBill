import React ,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    Animated,
    ListView
} from 'react-native';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { Header } from '../Components/public/Header';
import { CustomButton } from '../Components/public/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../Utils';
import { iconColorArr } from '../Utils/color';
import actionCreater from '../Actions';
let toastIsBusy = false;
let IconNames =  Object.keys(Icon.glyphMap).filter((name,index)=>{
    return index % 15 == 1;
});
let dsIcon = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});
let dsColor = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});
class ColorGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeColorIndex: this.props.activeColorIndex,
            scaleAnim: new Animated.Value(1)
        };
    }
    _changeView(props){
        let {rowId,rowData,activeColorIndex} = props;
        if(rowId == activeColorIndex){
           this.active = true;
           this.shouldupdate = true;
           Animated.timing(
            this.state.scaleAnim,
            {
                toValue:1.8,
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
    shouldComponentUpdate(nextProps,nextState){
        return this.shouldupdate;
    }
    _selectColor(rowId){
        if(!this.active){
            this.active = true;
            this.props.selectColor(rowId);
        }
    }
    render(){
       const styles = StyleSheet.create({
            colorBorder:{
                justifyContent:'center',
                alignItems:'center',
                width:40,
                height:40,
                borderWidth:2*Util.pixel,
                borderRadius:20
            },
            colorface: {
                width:20,
                height:20,
                transform:[
                    {scale:this.state.scaleAnim.interpolate({
                        inputRange:[1,2],
                        outputRange:[1,2]
                    })}
                ],
                borderRadius:10,
                backgroundColor:this.props.rowData,
            }
        });
        let {rowId,rowData} = this.props;
        return (
            <TouchableHighlight 
            onPress={()=>this._selectColor(rowId)}
            underlayColor="transparent"
            accessibilityComponentType="button"
            >
                <View style={{width:Util.size.width/4,height:50,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                    <View style={[styles.colorBorder,{borderColor:rowData}]}>
                        <Animated.View style={ styles.colorface}></Animated.View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
class IconGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIconIndex: this.props.activeIconIndex,
            scaleAnim: new Animated.Value(1)
        };
    }
    _changeView(props){
        let {rowId,rowData,activeIconIndex} = props;
        if(rowId == activeIconIndex){
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
    _selectIcon(rowId){
        if(!this.active){
            this.active = true;
            this.props.selectIcon(rowId);
        }
    }
    render(){
       let {rowId,rowData,activeIconIndex,activeColorIndex} = this.props;
       let activeColor =  iconColorArr[activeColorIndex];
       const styles = StyleSheet.create({
            iconWrap:{
                justifyContent:'center',
                alignItems:'center',
                width:40,
                height:40,
                borderRadius:20
            },
            active:{
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
                onPress={()=>this._selectIcon(rowId)}
                underlayColor="transparent"
                accessibilityComponentType="button"
            >
                <View style={{width:Util.size.width/4,height:50,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                    <View style={activeIconIndex == rowId ?  [styles.iconWrap,styles.active] : [styles.iconWrap]}>
                        <Animated.View style={ styles.iconface}>
                            <Icon 
                            name={rowData} 
                            style={{textAlign:'center'}} 
                            size={22} 
                            color={activeIconIndex == rowId ? activeColor : '#777'}/>
                        </Animated.View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
class ResultPanle extends Component{
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            resultWrap:{
                height:50,
                borderWidth:Util.pixel,
                flexDirection:'row',
            },
            iconContent:{
                alignItems:'flex-end',
                justifyContent:'center',
                width:60,
                height:50,
            },
            textContent:{
                flex:1,
                marginLeft:30,
                justifyContent:'center',
            },
            text:{
                color:'#777'
            }
        });
    }
    _submit(){
        this.props.submit();
    }
    render(){
        let {name=IconNames[0],color=iconColorArr[0]} = this.props;
        let styles = this.styles;
        return (
                <View style={styles.resultWrap}>
                    <View style={styles.iconContent}>
                        <Icon name={name} color={color} style={{textAlign:'center'}} size={38} />
                    </View>
                    <View style={styles.textContent}>
                        <TextInput 
                            style={styles.text}
                            ref={(textInput)=>{
                                this.props.setTextInput(textInput);
                            }}
                            placeholderTextColor="#777"
                            placeholder="请输入类别的名称"
                            autoCapitalize={'none'}
                            autoFocus={true}
                            maxLength={15}
                            onSubmitEditing={()=>this._submit()}
                            clearButtonMode="while-editing"
                        />
                    </View>
               </View>
        );
    }
}
class AddItemView extends Component{
     constructor(props){
         super(props);
         this.state = {
             activeColorIndex: 0,
             activeIconIndex: 0,
             iconDataSource: dsIcon.cloneWithRows(IconNames),
             colorDataSource: dsColor.cloneWithRows(iconColorArr)
         };
     }
     _checkCategory(category){
         if(!category){
             return false;
         }
         let reg = /(^\s*)|(\s*$)/ig;
         let str = category.replace(reg,'');
         return str.length > 1 && str.length < 10;
     }
     _save(){
         let name = this.textInput._lastNativeText;
         if(!this._checkCategory(name)){
           if(toastIsBusy)return false;
           Toast.show('输入有误!', {
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
         let { dispatch } = this.props;
         let iconName = IconNames[this.state.activeIconIndex];
         let color = iconColorArr[this.state.activeColorIndex];
         let id = Util.guid();
         dispatch(actionCreater.addCategory({
                id,
                name,
                iconName,
                color
         }));
         this.props.navigator.pop();
     }
     _setTextInput(textInput){
         this.textInput = textInput;
     }
     _generateHeader(){
        const leftButton = (<CustomButton leftIcon={<Icon name="md-arrow-back" size={20} color="#fff"/>} onPress={()=>this.props.navigator.pop()}/>);
        const rightButton = <CustomButton text='保存' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._save()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    _selectColor(activeColorIndex){
         this.setState({
                activeColorIndex,
                colorDataSource:dsColor.cloneWithRows(iconColorArr)
             });
    }
    _selectIcon(activeIconIndex){
         this.setState({
                activeIconIndex,
                iconDataSource: dsIcon.cloneWithRows(IconNames)
             });
    }
    _renderColor(rowData:string,sectionId:number,rowId,hightRow){
        return (<ColorGrid 
                rowData={rowData} 
                rowId={rowId} 
                activeColorIndex={this.state.activeColorIndex}
                selectColor = {this._selectColor.bind(this)}
                />);
    }
    _renderIcon(rowData:string,sectionId:number,rowId,hightRow){
        return (<IconGrid 
                rowData={rowData} 
                rowId={rowId} 
                activeColorIndex={this.state.activeColorIndex}
                activeIconIndex={this.state.activeIconIndex}
                selectIcon = {this._selectIcon.bind(this)}
                />);
    }
    render(){
        return (
            <View style={{flex:1}}>
               {this._generateHeader()}
               <ResultPanle 
                name={IconNames[this.state.activeIconIndex]}
                color={iconColorArr[this.state.activeColorIndex]}
                submit={this._save.bind(this)}
                setTextInput = {this._setTextInput.bind(this)}
               />
               <View style={{flex:1,height:250}}>
                    <Text>请选择一个图标吧</Text>
                    <ListView 
                        style={{flex:1}}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start'
                        }}
                        keyboardDismissMode={'on-drag'}
                        initialListSize = {15}
                        pageSize = {5}
                        dataSource = {this.state.iconDataSource}
                        renderRow = {this._renderIcon.bind(this)}
                    />
               </View>
                <View style={{flex:1,height:250}}>
                <Text>请选择一个颜色吧</Text>
                <KeyboardAvoidingView behavior={"padding"} style={{flex:1}}>
                    <ListView 
                            style={{flex:1}}
                            contentContainerStyle={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'flex-start'
                            }}
                            initialListSize = {15}
                            pageSize = {5}
                            dataSource = {this.state.colorDataSource}
                            renderRow = {this._renderColor.bind(this)}
                        />
                    </KeyboardAvoidingView>
               </View>
            </View>
        );
    }
}
export default connect(state=>{
    return {}
})(AddItemView);