import React from "react";
import { View
        ,Text
        ,Image, 
    FlatList,StyleSheet,TouchableOpacity} from "react-native";
import Animated,{
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS,
    useAnimatedScrollHandler} from "react-native-reanimated";
import { SharedElement } from "react-native-shared-element";
import { IconButton,HorizontalCoursesCard,LineDivider } from "../components";
import { borderBottom } from "styled-system";
import {COLORS,images,
        icons,
        dummyData,
        SIZES,
        FONTS,
        }from '../constrants'


        const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

        const HEADER_HEIGHT =25;
const CourseListing=({navigation,route})=>{
    const presshandler = () => {
        navigation.navigate('Home');
      }
    const {category,SharedElementPrefix}=route.params;
    const flatListRef = React.useRef()
    const scrollY = useSharedValue(0)
    const onScroll =useAnimatedScrollHandler((event)=>{
        scrollY.value=event.contentOffset.y;
    })
    const headerSharedValue = useSharedValue(80)
   function backhand (){
    navigation.goBack() 
   }
    function renderHeder(){
        const inputRange =[0,HEADER_HEIGHT,-50]
        headerSharedValue.value=withDelay(500,withTiming(0,{duration:500}))
        const headerfadeAnimatedStyle =useAnimatedStyle(()=>{
            return {
                opacity :interpolate(headerSharedValue.value,[80,0],[0,1])}
        })
        const headerTranslateAnimatedstyle =useAnimatedStyle(()=>{
            return{
                transform:{
                    translateY:headerSharedValue.value
                }
            }
        })

        const headerHieghtAnimatedStyle = useAnimatedStyle(()=>{
            return {
                height:interpolate(scrollY.value ,inputRange ,[HEADER_HEIGHT,120] ,Extrapolate.CLAMP) 
            }
        })
        
        return(
        <Animated.View style={[{
                position:"absolute",
                top:0,
                left:0,
                right:0,
                height:250,
                overflow:"hidden"
                }]}
            >
            <SharedElement
           id={`${SharedElementPrefix}-CategoryCard-Bg-${category.id}`}
           style={[StyleSheet.absoluteFillObject]}
           >  
            {/* back ground */}
            <Image
            source={category?.thumbnail}
            resizeMethod='cover'
        
            style={{
            
            height:"100%",width:"100%"
            ,borderBottomLeftRadius:60}}
            />
         
            </SharedElement>
         
           <Animated.View style={{position:'absolute' ,bottom:70,left:30}}>
            <SharedElement id={`${SharedElementPrefix}-CategoryCard-Title-${category.id}`}
             style={[StyleSheet.absoluteFillObject]}>
           
        <Text 
        style={{position:'absolute',color:"white" ,fontSize:30,fontWeight:'bold'}}
        >{category?.title}
        </Text>
            </SharedElement>
            
           </Animated.View>
           {/* back */}
           <Animated.View style={headerfadeAnimatedStyle}>
            <IconButton
            icon={icons.back}
            iconStyle={{
                tintColor :COLORS.black
                ,marginLeft:10
            }}
            containerStyle={{
                position:'absolute',
                top:40,
                left:20,
                width:50,
                height:50,
                alignItmes:'center',
                justifyContent:'center',
                borderRadius:25,
                backgroundColor:COLORS.white

            }}
            onPress={()=>{backhand()}}/>
           </Animated.View>
           {/* cat Image */}
           <Animated.Image source={images.mobile_image}
           resizeMode='contain'
           style={[{position:'absolute',
        right:40,bottom:-40,width:100,height:200},headerfadeAnimatedStyle]}
           />
        </Animated.View>
    )}

    function renderResults(){
        return(
            <AnimatedFlatList
            ref={flatListRef}
            data={dummyData.courses_list_2}
            keyExtractor={item=>`Results-${item.id}`}
            contentContainerStyle={{
                paddingHorizontal:SIZES.padding
            }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            keyboardDismissMode={"on-drag"}
            onScroll={onScroll}
            ListHeaderComponent={
                <View style={{
                    flexDirection:'row'
                    ,alignItems:'center',
                    marginTop:270,
                    marginBottom:SIZES.base
                }}>
                    {/* Results */}
                    <Text style={{
                        flex:1,
                        fontSize:17,
                        fontWeight:'bold',color:'white'
                    }}>5.761 Results</Text>
                    <IconButton 
                    icon={icons.filter}
                    iconStyle={{
                        width:20,height:20
                    }}
                    containerStyle={{
                        width:48,
                        height:40,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:10,
                        backgroundColor:COLORS.primary
                    }}/>
                </View>
            }
            renderItem={({item,index})=>(
                <HorizontalCoursesCard
                course={item}
                containerStyle={{
                    marginVertical:SIZES.padding,
                    marginTop:index == 0 ?SIZES.radius : SIZES.padding
                }}
                onPress={()=>navigation.navigate("CourseDetails",{selectedCourse :item })}
                    />
            )
        }    ItemSeparatorComponent={()=>(
            <LineDivider
            lineStyle={{backgroundColor:'white',marginBottom:20}}/>
      
           ) }
          
            />
        )
    }
    return( 
        <View 
        style={{
            flex:1,
            backgroundColor:'#002147'
        }}>
            {/* {Result} */}
            {renderResults()}
            {renderHeder()}
            {/* <TouchableOpacity style={{marginTop:10}} onPress={presshandler}><Text>dfdaf</Text></TouchableOpacity> */}
         
            
        </View>
    )
}

CourseListing.SharedElement=(route,otherRoute,showing)=>{
    if(otherRoute.name === "Dashboard"){
          const {category , SharedElementPrefix}=route.params;
    return[
     {
        id:`${SharedElementPrefix}-CategoryCard-Bg-${category?.id}`
        
     },
     {
        id:`${SharedElementPrefix}-CategoryCard-Title-${category?.id}`
     }
]
    }
   
}
export default CourseListing;