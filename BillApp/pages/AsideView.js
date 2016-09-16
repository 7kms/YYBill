import React,{Component} from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native';
const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
class AsideView extends Component{
    constructor(props){
        super(props);
    }
    _renderRow(rowData,sectionId,rowId){
      return(
        <Text>rowData</Text>
      );
    }
    render(){
        return (
            <View style={styles.drawerContainer}>
              <ListView
                contentContainerStyle={styles.listStyle}
                dataSource={ds.cloneWithRows(this.props.BillModul)}
                renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
  drawerContainer:{
    flex:1,
    backgroundColor:'#fff'
  },
  listStyle:{

  }
});
export default AsideView;
