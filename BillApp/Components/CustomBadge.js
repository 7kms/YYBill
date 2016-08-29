import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    wrap:{
        position:"absolute",
        justifyContent:'center',
        alignItems:'center',
        height:25,
        width:25
    },
    number:{
        color:'#fff',
        fontSize:12
    }
});
export default class CustomBadage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {badage} = this.props;
        return(
            <View style={styles.wrap}>
                <Text style={styles.number}>
                    {badage > 99 ? '99+' : badage}
                </Text>
            </View>
           
        );
    }
}