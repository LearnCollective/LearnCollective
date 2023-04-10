import React from "react";
import { TouchableOpacity,Text } from "react-native";

const TextButton=({
    contentContainerStyle,disable,lable,lableStyle,onPress

})=>{
    return(
        <TouchableOpacity
        style={{alignItems:'center',
    justifyContent:'center',backgroundColor:'white',
    ...contentContainerStyle
}}
disable={disable}
onPress={onPress}

>
    <Text style={{
        color:'black',
        fontSize:20,
        ...lableStyle
    }}>
        {lable}
    </Text>
</TouchableOpacity>
    )
}
export default TextButton;