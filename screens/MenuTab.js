import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View,Text ,StyleSheet, TouchableOpacity,Image, Animated, Dimensions} from 'react-native';
import "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {FontAwesome} from '@expo/vector-icons'

import plus from "../assets/pluus.png";


const Tab =createBottomTabNavigator();

export default function MenuTab  () {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;



  return(
  <NavigationContainer>
    <Tab.Navigator  tabBarOptions={{
      showLabel:false,

      style:{
        backgroundColor:'white',
        position:'absolute',
        bottom: 40,
        marginHorizontal: 20,
        // Max Height...
        height: 60,
        borderRadius: 10,
        // Shadow...
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10
        },
        paddingHorizontal: 20,
      }
    }}
      

      
    
   >


   <Tab.Screen name={"Home"} component={HomeScreen}  options={{
    tabBarIcon:({focused}) =>(
      <View  style={{
        position:'absolute',
        top:'30%'
      }}>
        <FontAwesome  
        name="home"
        size={20}
        
        color={focused ? 'blue' : 'gray'}
        >
          

        </FontAwesome>
      </View>
    )
   }} listeners={({navigation,route}) => ({
    tabPress: e =>{
      Animated.spring(tabOffsetValue,{toValue:0 ,useNativeDriver:true}).start();
    }
    
   })}></Tab.Screen>
   <Tab.Screen name={"Search"}  component={SearchScreen} options={{
    tabBarIcon:({focused}) =>(
      <View  style={{
        position:'absolute',
        top:'30%'
      }}>
        <FontAwesome  
        name="search"
        size={20}
        color={focused ? 'blue' : 'gray'}
        >
          

        </FontAwesome>
      </View>
    )
   }}   listeners={({navigation,route}) => ({
    tabPress: e =>{
      Animated.spring(tabOffsetValue,{toValue:getWidth() *1.099,useNativeDriver:true}).start();
    }
    
   })}></Tab.Screen>



   <Tab.Screen name ={"ActionButton"}  component={EmptyScreen}  options={{
    tabBarIcon:({focused}) =>(
        <TouchableOpacity>
          <View style ={{
            width:55,
            height:55,
            backgroundColor:'blue',
            borderRadius:'130%',
            justifyContent:'center',
            alignItems:'center',
            marginBottom:35,
            
            }}>
            <Image  source={plus}  style={{
              width:22,
              height:22,
              tintColor:'white',
               

            }}></Image>
          </View>
        </TouchableOpacity>
    
    
      )

   }}></Tab.Screen>

   <Tab.Screen name={"Notifications"}  component={NotificationsScreen}  options={{
    tabBarIcon:({focused}) =>(
      <View  style={{
        position:'absolute',
        top:'30%'
      }}>
        <FontAwesome  
        name="bell"
        size={20}
        
        color={focused ? 'blue' : 'gray'}
        >
          

        </FontAwesome>
      </View>
    )
   }}  listeners={({navigation,route}) => ({
    tabPress: e =>{
      Animated.spring(tabOffsetValue,{toValue:getWidth() *3.54,useNativeDriver:true}).start();
    }
    
   })}></Tab.Screen>


   <Tab.Screen name={"Profile"}   component={ProfileScreen}  options={{
    tabBarIcon:({focused}) =>(
      <View  style={{
        position:'absolute',
        top:'30%'
      }}>
        <FontAwesome  
        name="user"
        size={20}
        
        color={focused ? 'blue' : 'gray'} 
        >
          

        </FontAwesome>
      </View>
    )
   }}  listeners={({navigation,route}) => ({
    tabPress: e =>{
      Animated.spring(tabOffsetValue,{toValue:getWidth() *4.75,useNativeDriver:true}).start();
    }
    
   })} ></Tab.Screen>
   
   
    </Tab.Navigator>

<Animated.View style={{
      width:getWidth() -16,
      height:2,
      backgroundColor:'blue',
      position:'absolute',
      bottom:45,
      left:15,
      borderRadius:'100%',

      transform:[
        {translateX:tabOffsetValue}
      ]


      
    }}>

    </Animated.View>
  </NavigationContainer>
  );
}

function getWidth(){
  let width = Dimensions.get("window").width

  width = width-60

  return width/5
}




function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
    </View>
  );
}





function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}



function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}




function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications</Text>
    </View>
  );
}


function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
    </View>
  );
}











const styles=StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:"center",
    justifyContent:"center",
    
    
  },
});