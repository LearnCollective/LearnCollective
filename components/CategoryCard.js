import React from "react";
import {TouchableOpacity,Text,ImageBackground,Image,View} from "react-native"
const icon = require('../assets/we.png');
import { AntDesign } from '@expo/vector-icons'; 
const CategoryCard=({category,containerStyle})=>{
    return(
        <TouchableOpacity >
           {/* thum */}
           <ImageBackground source={category?.image}
           resizeMode="cover"
           style={{
            width:200,
            height:150               
            ,paddingVertical:10
            ,paddingHorizontal:10,
            justifyContent:'flex-end',
            ...containerStyle
           }}
           imageStyle={{
            borderRadius:20
           }}
           >
            <Text style={{
                color:'white'
                ,fontSize:20
                ,fontWeight:'bold'
            }}
            >
                {category?.name}
            </Text>
           </ImageBackground>
           {/* Details */}
         
        </TouchableOpacity>
    )
}

export default CategoryCard;