import React,{Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import actionCreaters from '../Actions';
import BillListView from './BillList';
import Finance from './Finance';
import Charts from './Charts';
import More from './More';
import Drawer from './Drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import Utils from '../Utils';
const styles = StyleSheet.create({
    itemIcon:{
        alignItems:'center',
        justifyContent:'center'
    },
    normal:{
        color:'#999'
    },
    active:{
        color:Utils.themeColor
    }
});

//
class MainPage extends Component{
    _changeTab(tag){
        let{dispatch} = this.props;
        let Tabs = {
            billList:{
                selected:false,
                badage:0
            },
            chart:{
                selected:false,
                badage:0
            },
            finance:{
                selected:false,
                badage:0
            },
            more:{
                selected:false,
                badage:0
            }
        };
        let currentTab = {
            [tag]:{
                selected:true,
                badage:0
            }
        };
        dispatch(actionCreaters.changeTab({...Tabs,...currentTab}));
    }
    _setDrawer(drawer){
      this.drawer = drawer;
    }
    _openDrawer(){
      this.drawer.openDrawer();
    }
    render(){
        let {tabStatus,navigator} = this.props;
        let iconSize = 25;
        return (
            <Drawer setDrawer={(drawer)=>this._setDrawer(drawer)}>
                <TabNavigator>
                    <TabNavigator.Item
                        titleStyle={styles.normal}
                        selectedTitleStyle={styles.active}
                        selected={tabStatus.billList.selected}
                        title="记账"
                        renderIcon={() => <Icon name="ios-list-box-outline" style={styles.itemIcon} size={iconSize} color='#999'/>}
                        renderSelectedIcon={() => <Icon name="ios-list-box-outline" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('billList')}
                        >
                        {
                            <BillListView navigator={navigator} title="账单" openDrawer={()=>this._openDrawer()}/>
                        }
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        titleStyle={styles.normal}
                        selectedTitleStyle={styles.active}
                        selected={tabStatus.finance.selected}
                        title="资金"
                        renderIcon={() => <Icon name="logo-bitcoin" style={styles.itemIcon} size={iconSize} color='#999'/>}
                        renderSelectedIcon={() => <Icon name="logo-bitcoin" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('finance')}>
                        {
                        <Finance />
                        }
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        titleStyle={styles.normal}
                        selectedTitleStyle={styles.active}
                        selected={tabStatus.chart.selected}
                        title="报表"
                        renderIcon={() => <Icon name="ios-pulse-outline" style={styles.itemIcon} size={iconSize} color='#999'/>}
                        renderSelectedIcon={() => <Icon name="ios-pulse" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('chart')}>
                       {
                        <Charts />
                       }
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        titleStyle={styles.normal}
                        selectedTitleStyle={styles.active}
                        selected={tabStatus.more.selected}
                        title="我的"
                        renderIcon={() => <Icon name="ios-at-outline" style={styles.itemIcon} size={iconSize} color='#999'/>}
                        renderSelectedIcon={() => <Icon name="ios-at" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('more')}>

                        {
                            <More />
                        }
                    </TabNavigator.Item>

                </TabNavigator>
            </Drawer>

        );
    }
}
export default connect((state)=>{
    const {tabStatus,billList} = state;
    return{
        tabStatus,
        billList
    }
})(MainPage);
