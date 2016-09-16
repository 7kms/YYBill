import React,{Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class More extends Component{
    render(){
        return (
          <ScrollView style={{flex:1}}>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
            <View style={styles.item}>
              <Text>ScrollView</Text>
            </View>
          </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  item:{
    height:200,
    marginVertical:10,
    backgroundColor:'#53cac3',
    justifyContent:'center',
    alignItems:'center'
  }
});
