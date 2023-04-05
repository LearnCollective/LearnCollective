
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View,Button, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from 'react-native-vector-icons/FontAwesome';
//import * as Progress from 'react-native-progress';
const slides =[
  {
    key:"one",
    title:"Welcome",
    text:"Welcome to this App",
    image: require("../assets/Logooo.png"),

  },
  {
    key:"two",
    title:"Welcome",
    text:"Welcome to this App",
    image: require("../assets/Logoo.png"),
  },
  {
    key:"three",
    title:"Welcome",
    text:"Welcome to this App",
    image: require("../assets/logo4.png"),
  },
];



export default class OnboardingScreen extends React.Component {
state={showHomePage:false};
_renderItem=({item})=>{

    // const pp = () =>{
    //     navigation.navigate('Home');
    // }
  return(
    <View style = {{flex:1}}>
<Image
source={item.image}
style = {{
  resizeMode:"cover",
  height:"73%",
  width:"100%",
}}
/>
<Text
  style = {{
   
    paddingTop:25,
    paddingBottom:400,
    fontSize:23,
    fontWeight:"bold",
    color:'blue',
    alignSelf:"center"
  }}>
  {item.title}
</Text>

<Text style = {{
  textAlign:'center',
  color:'blue',
  fontSize:20,
  paddingHorizontal:30,
}}>
  {item.text}
</Text>
    </View>
  )
}
_renderNextButton=()=>{
  return(
    <View style={styles.buttonCircle}>
      <Icon
      
      name="chevron-right"
      color="white"
      size={24}
     
      />
    
    </View>
  )
}
_renderDoneButton=()=>{
    const press = () => {
        navigation.navigate('Home');
      }
  return(
    <View style = {styles.buttonCircle}>


<Button onPress={() => this.props.navigation.navigate('Home')}
  icon={{
    name: "check",
    size:24,
    color: "white"
  }}
/>
        {/* <TouchableOpacity  >
            {/* <Icon button type ="check" 
      
    //    name="check"
    //    color="white"
    //   size={24}
      /> */}
      
        {/* </TouchableOpacity>  */}
      
    </View>
  )
}


  render(){
    if(this.state.showHomePage){
      return(<App/>
      
        )
    }else
    return(
      
     <AppIntroSlider
     renderItem={this._renderItem}
     data={slides}
    renderDoneButton={this._renderDoneButton}
    renderNextButton={this._renderNextButton}
    
     activeDotStyle={{
       backgroundColor:"blue",
       width:30
     }}
     />
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCircle:{
  width:41,
  height:41,
  backgroundColor:'blue',
  borderRadius:30,
  justifyContent:"center",
  alignItems:"center"
  }
 
});