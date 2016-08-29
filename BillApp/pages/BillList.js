import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    NativeModules,
    ListView,
    TouchableHighlight,
    Modal
} from 'react-native';
import actionCreates from '../Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Header } from '../Components/public/Header';
import { CustomButton } from '../Components/public/Button';
import UpdateBillView from './UpdateBill';
import AddBill from './AddBill';
import Utils from '../Utils';
let ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged:(h1,h2) => h1!==h2
});
const styles = StyleSheet.create({
  emptyContent:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
  },
  emptyText:{
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:10,
  },
  sectionTitle:{
    height:40,
    paddingLeft:10,
    justifyContent:'center',
    backgroundColor: Utils.selectedColor,
    
  },
  titleText:{
      fontSize:18,
      color:'white',
  },
  billRow:{
      backgroundColor:'#fafafa',
      marginBottom:10,
  },
  billInfo:{
      flexDirection:'row',
      borderBottomWidth:Utils.pixel,
      borderBottomColor:Utils.selectedColor
  },
  billItem:{
      flex:1,
      height: 75,
      justifyContent:'space-around',
      alignItems:'center',
  },
  itemDfn:{
      color:'#777'
  },
  billDesc:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:8
  }
});
class BillList extends Component{
    constructor(props){
        super(props);
    }
    _goUpdateBill(bill,index){
        let {navigator} = this.props;
        console.log(bill);
        navigator.push({
            title: '账单修改',
            Component: UpdateBillView,
            bill,
            index
        });
    }
    _addBill(){
        console.log('add bill');
        let {navigator} = this.props;
        navigator.push({
            title:'添加账单',
            animate:'FloatFromBottom',
            Component: AddBill
        });
    }
    _backToNative(){
        console.log("back to native");
        let {ReactPage} = NativeModules;
        ReactPage.backToNative('react native','Beijing China',Date.now());
    }
    _renderRow(rowData, sectionID, rowID, highlightRow){
        console.log("rendersection",rowData, sectionID, rowID, highlightRow);
        return (
            <TouchableHighlight
                //activeOpacity={0.1}
                onderlayColor="#abcdef"
                onPress={()=>{
                    this._goUpdateBill(rowData,rowID);
                }}
            >
                <View style={styles.billRow}>
                   <View style={styles.billInfo}>
                        <View style={styles.billItem}>
                            <Text style={styles.itemDfn}>金额</Text>
                            <Text style={{color:'#ff9340'}}>{rowData.money}</Text>
                        </View> 
                        <View style={styles.billItem}>
                            <Text style={styles.itemDfn}>分类</Text>
                            <Text style={{color:'#777'}}>{rowData.category}</Text>
                        </View>
                        <View style={styles.billItem}>
                            <Text style={styles.itemDfn}>时间</Text>
                            <Text style={{color:'#777'}}>{rowData.time.getMonth() + '月' + rowData.time.getDate() + '日'}</Text>
                        </View>
                   </View>                   
                    <View style={styles.billDesc}>
                        <Text style={{flex:1,textAlign:'center',color:'#777'}}>备注</Text>
                        <Text style={{flex:2,textAlign:'right',marginRight:10,color:'#777'}} numberOfLines={1}>{rowData.description}</Text>
                    </View>
                </View>
                                
            </TouchableHighlight>
            
        );
    }
    _renderSection(sectionData, sectionID){
       // console.log("rendersection",sectionData, sectionID);
        return (
           <View style={styles.sectionTitle}>
             <Text style={styles.titleText}>{sectionID}</Text>
           </View> 
        );
    }
    _renderListView(){
        let { billList } = this.props;
        let dataSource, total;
        if(billList.name){
            dataSource = ds.cloneWithRowsAndSections({
                [billList.name]: billList.items
            }); 
            total = billList.items.length;
        }
        let listView = total >0 ? (
        <ListView
            style={{flex:1}}
            enableEmptySections = {true}
            contentContainerStyle={styles.listContent}
            dataSource={dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSectionHeader={this._renderSection.bind(this)}
        />
        ):(
            <View style={styles.emptyContent}>
                <Icon name="ios-outlet-outline" size={200} color={Utils.themeColor}/>
                <Text style={styles.emptyText}>什么都木有~</Text>
                <Text style={styles.emptyText} onPress={()=>this._addBill()}>点击添加~</Text>
            </View>
        );
        return listView;
    }
     _generateHeader(){
        const leftButton = (<CustomButton text='NAVITE' leftIcon={<Icon name="ios-arrow-back" size={20} color="#fff"/>} onPress={()=>this._backToNative()}/>);
        const rightButton = <CustomButton text='记一笔' rightIcon={<Icon name="ios-paper-plane" size={20} color="#fff"/>} onPress={()=>this._addBill()}/>;
        const customHeader = (<Header title={this.props.title} leftButton={leftButton} rightButton={rightButton}/>);
        return customHeader;
    }
    componentWillMount(){
        let { dispatch } = this.props;
        dispatch(actionCreates.getBillList());
    }
    render (){
        return (
            <View style={{flex:1}}>
                {this._generateHeader()}
                {this._renderListView()}
            </View>
        );
    }
}
export default connect(state=>{
    let { billList } = state;
    return {
        billList
    }
})(BillList);