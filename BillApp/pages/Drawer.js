import React,{Component} from 'react';
import {
    DrawerLayoutAndroid
} from 'react-native';
import AsideView from './AsideView';
class Drawer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {navigationView,setDrawer} =  this.props ;
        return (
              <DrawerLayoutAndroid
                  ref={(drawer)=>{
                    setDrawer(drawer);
                  }}
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
