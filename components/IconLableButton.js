import React from "react";
import {View ,ScrollView , Text,Image,FlatList,TouchableOpacity,TextInput} from 'react-native'

import {COLORS,FONTS,SIZES,icons,dummyData, images}from "../constrants"

const IconLableButton = ({containerStyle , icon, iconStyle,lable ,lableStyle,onpress})=>{
    return(
        <TouchableOpacity
        style={{flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        ...containerStyle
        }}
        onpress={onpress}
        
        >
            <Image source={icon}
            resizeMethod='resize'
            style={{
                width:20,
                height:20,
                ...iconStyle
            }}
            />
            <Text style={{marginLeft:SIZES.base,fontSize:15,...lableStyle}}>{lable}</Text>

        </TouchableOpacity>
    )

}
export default IconLableButton;