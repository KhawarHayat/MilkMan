import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
const Key = process.env.MAPS_API_KEY;

const Width = Dimensions.get('window').width

export default class Search extends Component {
    render() {
        return (
            <View>
                </View>
            
            
        )
    }

}

const styles = StyleSheet.create({
    container: {
      zIndex: 9,
      position: 'absolute',
      flexDirection: 'row',
      width: (Width - 40),
      height: 50,
      top: 80,
      left: 20,
      borderRadius: 9,
      backgroundColor: 'white',
      alignItems: 'center',
      shadowColor: 'grey',
      elevation: 9,
      shadowRadius: 15,
      shadowOpacity: 1.0
  
    }
  })

