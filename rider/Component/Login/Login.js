import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image, Alert, AsyncStorage } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import MapDirection from '../Maps/MapDirection'
import Axios from 'axios';
class Login extends Component {
    state= {
      username: '',
      password: ''
    }
handleLogin =  () => {
    let login = this.state
    Axios.post('http://192.168.1.104:3001/customer/rider/login',login)
    .then( (res) => {
        console.log(res.data)
        if(res.data == 'Password Incorrect'){
            Alert.alert('Password Incorrect')
        }
        else if (res.data == 'Incorrect UserName'){
            Alert.alert('Incorrect UserName')
        }
        else{
          
                    this.props.navigation.navigate('Login')           
        }
    })
}
     render() {
        return (
            <View style={style.container}>
                <Image 
                style={{height: 200, width: 200, borderRadius: 150, marginBottom: 30}}
                source= {{uri:'https://thedesignlove.com/wp-content/uploads/2016/10/Free-Vector-Cow-Logo-for-Dairy-Farming-Business-768x600.jpg'}}
                />
                <TextInput
                    style={style.input}
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    
                />

                <TextInput
                    style={style.input}
                    placeholder='Password'
                    secureTextEntry = {true}
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    title="Login"
                    color="#474C55"
                    onPress={this.handleLogin} />
                 
                     
                    
            </View>
        )
    }
}

const SwitchNav = createSwitchNavigator({
    Login : { screen: Login },
    Map: { screen: MapDirection }
})

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27292C'
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        borderRadius: 50,
        marginBottom: 30,
        color: "white"
    }
})

const AppContainer = createAppContainer(SwitchNav)

export default AppContainer