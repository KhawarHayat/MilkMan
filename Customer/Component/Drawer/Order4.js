import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet,AsyncStorage, Image, SafeAreaView, ScrollView } from 'react-native'

export default class Order4 extends Component {
    state = {
        sum: ''
    }
    componentWillMount = async () => {
        
       let a = await AsyncStorage.getItem('Milk')
       let b = await AsyncStorage.getItem('Butter')
       let c = await AsyncStorage.getItem('Cream')
       a = a*100
       b = b*1000
       c = c*300
       let sum = a+b+c
       this.setState({
           sum
       })
       await AsyncStorage.setItem('Bill',this.state.sum)    
    }
    show =  () => {
        
        this.props.navigation.navigate('Order5')
    }
    render(){
    return (
            <View style={{flex:1, justifyContent:'center' ,alignItems:'center', backgroundColor:'#27292C'}}>
                <Text style={{color: 'white', fontSize:50}} >
               Rs{this.state.sum}/-
                </Text>
                <TouchableOpacity
                style= {{backgroundColor: '#474C55', borderRadius: 25, top:20}}
                onPress={this.show}
                >
                <Text style={{color: 'white', fontSize:30}}> Confirm Order </Text>
                </TouchableOpacity>
            </View>
    )
    }
    
    }