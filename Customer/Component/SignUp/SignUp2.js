import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet, Image, AsyncStorage } from 'react-native'

export default class SignUp2 extends Component {
  state={
    password: '',
    cpassword: '',
  }
  handleSignup = async () => {
  await AsyncStorage.setItem('Password',this.state.password)
  await AsyncStorage.setItem('CPassword',this.state.cpassword)
  this.props.navigation.navigate('SignUp3')
  }
    render() {
        return (
            <View style= {styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                />
                <TextInput
                style={styles.input}
                    placeholder='Confirm Password'
                    onChangeText={(cpassword) => this.setState({cpassword})} 
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