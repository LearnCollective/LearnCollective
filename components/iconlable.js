import React from "react";
import { View,Image,Text } from "react-native";
import { alignItems, margin } from "styled-system";

const Iconlable =({containerStyle,icon,iconStyle,lable,lableStyle})=>{
    return(
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            ...containerStyle}}>
                <Image
                source={icon}
                style={{
                    width:20,
                    height:20,
                    tintColor:'white',
                    ...iconStyle
                }}
                />
                <Text style={{marginLeft:10,color:'white',fontSize:20,fontWeight:'bold'
            ,...lableStyle}}>{lable}</Text>
            </View>
    )           

}

export default Iconlable;