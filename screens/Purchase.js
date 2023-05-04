import React, { useState } from 'react';
// import { Alert } from 'react-native';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, TouchableOpacity,Dimensions } from 'react-native';
import { ListItem, SocialIcon } from 'react-native-elements';
import { PaymentIcon } from 'react-native-payment-icons'
import { height, width } from 'styled-system';
//import CreditCard from 'react-native-credit-card';
//import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Linking } from 'react-native';



//const Stack = createNativeStackNavigator();
export default function Purchase() {
  

    return (
   
      

<ImageBackground
          
         
            source={require('../assets/back2.png')}

            style={{
              height: Dimensions.get('window').height
            }}>
            <View style={styles.brandView}>
            <Text style={{ color: 'white', fontSize: 45 ,marginTop:35,marginLeft:75}}>Purchase</Text>

            <View style={styles.PaymentView}>

            <Text style={{ color: 'white', fontSize: 35 ,marginTop:-7,marginRight:-25}}>You can pay via :</Text>

<Image style={{
            marginTop: -450,
            width: 570,
            height: 350,
            marginRight:-300
          }}
            source={require('../assets/credit.png')}
          />
        
        
<TouchableOpacity Icon style={ { width: 100, height: 40 }} rounded >


 <PaymentIcon button type='visa' onPress />
 
</TouchableOpacity>
<TouchableOpacity Icon style={[  { width: 100, height: 40 }]} rounded >
 <PaymentIcon button type='master' />
</TouchableOpacity>
<TouchableOpacity Icon style={[ { width: 100, height: 40 }]} rounded >
 <PaymentIcon button type='maestro' />
</TouchableOpacity>
<TouchableOpacity Icon style={[ { width: 100, height: 40 }]} rounded >
 <PaymentIcon button type='paypal' />
</TouchableOpacity>
<TouchableOpacity Icon style={[ { width: 100, height: 40 }]} rounded >
 <PaymentIcon button type='american-express
amex' />
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