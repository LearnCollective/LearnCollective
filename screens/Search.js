import React from "react";
import { Shadow } from "react-native-shadow-2";
import { FlatList } from "react-native-gesture-handler";
import { TextButton,CategoryCard } from "../components";
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import Animated ,{
    Extrapolate
,interpolate
,useAnimatedGestureHandler
,useAnimatedStyle
,useSharedValue
} from "react-native-reanimated";
 

import { Text, View, ImageBackground,Image,TouchableOpacity, Dimensions, TextInput } from "react-native";
export default function Search({navigation}) {
    const presshandler = () => {
        navigation.navigate('Home');
    
      }
   
    const dummyData = {
    
               top_searches :[
        {
            id: 0,
            label: "Sketch"
        },
        {
            id: 1,
            label: "Modeling"
        },
        {
            id: 2,
            label: "UI/UX"
        },
        {
            id: 3,
            label: "Web"
        },
        {
            id: 4,
            label: "Mobile"
        },
        {
            id: 5,
            label: "Animation"
        },
    ],categories :[
            {
                id: 0,
                name: "Mobile Design",
                image: require('../assets/we.png')
            },
            {
                id: 1,
                name: "3D Modeling",
                image: require('../assets/we.png')
            },
            {
                id: 2,
                name: "Web Designing",
                image: require('../assets/we.png')
            },
            {
                id: 3,
                name: "Illustrations",
                image: require('../assets/we.png')
            },
            {
                id: 4,
                name: "Drawing",
                image: require('../assets/we.png')
            },
            {
                id: 5,
                name: "Animation",
                image: require('../assets/we.png')
            }
        ]
    }
    // dummyData={
    //     top_searches :[
    //     {
    //         id: 0,
    //         label: "Sketch"
    //     },
    //     {
    //         id: 1,
    //         label: "Modeling"
    //     },
    //     {
    //         id: 2,
    //         label: "UI/UX"
    //     },
    //     {
    //         id: 3,
    //         label: "Web"
    //     },
    //     {
    //         id: 4,
    //         label: "Mobile"
    //     },
    //     {
    //         id: 5,
    //         label: "Animation"
    //     },
    // ],categories :[
    //     {
    //         id: 0,
    //         name: "Mobile Design",
    //         image: require('../assets/we.png')
    //     },
    //     {
    //         id: 1,
    //         name: "3D Modeling",
    //         image: require('../assets/we.png')
    //     },
    //     {
    //         id: 2,
    //         name: "Web Designing",
    //         image: require('../assets/we.png')
    //     },
    //     {
    //         id: 3,
    //         name: "Illustrations",
    //         image: require('../assets/we.png')
    //     },
    //     {
    //         id: 4,
    //         name: "Drawing",
    //         image: require('../assets/we.png')
    //     },
    //     {
    //         id: 5,
    //         name: "Animation",
    //         image: require('../assets/we.png')
    //     }
    // ]
    // }


    const scrollViewRef=React.useRef();
    const scrollY =useSharedValue(0);

    const onscroll= useAnimatedGestureHandler((event)=>{
        scrollY.value=event.contentOffset.y
    })
    
   const renderTopSearches =()=>{
        return(
            <View
            style={{marginTop:10,
            }}
        >
            <Text style={{
                marginHorizontal:10
                ,fontSize:22,
                color:'white'
                // fontWeight:'bold'
            }}>
                Top Searches
            </Text>
            <FlatList
            horizontal
            data={dummyData.top_searches}
            listKey="TopSearches"
            keyExtractor={item=>`TopSearches-${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop:5
            }}
            renderItem={({item,index})=>(
                <TextButton
            
            contentContainerStyle={{
                paddingVertical:5,
                paddingHorizontal:10,
                marginLeft:index==0?10:5,
                marginRight:index==dummyData.top_searches.length-1?10:0,
                borderRadius:5,
                backgroundColor:'white'
            //   width:80,
            //   borderRadius:30,
            //   backgroundColor:"white",
            }}
            lableStyle={{
                fontWeight:'blod'
            }}
            lable={item.label}
            />
            )}
            />

            </View>
        )
    }
    const renderBrowseCategories =()=>{
        return(
            <View
            style={{marginTop:10,
            }}
        >
            <Text style={{
                marginHorizontal:10
                ,fontSize:22,
                fontWeight:'bold',
                color:'white'
            }}>
                Browse Categories
            </Text>

            <FlatList
            
            data={dummyData.categories}
            numColumns={2}
            scrollEnabled={false}
            listKey="BrowseCategories"
            keyExtractor={item=>`BrowseCategories-${item.id}`}
            // showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop:5,
            }}
            renderItem={({item,index})=>(
                <CategoryCard

                category={item}
                containerStyle={{
                    hight:130,
                    whidth: 100,
                    marginTop:5
                    ,color:'black'
                    ,marginLeft:(index+1)%2==0?4:7
                     
                }}
            
        
            />
            )}
            />

            </View>
        )
    }
function renderSearchbar(){
    // const inputRange=[0,55];
    // // const searchBarAnimatedStyle = useAnimatedStyle(()=>{
    // //     height:interpolate(scrollY.value,inputRange,[55,0],Extrapolate.CLAMP)
    // // })
    
    return(
    <Animated.View
    style={{
        position:'absolute',
        alignItems:'center',
        top:30,
        left:0,
        right:0,
        paddingHorizontal:10,
        hight:50
}}
    >
        <Shadow>
            <View style={{
                flex:1,
                flexDirection:'row',
                alignItems:'center',
               hight:50,
                width:380,
                paddingHorizontal:10,
                borderRadius:5,
                backgroundColor:'white'
            }}
            >
                <View style={{margin:10}}>
                <FontAwesome name="search" size={24 } color="black" />
                </View>

                <TextInput style={{
                    flex:1,
                    marginLeft:5,
                }}
                // value=""
                placeholder="Search for Topics ,Courses & Educators"
                placeholderTextColor='gray'
               />

                

            </View>
        </Shadow>

    </Animated.View>
)}

    return (

        

        // <ImageBackground
        //     source={require('../assets/back2.png')}
        //     style={{
        //         height: Dimensions.get('window').height
        //     }}> </ImageBackground>
            <View style={{flex:1,backgroundColor:'#002147'}}>
                <TouchableOpacity onPress={presshandler} >
                                        <Ionicons name='arrow-back' size={25} top={-40} right={10} color='white' />
                                    </TouchableOpacity>
               <Animated.ScrollView
               
               ref={scrollViewRef}
               contentContainerStyle={{
                marginTop:100,
                paddingBottom:300,
               }}
               showsHorizontalScrollIndicator={false}
               scrollEventThrottle={16}
               keyboardDismissMode='on-drag'
               onScroll={onscroll}

               >
                {/* Top searches */}
                
              {renderTopSearches()}
              {/* Top searches */}
              {renderBrowseCategories()}
 </Animated.ScrollView>
              {renderSearchbar()}


              
            </View>
       
    );
}