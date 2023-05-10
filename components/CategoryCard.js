import React from "react";
import {TouchableOpacity,Text,ImageBackground,Image,View} from "react-native"
const icon = require('../assets/we.png');
import { AntDesign } from '@expo/vector-icons'; 
import { SharedElement } from "react-navigation-shared-element";
const CategoryCard=({SharedElementPrefix,category,containerStyle ,StyleSheet,onPress})=>{
    return(
        <TouchableOpacity style={{
            height:150,
            width:200,
        }}
        onPress={onPress}>
           {/* thum */}
           <SharedElement
           id={`${SharedElementPrefix}-CategoryCard-Bg-${category?.id}`}>
          {/* style={StyleSheet.absoluteFillObject} */}
           <Image source={category.thumbnail}
           resizeMode="cover"
           style={{
            width:"100%",
            height:"100%"               
            ,paddingVertical:10
            ,paddingHorizontal:10
           , justifyContent:'flex-end'
           , ...containerStyle
            ,borderRadius:20
           }}
           imageStyle={{
            borderRadius:20
           }}
            />
            </SharedElement>
                {/* {category?.name} */}
            {/* </Text> */}
           
           {/* Details */}
           <View style={{position:'absolute',
                            bottom:50,
                            left:15
                            }}
                            >
            <SharedElement
                       id={`${SharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                       >

            <Text style={{position:'absolute',color:'white',fontSize:20,fontWeight:'bold'}}>{category?.title}</Text>
            </SharedElement>

           </View>
                 {/* <TouchableOpacity><Text>dgsfjdfdujfhusgf</Text></TouchableOpacity> */}

        </TouchableOpacity>
        
    )
}

export default CategoryCard;