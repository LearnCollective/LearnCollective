import React, { useState } from 'react';
// import { Alert } from 'react-native';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, TouchableOpacity,Dimensions } from 'react-native';
import { ListItem, SocialIcon } from 'react-native-elements';
import { PaymentIcon } from 'react-native-payment-icons'
import { height, width } from 'styled-system';
import { AntDesign } from '@expo/vector-icons'; 

//import CreditCard from 'react-native-credit-card';
//import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Linking } from 'react-native';
import Profile from './Profile';

export default function Cart() {
    const presshandler = () => {
        navigation.navigate('Home');
    
      }
      
      const dummyData = {
    
        courses_list_1: [
          {
            id: 1,
            title: "Introduction to Computer Science",
            instructor: "John Doe",
            image: require("../assets/we.png"),
            description: "Learn the fundamentals of computer science.",
            duration: "4 weeks",
            price: "$49.99"
          } 
          ]  }  
    return (
<ImageBackground
          
         
          source={require('../assets/back2.png')}

          style={{
            height: Dimensions.get('window').height
          }}>
          <View style={styles.brandView}>
          <Text style={{ color: 'white', fontSize: 50 ,marginTop:35,marginLeft:60}}>Cart</Text>

          <View style={styles.PaymentView}>
          <TouchableOpacity onPress={presshandler}><AntDesign name="left" size={40} color="white" style={{marginLeft:-300,marginTop:-550}} /></TouchableOpacity>


<Image style={{
          marginTop: -450,
          width: 570,
          height: 350,
          marginRight:-300
        }}
        />
      
      
      <TouchableOpacity> 

      <TouchableOpacity onPress={presshandler}><button onClick={() => handleClick(item) }style={{marginRight:400,marginTop:-70}}>CheckOut </button></TouchableOpacity>

      <TouchableOpacity onPress={presshandler}><button onClick={() => handleClick(item) }style={{marginRight:400,marginTop:-20}}>Continue in LearnCollective </button></TouchableOpacity>
              </TouchableOpacity>




</View>
            
          </View>
        </ImageBackground>
        
  )

}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',


  },
 PaymentView: {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-around'
  , marginTop: 500,
  width:1000,
 marginLeft:200,
 height:200,
 marginRight:200,
},

 errors: {
  fontSize: 14,
  color: 'red',
  fontWeight: 'bold'
  , marginTop: 20,
    },
  brandView:{
flex: 1,
  justifyContent: 'center',
  alignItems: 'center'


  }  
})