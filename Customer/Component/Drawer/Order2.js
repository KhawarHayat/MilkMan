import React, { Component } from 'react'
// import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left, Thumbnail, AsyncStorage } from  'native-base'
import StarRating from 'react-native-star-rating';

export default class Order2 extends Component {
     state = {
         id: ''
     }
     handle =  (e) => {
       this.setState({
           id : e
       })  
       this.props.navigation.navigate('Order3')
     }

    render(){
        console.log(this.state.id)
        let arr = [
            {
                id : 1,
                name : 'Khawar',
                rating : 4,
                Order : 1235
            },
            {
                id : 2,
                name : 'Abdul',
                rating : 3.5,
                Order : 1335
            },
            {
                id : 3,
                name : 'Asad',
                rating : 3,
                Order : 1245
            },
            {
                id : 4,
                name : 'Kaleem',
                rating : 2.5,
                Order : 1235
            },
        ]

        arr = arr.map((value) => {
         return(
             <Card key={value.id}>
            <CardItem header button onPress={() => {this.handle(value.id)}}>
                <Left>
                <Thumbnail source = {{uri : 'https://thedesignlove.com/wp-content/uploads/2016/10/Free-Vector-Cow-Logo-for-Dairy-Farming-Business-768x600.jpg'}} />
              <Text>{value.name}</Text>
              </Left>
            </CardItem>
            <CardItem >
            <Left>
                        
                    
              <Body>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={value.rating}
                fullStarColor={'yellow'}
               
      />
              </Body>
              </Left>
              
            </CardItem>
            <CardItem >
              <Text>{value.Order}</Text>
            </CardItem>
          </Card>

         )
        })
        
    return (
          <Container>
        <Content padder>
          {arr}
        </Content>
      </Container>
      
    );
  }
}