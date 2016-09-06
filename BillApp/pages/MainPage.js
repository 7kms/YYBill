import React,{Component} from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import actionCreaters from '../Actions';
import CustomBadgeView from '../Components/CustomBadge';
import BillListView from './BillList';
import NotifyView from './Notify';

import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import Utils from '../Utils';
const styles = StyleSheet.create({
    itemIcon:{
        width:100,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center'
    }
});
class MainPage extends Component{
    _changeTab(tag){
        let{dispatch} = this.props;
        let Tabs = {
            billList:{
                selected:false,
                badage:0
            },
            notify:{
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
    render(){
        let {tabStatus,navigator} = this.props;
        let iconSize = 25;
        return (
                <TabNavigator>
                    <TabNavigator.Item
                        selected={tabStatus.billList.selected}
                        title="记账"
                        renderIcon={() => <Icon name="ios-list-box-outline" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        renderSelectedIcon={() => <Icon name="ios-list-box-outline" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('billList')}
                        badgeText={1}
                        >
                        <BillListView navigator={navigator} title="账单"/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabStatus.chart.selected}
                        title="报表"
                        renderIcon={() => <Icon name="ios-pulse-outline" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        renderSelectedIcon={() => <Icon name="ios-pulse" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('chart')}>
                         <View>
                            <Text>报表</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabStatus.finance.selected}
                        title="资金"
                        renderIcon={() => <Icon name="logo-bitcoin" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        renderSelectedIcon={() => <Icon name="logo-bitcoin" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('finance')}>
                        <View>
                            <Text>资金</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabStatus.more.selected}
                        title="更多"
                        renderIcon={() => <Icon name="ios-at-outline" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        renderSelectedIcon={() => <Icon name="ios-at" style={styles.itemIcon} size={iconSize} color={Utils.themeColor}/>}
                        onPress={() => this._changeTab('more')}>
                        <View>
                            <Text>更多</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
        );
    }
}
export default connect((state)=>{
    const {tabStatus} = state;
    return{
        tabStatus
    }
})(MainPage);