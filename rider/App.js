import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from  './Component/Login/Login'
import MapDirection from './Component/Maps/MapDirection'
export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
