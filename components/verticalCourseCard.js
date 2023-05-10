import React from "react";
import { View,Text,TouchableOpacity,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import Iconlable from "./iconlable";
const icon = require('../assets/time.png');
import { SharedElement } from "react-navigation-shared-element";

const VerticalCourseCard=({SharedElementPrefix,containerStyle,course,onPress})=>{
    return(
        <TouchableOpacity style={{width:270,...containerStyle}} onPress={onPress}
        
        >
              <SharedElement
           id={`${SharedElementPrefix}-course-Card-Bg-${course?.id}`}>
          {/* style={StyleSheet.absoluteFillObject} */}
          
            </SharedElement>
            
           {/* thum */}

           <Image source={course.thumbnail}
           resizeMode="cover"
           style={{
            width:"100%",
            height:150,marginBottom:10,borderRadius:10,
           }}/>
           {/* Details */}
           <View style={{
            flexDirection:'row'
           }}
           
           >
            {/* play */}
            <View >
                <TouchableOpacity>
                <AntDesign style={{width:45,
                height:45,
                alignItems:'center',
                justifyContent:'center'
                ,borderRadius:25,
                }}  name="play" size={40} color="white" /></TouchableOpacity>
            </View>

            {/* info */}
            <View
            style={{flexShrink:1,
                paddingHorizontal:10
            }}
            >
                <Text style={{flex:1,fontWeight:'bold',color:"white",fontSize:20}}>{course.title}</Text>
                <Iconlable
                
                    icon={icon}
                    lable={course.duration}
                    containerStyle={{marginTop:20}}/>

            </View>
            
          
           </View>
           <View style={{position:'absolute',
                            bottom:50,
                            left:15
                            }}
                            >
            <SharedElement
                       id={`${SharedElementPrefix}-course-Card-Title-${course?.id}`}
                       >
                {/* <Text style={{flex:1,fontWeight:'bold',color:"white",fontSize:20}}>{course.title}</Text> */}

            {/* <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{course?.title}</Text> */}
            </SharedElement>

           </View>
        </TouchableOpacity>
    )
}

export default VerticalCourseCard;