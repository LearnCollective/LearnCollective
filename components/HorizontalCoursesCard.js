import React from "react";
import { TouchableOpacity, Text, ImageBackground, Image, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const icon = require('../assets/time.png');
const star = require('../assets/star.png');
import Iconlable from "./iconlable";


import { AntDesign } from '@expo/vector-icons'; 
const HorizontalCoursesCard = ({containerStyle,course , onPress})=>{
    return(
        <TouchableOpacity
        style={{
            flexDirection:'row',
            ...containerStyle
        }}
        onPress={onPress}
        >

            {/* th */}
            <ImageBackground 
            source={course.image}
// {/* >>>>>>> Stashed changes */}
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        />
            {/* th */}
            <ImageBackground
                source={course.image}
                style={{
                    width: 130,
                    height: 130,
                    marginBottom: 30,
                }}
                imageStyle={{
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        position: 'absolute'
                        , top: 10,
                        right: 10,
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5, backgroundColor: 'white'
                    }} >
                    <TouchableOpacity>
                        <MaterialIcons name="favorite" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {/* Details */}
            <View
                style={{
                    flex: 1,
                    marginLeft: 5,
                }}>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{course.description}</Text>
                {/* {instruction and duration} */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                    , marginTop: 5
                }}>
                    <Text style={{ fontSize: 15, color: 'white', fontWeight: '400', marginTop: 10 }}>
                        By {course.instructor}
                    </Text>
                    <View style={{ marginTop: 15 }}>

                        <Iconlable
                            icon={icon}
                            lable={course.duration}
                            containerStyle={{
                                marginLeft: 5
                            }}
                            iconStyle={{
                                width: 15, height: 15
                            }}
                            lableStyle={{ fontSize: 15 }} />
                    </View>
                </View>
                {/* price &rateing */}

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginTop: 5
                }}>
                    <Text style={{
                        fontSize: 20, color: 'white', fontWeight: 'bold'
                    }}>{course.price.toFixed(2)}
                    </Text>
                    <Iconlable
                        icon={star}
                        lable={course.rating}
                        containerStyle={{
                            marginLeft: 10,
                            marginLeft: 25

                        }}
                        iconStyle={{ color: 'black', width: 15, height: 20 }}
                        lableStyle={{ marginLeft: 5 }} />
                </View>
            </View>

        </TouchableOpacity>
    )

}
export default HorizontalCoursesCard;

