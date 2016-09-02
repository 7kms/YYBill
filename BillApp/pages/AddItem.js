import React ,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    LayoutAnimation,
    TouchableHighlight,
    ListView
} from 'react-native';
import {connect} from 'react-redux';
import { Header } from '../Components/public/Header';
import { CustomButton } from '../Components/public/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../Utils';
import { iconColorArr } from '../Utils/color';
let IconNames =  Object.keys(Icon.glyphMap);
let dsIcon = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});
let dsColor = new ListView.DataSource({
    rowHasChanged:(r1,r2)=> r1 !== r2
});
class AddItemView extends Component{
     constructor(props){
         super(props);
         this.state = {
             iconDataSource: dsIcon.cloneWithRows(IconNames),
             colorDataSource: dsColor.cloneWithRows(iconColorArr)
         };
     }
     componentWillMount(){
         LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
     }
     _generateHeader(){
        const leftButton = (<CustomButton leftIcon={<Icon name="md-arrow-back" size={20} color="#fff"/>} onPress={()=>this._backToNative()}/>);
        const rightButton = <CustomButton text='保存' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._addBill()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    _renderIcon(){

    }
    _selectColor(color,activeColorIndex){
         //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
         this.setState({activeColorIndex});
    }
    _renderColor(rowData:string,sectionId:number,rowId,hightRow){
        console.log(rowData,sectionId,rowId)
        const styles = StyleSheet.create({
            colorBorder:{
                justifyContent:'center',
                alignItems:'center',
                width:40,
                height:40,
                borderWidth:Util.pixel,
                borderRadius:20
            },
            colorface: {
                width:20,
                height:20,
                borderRadius:10
            },
            activeface:{
                width:40,
                height:40,
                borderRadius:20
            }
        });
        return (
            <TouchableHighlight onPress={()=>this._selectColor(rowData,rowId)} underlayColor="transparent">
                <View style={{width:60,height:70,backgroundColor:'#ccc',justifyContent:'center',alignItems:'center',marginBottom:10,marginHorizontal:5}}>
                    <View style={[styles.colorBorder,{borderColor:rowData}]}>
                        <View style={ rowId==this.state.activeColorIndex ? [styles.activeface,{backgroundColor:rowData}] : [styles.colorface,{backgroundColor:rowData}]}></View>
                    </View>
                    <Text style={{color:rowData}}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
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
               <View style={{flex:1,height:250}}>
                    <Text>请选择一个图标吧</Text>
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
               </View>
               <View style={{flex:1,height:250}}>
                <Text>请选择一个颜色吧</Text>
                {
                    // <ListView 
                    //     style={{flex:1}}
                    //     contentContainerStyle={{
                    //         //justifyContent: 'space-around',
                    //         flexDirection: 'row',
                    //         flexWrap: 'wrap',
                    //         alignItems: 'flex-start'
                    //     }}
                    //     initialListSize = {15}
                    //     pageSize = {5}
                    //     dataSource = {this.state.colorDataSource}
                    //     renderRow = {this._renderColor.bind(this)}
                    // />
                }
               
               </View>
            </View>
        );
    }
}
export default connect(state=>{
    return {}
})(AddItemView);