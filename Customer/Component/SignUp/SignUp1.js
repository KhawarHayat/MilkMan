import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Image, AsyncStorage } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import SignUp2 from './SignUp2'
import SignUp3 from './SignUp3'
class SignUp1 extends Component {
    state={
        name: '',
        email:''
    }
    handleSignup = async () => {
         await AsyncStorage.setItem('Name',this.state.name)
         await AsyncStorage.setItem('Email',this.state.email)  
         this.props.navigation.navigate('SignUp2')
    }
    render() {
        return (
            <View style={styles.container}>
            <Image 
                style={{height: 200, width: 200, borderRadius: 150, marginBottom: 30}}
                source= {{uri:'https://thedesignlove.com/wp-content/uploads/2016/10/Free-Vector-Cow-Logo-for-Dairy-Farming-Business-768x600.jpg'}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    onChangeText={(name) => this.setState({name})}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='email@email.com'
                    onChangeText={(email) => this.setState({email})}
                
                />
              <Button
              title = 'Next ->'
              color="#474C55"
              onPress = {this.handleSignup}
              />
            </View>
        )
    }
}

const SignUp = createStackNavigator({
    SignUp1 : { screen : SignUp1 },
    SignUp2 : { screen : SignUp2 },
    SignUp3 : { screen : SignUp3 }
})

module.exports = SignUp

const styles = StyleSheet.create(
    {
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
    }
)