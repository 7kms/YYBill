import React,{Component} from 'react';
import {StatusBar} from 'react-native';

class CustomStatusBar extends Component{
    render(){
        <StatusBar {...this.props}/>
    }
}

export default CustomStatusBar;