import React,{Component} from 'react';
import {
    DrawerLayoutAndroid,
    View
} from 'react-native';
import AsideView from './AsideView';
console.log(AsideView);

class Drawer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {navigationView} =  this.props ;
        console.log(navigationView);
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() =><AsideView/>}
                >
                {this.props.children}
            </DrawerLayoutAndroid>
            );
        }
}
export default Drawer;