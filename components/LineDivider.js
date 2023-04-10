import React from 'react-native'
import { View } from 'react-native'

const LineDivider=({lineStyle})=>{
    return(
        <View
        style={{
            height:2,
            width:"100%",
            backgroundColor:'white',
            
            ...lineStyle
        }}></View>
    )
}
export default LineDivider;