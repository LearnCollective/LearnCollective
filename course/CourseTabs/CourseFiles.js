import React from "react";
import {View ,ScrollView , Text,Image,FlatList,} from 'react-native'
import { Iconlable,TextButton,HorizontalCoursesCard,LineDivider ,IconButton} from "../../components";
import {COLORS,FONTS,SIZES,icons,dummyData, images}from "../../constrants"
const CourseFiles =() =>{

    function renderStudents (){
        let Student =[]
        if(dummyData?.course_details?.students.length>3){
            Student=dummyData?.course_details.students.slice(0,3)
        }else{
            Student=dummyData?.course_details?.students
        }
        return(
            <View>
                {/* Title */}
                <Text style={{...FONTS.h2 ,fontSize:25,color:'white'}}>Students</Text>
                {/* Students */}
                <View style={{
                    flexDirection:'row',marginTop:SIZES.radius,
                    alignItems:'center',
                }}>
                    {Student.map((item ,index)=>{
                        return(
                            <View key={`Students-${index}`}
                            
                            style={{marginLeft:index>0?
                            SIZES.radius:0}}>
                                <Image
                                source={item?.thumbnail}
                                style={{width:80,
                                height:80}}/>
                            </View>
                        )
                    })}

                    {dummyData?.course_details?.students.length>3&&<TextButton
                    lable="View All"
                    lableStyle={{
                        color:COLORS.gray30,...FONTS.h3
                    }}
                    
                    contentContainerStyle={{
                        marginLeft:SIZES.base,backgroundColor:null}}/> }
                </View>
            </View>
        )
    }
    function renderFiles()
{
    return(
        <View style={{
            marginTop:SIZES.padding
        }}>
            {/* Section Title */}
            <Text style={{
                ...FONTS.h2,fontSize:25,color:'white'
            }}>Files</Text>
            {dummyData?.course_details?.files.map((item,index)=>{
                return (
                    <View 
                    key={`Files-${index}`}
                    style={{flexDirection:'row',marginTop:SIZES.radius}}>

                        {/* thimnail */}
                        
                        <Image
                        source={item?.thumbnail}
                        style={{width:80,height:80}}/>
{/* Name , outjor date */}
                        <View style={{flex:1,marginLeft:SIZES.radius}}>
                            <Text style={{...FONTS.h2,color:COLORS.white}}>{item?.name}</Text>
                            <Text style={{...FONTS.body3,color:COLORS.gray30}}>{item?.author}</Text>
                            <Text style={{...FONTS.body4,color:COLORS.white}} >{item?.upload_date}</Text>

                        </View>
                        {/* Menu */}

                        <IconButton
                        icon={ icons.menu}
                        iconStyle={{width:25,
                        height:25,
                    tintColor:COLORS.black}}
                    containerStyle={{
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:25
                    }}
                        />
                    </View>
                )
            })}

        </View>
    )
}    return(
        <ScrollView
        contentContainerStyle={{
            padding:SIZES.padding
        }}
        
        >
            {/* Students */}
            {renderStudents()}
            {/* Fiels */}
            {renderFiles()}
        </ScrollView>
    )
}
export default CourseFiles;