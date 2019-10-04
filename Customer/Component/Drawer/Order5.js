import React, { Component } from 'react'
import { View, Text, Button, TextInput, ActivityIndicator, StyleSheet, Image, SafeAreaView, ScrollView,AsyncStorage } from 'react-native'
import Axios from 'axios';
import io from 'socket.io-client'



export default class Order5 extends Component {
    state = {
        riderid:1,
        ridername: "Bilal Khan",
        phoneno : '0300-1234567',
        isLoading: true
    }
    componentWillMount = async() => {
    const milk = await  AsyncStorage.getItem('Milk')
    const butter = await  AsyncStorage.getItem('Butter')
    const cream = await  AsyncStorage.getItem('Cream')
    const latitude =  '33.573907103973326'
    const longitude = '73.06533560156821'
    const farmerid = 1
    const bill = 5000
    const id = 1    
    let order = {
        milk ,
        butter,
        cream,
        latitude,
        longitude,
        farmerid,
        bill,
        id
    }
    let abc = this
    Axios.post('http://192.168.1.100:3001/customer/order',order)
    .then((res) => {
        if(res.data == 'ok'){
            
            setTimeout(function() { abc.setState({
                isLoading: false
                }) }, 10000);
        }
    })
    
        
    
    let socket = io('http://192.168.1.104:8000',{transports: ['websocket']})
    socket.on('apprider',(data) => {
        console.log('apppppp')
        console.log(data)
    })
    }
    render(){
        if(this.state.isLoading){
            return <ActivityIndicator size="large" color="#0000ff" />
        }
        else{
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#27292C'}}>
                    <Text style={{color:'white', fontSize:25}}>
                    {this.state.ridername}
                    </Text>
                    <Text style={{color:'white', fontSize:25}}>
                    {this.state.phoneno}
                    </Text>
                    <Button
                    title='Track'
                    onPress={() => this.props.navigation.navigate('Order6')}
                    />
                </View>
        )
        }
    
    }
    
    }