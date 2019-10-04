import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import MyOrders from './MyOrders'
import Wallet from './Wallet'
import ChangeDefault from './ChangeDefault'
import GetHelp from './GetHelp'
import Order from '../Drawer/Order'
class Home1 extends Component {
render(){
return (
    <View style={{flex:1, justifyContent:'center'}}>
            <Text>
             Home1
            </Text>
        </View>
)
}

}


const Drawer = new createDrawerNavigator({
    Home : { screen : Order },
    Order : { screen : MyOrders },
    Wallet : { screen : Wallet },
    ChangeDefault : { screen : ChangeDefault},
    GetHelp : { screen : GetHelp }
}
)



export default Drawer