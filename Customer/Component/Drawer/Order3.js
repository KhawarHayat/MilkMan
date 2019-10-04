import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, AsyncStorage, Image, SafeAreaView, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

export default class Order3 extends Component {
    state = {
        milk : '0',
        butter: '0',
        cream : '0'
    }
    onChangedMilk = (text) => {
        let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
     this.setState({milk : newText})
     console.log(this.state.milk)
    }

    onChangedButter = (text) => {
        let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
        this.setState({butter : newText})
        console.log(this.state.butter)
       }

       onChangedCream = (text) => {
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        
            
        
        
            this.setState({cream : newText})
        console.log(this.state.cream)
        
       }
    show = async () => {
        await AsyncStorage.setItem('Milk', this.state.milk);
        await AsyncStorage.setItem('Butter', this.state.butter);
        await AsyncStorage.setItem('Cream', this.state.cream);
        this.props.navigation.navigate('Order4')
        
    }
    render(){
    return (
            <View style={{flex:1, justifyContent:'center', alignItems:"center", backgroundColor:'#27292C'}}>
                    <Text
                    style={{color : 'white', fontSize: 25}}
                    >
                     Milk
                     </Text>
                    <TextInput
                style = {styles.input}
                keyboardType='numeric'
               placeholder = 'Milk'
              onChangeText = {(text)=> this.onChangedMilk(text)}
             value = {this.state.milk}
                />
                 
                <Text
                    style={{color : 'white', fontSize: 25}}
                    >
                     Butter
                     </Text>
                <TextInput
                style = {styles.input}
                keyboardType='numeric'
                placeholder = 'Butter'
                onChangeText = {(text)=> this.onChangedButter(text)}
                value = {this.state.butter}
                />

                <Text
                    style={{color : 'white', fontSize: 25}}
                    >
                     Cream
                     </Text>
                <TextInput
                style = {styles.input}
                keyboardType='numeric'
                placeholder = 'Cream'
                onChangeText = {(text)=> this.onChangedCream(text)}
                value = {this.state.cream}
                />
                <Button
                title="Confirm"
                onPress={this.show}
                color="#474C55"
                />
            </View>
    )
    }
    
    }

    const styles = StyleSheet.create({
        input : {
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