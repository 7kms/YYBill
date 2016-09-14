import React,{Component} from 'react';
import { View,Text } from 'react-native';

export default class AsideView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{flex: 1, alignItems: 'center',backgroundColor:'#53cac3'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本1</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本2</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本1</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本2</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本1</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>记事本2</Text>
             </View>
        );
    }
}