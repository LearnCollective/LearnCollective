import react from "react";
import photo from '../assets/sora.jpg'
import photo2 from '../assets/back2.png'
import {signOut } from "firebase/auth";
import { auth } from "../firebase/firebase_config";

import { StyleSheet, 
    TouchableOpacity,
    Button,
    Text,
    View,
   TextInput ,
   Image,
   FlatList,
   ImageBackground ,
   ScrollView,
   Dimensions
 } from 'react-native';
import { globalstyles } from "../styles/global";


export default function Home ({navigation}){
  const signOuthandle=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('SIGNIN');
     
    }).catch((error) => {
      // An error happened.
    });
  }
    const presshandler=()=>{
        navigation.navigate('REGISTER');

    }
    const press=()=>{
        navigation.push('SIGNIN');

    }
    return(
    <View style={globalstyles.container}>
        
        <ImageBackground  style={styles.photo} source={photo2} >
          <Text style={styles.text}>Welcome</Text>
          <Button onPress={signOuthandle} title="SignOut"></Button>
        
        {/* <Button title='Sigin out' onPress={presshandler}/> */}
        {/* <View style={styles.cont}>
        <View style={styles.Tbtn}>  */}
        {/* <TouchableOpacity onPress={presshandler}><Text style={styles.teext}> SIGN IN </Text>
        </TouchableOpacity> */}
        {/* </View>
        <View style={styles.Tbtn}>  */}
      {/* <TouchableOpacity onPress={press}><Text style={styles.teext}> REGISTER </Text> */}
      {/* </TouchableOpacity> */}
        {/* </View> */}
      {/* </View> */}

      </ImageBackground>
    </View>
    

    );
}
const styles =StyleSheet.create({
    container:{
       
    },photo:{
      justifyContent:'center',
     marginLeft:-23,
     marginTop:-23,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,

    },
    text:{
      textAlign:'center'
      ,fontSize:30,
      color:'white',
      fontStyle:'italic'
      
    },Tbtn:{
        marginLeft:15,
    },teext:{
        backgroundColor:'blue'
        ,color:'#fff',
        padding:10,
      }
      ,cont:{
        flexDirection:'row',
        justifyContent:'center',
      }
});