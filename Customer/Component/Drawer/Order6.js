import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput,Button , AsyncStorage} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '../Main/Map'
import Axios from 'axios';
// import { GoogleAutoComplete } from 'react-native-google-places-autocomplete'
// import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
// import Search from './Search'
// import { Ionicons } from '@expo/vector-icons'

const Key = "AIzaSyAShbICxy7SNcUYIu2g06B1fULCssZ-KoI" ;
const autoKey = "AIzaSyCuuCgsgfN_uEc2EzdEU5sweVmeQi0eSFg"

const { width, height } = Dimensions.get('window')
const Screen_h = height
const Screen_w = width
const Aspect_Ratio = width / height
const LatitudeDelta = 0.045
const LongitudeDelta = LatitudeDelta * Aspect_Ratio

export default class Order6 extends Component {
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
      loc: '',
      riderMarker:{
        latitude: 33.57822843316202,
        longitude: 73.07166092097759,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,  
      },
      markers: [{
        title: 'Customer',
        coordinates: {
            latitude: 33.57822843316202,
            longitude: 73.07166092097759,
        },
      },
      {
        title: 'Rider',
        coordinates: {
            latitude: 33.583405921857725,
            longitude: 73.05430937558413,
        },  
      }]
    }
  }

  static navigationOptions = {
    title: 'Rider',
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
  }
 

 
  render() {
    
    return (
      <View style = {{flex:1}}>
          
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
          {this.state.markers.map(marker => (
         <MapView.Marker 
         coordinate={marker.coordinates}
         title={marker.title}
         />
         ))}
          
        </MapView>
        
        </View>
      
    )
  }

}
