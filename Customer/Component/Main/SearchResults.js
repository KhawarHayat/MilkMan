import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput,ScrollView } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { GoogleAutoComplete } from 'react-native-google-autocomplete'
// import { Container, Header, Content, Item, Input, Icon, Label, Button, Form,List } from 'native-base';
// import LocationCom from './LocationCom'
import axios from 'axios'
const Place = 'AIzaSyCuuCgsgfN_uEc2EzdEU5sweVmeQi0eSFg' 



export default class SearchResults extends Component {
    static navigationOptions = {
        title: 'Search',
    };
   state = {
       location: '',
       prediction : []
   }
    handleChange = (text) => {
        this.setState({
            location : text
        })
        console.log(text)
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCuuCgsgfN_uEc2EzdEU5sweVmeQi0eSFg
        &input=${text}&radius=9000`
        axios.get(url).then((res)=> {
            console.log(res.data)
            this.setState({
                prediction : res.data.predictions
            })
        })
    }
    render() {
        const predict = this.state.prediction.map((prediction) => (
            <Text key={prediction.id}>{prediction.description}</Text>
        ))
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
              style={styles.textinput}
              placeholder='Search'
              onChangeText={(text) => this.handleChange(text)}
              value = {this.state.location}
              /> 
              {predict}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    seg: {
    backgroundColor: "white",
    padding : 5,
    fontSize:18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
    },
textinput : {
    
    width : 300,
    borderWidth: 1
}

})
