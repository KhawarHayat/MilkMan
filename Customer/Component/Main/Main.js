import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { Container, Header, Content, Item, Input, Icon, Label, Button, Form } from 'native-base';
// import Search from './Search'
// import { Ionicons } from '@expo/vector-icons'
const Key = process.env.MAPS_API_KEY;

const { width, height } = Dimensions.get('window')
const Screen_h = height
const Screen_w = width
const Aspect_Ratio = width / height
const LatitudeDelta = 0.045
const LongitudeDelta = LatitudeDelta * Aspect_Ratio

export default class Main extends Component {
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
      search: ''
    }
  }

  static navigationOptions = {
    title: 'Welcome',
  };

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
  render() {
    
    return (
      <View style = {{flex:1}}>

<TouchableOpacity style={styles.container}
            onPress = {() => {this.props.navigation.navigate("SearchResults")}}
            >
                <View>
                   <Text> Where to ? </Text>
                    </View>
            </TouchableOpacity>
        {/* <Search  /> */}
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
        </View>
      
    )
  }

}


const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: (Screen_w - 40),
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