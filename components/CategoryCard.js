import React from "react";
import {TouchableOpacity,Text,ImageBackground,Image,View} from "react-native"
const icon = require('../assets/we.png');
import { AntDesign } from '@expo/vector-icons'; 
const CategoryCard=({category,containerStyle})=>{
    return(
        <TouchableOpacity style={{width:270,...containerStyle}}>
           {/* thum */}
           <ImageBackground source={require('../assets/we.png')}
           resizeMode="cover"
           style={{
            width:"100%",
            height:150,marginBottom:10,borderRadius:50
           }}/>
           {/* Details */}
           <View style={{
            flexDirection:'row'
           }}

           >
           </View>
        </TouchableOpacity>
    )
}

export default CategoryCard;