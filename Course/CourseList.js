import React from "react";
import { View
        ,Text
        ,Image, 
    FlatList,StyleSheet} from "react-native";
import Animated,{
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS} from "react-native-reanimated";


import { IconButton,HorizontalCoursesCard,LineDivider } from "../components";
import {COLORS,
        FONTS,
        SIZES,
        images,
        icons,
        dummyData}from '../constrants'

const CourseListing=()=>{
    return(
        <View 
        style={{
            flex:1,
            backgroundColor:COLORS.white
        }}>
        </View>
    )
}

export default CourseListing;