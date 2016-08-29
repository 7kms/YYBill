import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {CustomButton} from './Button'
import Util from '../../Utils'
const styles = StyleSheet.create({
    navigatorHeader:{
        height:Util.size.navHeight,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        backgroundColor:Util.themeColor
    },
    titleContent:{
        flex:1,
        height:44,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:18,
        color:'white'
    }
});
export class Header extends Component{
    static propTypes = {
        title:React.PropTypes.string.isRequired,
        leftButton:React.PropTypes.object,
        rightButton:React.PropTypes.object
    };
    render (){
        const {leftButton,rightButton,title} = this.props;
        return (
            <View style={styles.navigatorHeader}>
                {leftButton ? leftButton : <CustomButton />}
                <View style={styles.titleContent}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                {rightButton ? rightButton : <CustomButton />}
            </View>
        );   
    }
}