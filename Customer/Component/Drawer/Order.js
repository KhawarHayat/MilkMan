import { createStackNavigator } from 'react-navigation'
import Order2 from './Order2'
import Order3 from './Order3'
import Order4 from './Order4'
import Order5 from './Order5'
import Order6 from './Order6'

import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput,Button , AsyncStorage} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '../Main/Map'
import Axios from 'axios';
// import { GoogleAutoComplete } from 'react-native-google-places-autocomplete'
// import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
// import Search from './Search'
// import { Ionicons } from '@expo/vector-icons'
let longitude = ''
let latitude = ''
const Key = "AIzaSyAShbICxy7SNcUYIu2g06B1fULCssZ-KoI" ;
const autoKey = "AIzaSyCuuCgsgfN_uEc2EzdEU5sweVmeQi0eSFg"

const { width, height } = Dimensions.get('window')
const Screen_h = height
const Screen_w = width
const Aspect_Ratio = width / height
const LatitudeDelta = 0.045
const LongitudeDelta = LatitudeDelta * Aspect_Ratio

 class Order1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
      search: '',
      loc: ''
    }
  }

  static navigationOptions = {
    title: 'Welcome',
  };
 handle = (arg) =>{
this.setState({
  loc: arg
})
console.log(this.state.loc)
return;
 }
  componentWillMount() {

    this.getCurrentLocation()
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastregion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LatitudeDelta,
        longitudeDelta: LongitudeDelta,
      }

      this.setState({
        region: lastregion
      })
      this.setState({
        markerPosition: lastregion
      })
    })
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var region = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LatitudeDelta,
        longitudeDelta: LongitudeDelta,
      }

      this.setState({
        region: region
      })
      this.setState({
        markerPosition: region
      })
      console.log(this.state.region)
    },
      (error) => alert(error),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

    )
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  handleMarker = (e) => {
    console.log(e)
   this.setState({
     markerPosition: e
   })
  }
 handleSelect = async() => {
  this.props.navigation.navigate('Order2')
    await AsyncStorage.setItem('OLlatitude',this.state.markerPosition.latitude)
    await AsyncStorage.setItem('OLlongitude',this.state.markerPosition.longitude)
    
 }

 handleHome = async() => {
   let id = 1
   Axios.get('http://192.168.1.100:3001/customer/'+id+'/homelocation')
   .then((res) => {
     console.log(res.data)
     latitude = res.data.latitude
     longitude = res.data.longitude
     this.props.navigation.navigate('Order2') 
    })
    await AsyncStorage.setItem('OLlatitude',latitude)
    await AsyncStorage.setItem('OLlongitude',longitude)
    
}
  render() {
    
    return (
      <View style = {{flex:1}}>
      <View>
          <Text style={{ fontWeight: "bold" }}> {this.state.loc}</Text>
        </View>
      <View style={{flex:2}}>
          <Map handler={this.handle} />
        </View>
          
          {/* <TouchableOpacity style={styles.container}>
            <Text>
              Where to ?
            </Text>
            </TouchableOpacity> */}
        <MapView
          style={{ flex: 5 }}
          apikey={Key}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          showsCompass={true} 
          onPress = {(e) => this.handleMarker(e.nativeEvent.coordinate)}
          >
          <MapView.Marker
            coordinate={this.state.markerPosition}
            >
          </MapView.Marker>
        </MapView>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
        <Button
        style={{backgroundColor: 'grey'}}
        title="Select"
        onPress={this.handleSelect}
        />
        <Button
        title="Home"
        onPress={this.handleHome}
        />
        </View>
        </View>
      
    )
  }

}



const Order = createStackNavigator({
    Order1 : { screen : Order1 },
    Order2 : { screen : Order2 },
    Order3 : { screen : Order3 },
    Order4 : { screen : Order4 },
    Order5 : { screen : Order5 },
    Order6 : { screen : Order6 }
})

export default Order