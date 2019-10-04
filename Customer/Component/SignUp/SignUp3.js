import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput,Button,AsyncStorage } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '../Main/Map'
import axios from 'axios'
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

  handleMarker = async (e) => {
    console.log(e)
   this.setState({
     markerPosition: e
   })
        
  }
   
  handleSignup =  async () => {
    const name = await AsyncStorage.getItem('Name')
    const email = await AsyncStorage.getItem('Email')
    const password = await AsyncStorage.getItem('Password')
    const cpassword = await AsyncStorage.getItem('CPassword')
    let item = {
      name : name,
      email : email,
      password : password,
      cpassword : cpassword,
      latitude : this.state.markerPosition.latitude,
      longitude : this.state.markerPosition.longitude
    }
    
    axios.post('http://192.168.1.100:3001/customer/signup', item )
  .then((res) => {
    if(res.data == 'ok')
    {
      this.props.navigation.navigate('Login')
    }
  })
  // axios.get('http://192.168.43.125:3001/customer/').then((res) => {
  //   console.log(res.data)
  // })
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
        <Button
        title="Select"
        onPress={this.handleSignup}
        />
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
    top: 40,
    left: 20,
    borderRadius: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'grey',
    elevation: 9,
    shadowRadius: 15,
    shadowOpacity: 1.0

  },
  cust:{
    zIndex: 9,
    flex:2,
    position: 'absolute',
    flexDirection: 'row',
    width: (Screen_w - 40),
    height: 50,
    top: 40,
    left: 20,
    borderRadius: 9
  }
})

// import React, { Component } from 'react'
// import { View, Text, Button } from 'react-native'

// export default class SignUp3 extends Component {
//     render() {
//         return (
//             <View>
//                 <Text>
//                   SignUp3
//                 </Text>
//                 <Button
//               title = 'SignUp 1'
//               onPress = {() => this.props.navigation.navigate('SignUp1')}
//               />
//             </View>
//         )
//     }
// }