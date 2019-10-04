import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GoogleAutoComplete } from 'react-native-google-autocomplete'
import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';

export default class LocationCom extends Component {
    handlePress = () => {
        const res = this.props.fetchDetails(this.props.place_id)
        alert(JSON.stringify(res))
    }
    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={this.handlePress}>
              <Text>
                  {this.props.description}
              </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
      root: {
          height : 40,
          borderBottomWidth : StyleSheet.hairlineWidth,
          justifyContent : 'center'
      }

})