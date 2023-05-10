import React from "react";
import {View ,ScrollView , Text,Image,FlatList,} from 'react-native'
import { Iconlable,TextButton,HorizontalCoursesCard,LineDivider } from "../../components";
import {COLORS,FONTS,SIZES,icons,dummyData, images}from "../../constrants"
const CourseChapters =()=>{
    function renderHeader(){
        return(
            <View
            style={{
                marginTop:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}>
                {/* Title */}

                <Text style={{fontSize:18,color:'white'}}>{dummyData.course_details?.title}</Text>

                {/* Student & duration */}
                <View style={{flexDirection:'row',
                            marginTop:SIZES.base}}>

                              <Text style={{color:COLORS.gray30,fontSize:18}}> {dummyData.course_details.number_of_students}</Text> 
                              <Iconlable
                              icon={icons.time}
                              lable={dummyData?.course_details?.duration}
                              containerStyle={{
                                marginLeft:SIZES.radius,
                              }}
                              iconStyle={{
                                width :15,
                                height:15,
                              }}
                              lableStyle={{fontSize:18}}/>
                            </View>

                {/* instructor sec */}
                <View style={{flexDirection:'row',marginTop:SIZES.radius,alignContent:'center'}}>
                    {/* profile photo */}
                    <Image 
                        source={images.profile}
                        style={{
                            width:50,
                            height:50,
                            borderRadius:25,
                        }}/>

                    {/* name & title */}
                    <View style={{
                        flex:1,marginLeft:SIZES.base,
                        justifyContent:'center'
                    }}>
                        <Text style={{
                            fontSize:18,fontSize:18,color:'white'
                        }}>{dummyData.course_details.instructor?.name}</Text>
                        <Text style={{
                            fontSize:18,color:'white'
                        }}>{dummyData.course_details.instructor?.title}</Text>
                    </View>


                    <TextButton
                    lable="Follow +"
                    contentContainerStyle={{
                        width:80,
                        height:35,
                        borderRadius:20
                    }}
                    lableStyle={{
                        fontSize:18
                    }}/>
                 
                </View>
            </View>
        )
    }

    function renderChapter(){
        return(
            <View>
                {dummyData.course_details?.videos.map((item,index)=>{
                    return(
                        <View  key={`Video-${index}`}
                            style={{
                                alignItems:'center',height:70,
                                backgroundColor:item?.is_playing ?
                                COLORS.black:null
                            }}>
                                <View
                                style={{
                                    flexDirection:'row',
                                    paddingHorizontal:SIZES.padding,
                                    alignItems:'center',
                                    height:70
                                }}
                                >
                                    {/* Icon */}
                                        <Image
                                        source={item?.is_complete ? 
                                        icons.completed :item?.is_playing ? icons.play_1 :icons.lock}
                                        style={{
                                            width:40,
                                            height:40,
                                        }}/>
                                    {/* Title & duration */}

                                    <View style={{
                                        flex:1,marginLeft:SIZES.radius
                                    }}>
                                        <Text style={{fontSize:18,color:'white'}}>{item.title}</Text>
                                        <Text style={{fontSize:18,color:'white',fontWeight:'200'}}>{item.duration}</Text>


                                    </View>


                                    {/* Size and status */}
                                    <View style={{
                                        flexDirection:'row'
                                    }}
                                    
                                    >
                                    {/* Size */}
                                    <Text style={{fontSize:18,color:'white',fontWeight:'200'}}>{item?.size}</Text>
                                    
                                    {/* Status */}
                                    <Image
                                    source={item?.is_downloaded ? icons.completed:icons.download}
                                    style={{marginLeft:SIZES.base
                                    ,width:25,
                                height:25,
                            tintColor:item?.is_lock?COLORS.additionalColor4 :null}}
                                    />
                                    </View>

                                </View>
                          
                          {/* progress par */}
                          {item?.is_playing && <View
                          style={{position:'absolute',
                          bottom:0,left:0,height:5,width:item?.progress,
                          backgroundColor:COLORS.white}}>
                            </View>}
                        </View>
                    )
                })}
            </View>
        )
    }
    function renderpopularCourses(){
        return(
            <View style={{
                marginTop:SIZES.padding
            }}>
                {/* Section JJeader */}
                <View style={{flexDirection:'row',
            paddingHorizontal:SIZES.padding}}>
                <Text style={{flex:1,fontSize:18,color:'white'}}> Popular Courses</Text>
                <TextButton
                contentContainerStyle={{
                    width:80,borderRadius:30,
                    backgroundColor:COLORS.white
                }}
                lable="See All"/>
                </View>
                <FlatList
                data={dummyData.courses_list_2}
                listKry ="PopularCourses"
                scrollEnabled={false}
                keyExtractor={item => `PopularCourses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    margin:SIZES.radius
                    ,paddingHorizontal:SIZES.padding
                }}
                renderItem={({item,index})=>(
            <HorizontalCoursesCard
            course={item}
            containerStyle={{marginVertical:SIZES.padding,
            marginTop:index == 0 ?SIZES.radius :SIZES.padding
        }}
        />
        )}
        ItemSeparatorComponent={()=>
        <LineDivider/>}
                />

            </View>
        )
    }
    return(
            // <Text style={{color:"white"}}>CourseChapters</Text>

            <ScrollView>
                {/* Header */}
                {renderHeader()}
                {/* Line Divider */}
                <LineDivider
                lineStyle={{
                    height:1,marginVertical:SIZES.radius
                }}/>
                {/* Chapters */}
                {renderChapter()}
                {/* popular courses */}
                {renderpopularCourses()}
            </ScrollView>
    )
}
export default CourseChapters;