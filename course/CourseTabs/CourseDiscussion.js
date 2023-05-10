import React from "react";
import {View ,ScrollView , Text,Image,FlatList,TextInput, Keyboard} from 'react-native'
import { Iconlable,TextButton,HorizontalCoursesCard,LineDivider ,IconButton,IconLableButton} from "../../components";
import {COLORS,FONTS,SIZES,icons,dummyData, images}from "../../constrants"
import { fontSize } from "styled-system";
const CommentSection =({commentItem,commentOption,replies})=>{
    return(
        <View style={{flexDirection:'row',
    marginTop:SIZES.padding}}>

        {/* /* profile photo */ }
        <Image
        source={commentItem.profile}
        style={{
            width:40,
            height:40,
            borderRadius:20,
        }}/>
        {/* name and comment */}
        <View style={{
            flex:1,
            marginTop:3,
            marginLeft:SIZES.radius
        }}
        >
            {/* name */}
            <Text style={{...FONTS.h3}}>{commentItem?.name}</Text>
            {/* comment */}
            <Text style={{...FONTS.body4}}>{commentItem?.comment}</Text>
            {/* comment option */}
            {commentOption}

{/* replies section */}
            {replies}
        </View>
    </View>
    )
}
const CourseDiscussion =()=>{
    const [footerposition ,setfooterposition]=React.useState(0);
    const [footerHigth ,setfooterHigth]=React.useState(60);
    React.useEffect(()=>{
        // lesitn to keyboard
        const showSubscription = Keyboard.addListener("keyboardWillShow",(e)=>{
            setfooterposition(e.endCoordinates.height)
        })
        const hideSubscribtion =Keyboard.addListener("keyboardWillHide",(e)=>{
            setfooterposition(0)
        })
        return()=>{
            showSubscription.remove();
            hideSubscribtion.remove();
        }
    },[])
    function renderDiscussion(){
        return(
            <View 
            style={{
                flex:1
            }}
            >
                <FlatList
                data={dummyData?.course_details?.discussions}
                keyExtractor={item => `Discussion-main=${item.id}`}
                contentContainerStyle={{paddingHorizontal:SIZES.padding,paddingBottom:70}}
                renderItem={({item,index})=>(
                  <CommentSection
                  commentItem={item}
                  commentOption={
                    <View style={{flexDirection:'row',
                    marginTop:SIZES.radius,
                    paddingVertical:SIZES.base,
                    borderBottomWidth:1,
                    borderTopWidth:1,
                    borderColor:COLORS.gray20}}>

                    {/* comment */}

                    <IconLableButton
                    icon={icons.comment}
                    lable={item?.no_of_comments}
                    // containerStyle={{
                    //    paddingHorizontal:0,
                    //    paddingVertical:0
                    //    }}
                       iconStyle={{
                        width:20,
                        height:20,
                        tintColor:COLORS.black
                       }}
                       lableStyle={{marginLeft:3,
                    color:COLORS.black,
                fontSize:20}}
                       />

                       <IconLableButton
                       icon={icons.heart}
                       lable={item?.no_of_likes}
                       containerStyle={{
                        marginLeft:SIZES.radius

                       }}
                       lableStyle={{marginLeft:3,
                    color:COLORS.black,
                fontSize:18}}
                       
                       />
                       {/* Date */}
                       <Text style={{
                        flex:1,
                        textAlign:'right',fontSize:18
                       }}>
                        {item?.posted_on}
                       </Text>
                    {/* <IconLableButton
                
                    containerStyle={{
                      
                    }}/> */}

                    </View>
                  }


                  replies={
                    <FlatList
                    data={item?.replies}
                    scrollEnabled={false}
                    keyExtractor={item=>`Discution-replies-${item.id}`}
                    renderItem={({item,index})=>(
                        <CommentSection
                        commentItem={item}
                        commentOption={
                            <View 
                           style={{
                            flexDirection:'row',
                            marginTop:SIZES.radius,
                            paddingVertical:SIZES.base,
                            borderTopWidth:1,
                            borderBottomWidth:1,
                            borderColor:COLORS.gray30 
                           }} >

                            {/* Replay */}
                            <IconLableButton
                            icon={icons.reply}
                            lable="reply"
                            lableStyle={{marginLeft:7,
                            color:COLORS.black,fontSize:18}}
                            iconStyle={{marginLeft:10}}/>

                            {/* like */}
                            <IconLableButton
                            icon={icons.heart_off}
                            lable="like"
                            containerStyle={{marginLeft:SIZES.radius
                            }}
                            lableStyle={{marginLeft:5,
                            color:COLORS.black,fontSize:18}}
                            />

                            {/* Date */}

                            <Text style={{flex:1,textAlign:'right',fontSize:18}}>
                                {item?.posted_on}
                            </Text>
                            
                           </View>
                        }
                        />
                  )  }/>
                  }
                  />
                )}/>

            </View>
        )
    }
    function renderfooterTextInput(){
        return(
            <View 
            style={{flexDirection:'row',position:'absolute',
                    bottom:footerposition,left:0,right:0,height:footerHigth,paddingHorizontal:SIZES.padding
                ,paddingVertical:SIZES.radius,backgroundColor:COLORS.gray10}}>

                    <TextInput 
                    style={{flex:1,marginRight:SIZES.base,fontSize:18}}
                    multiline
                    placeholder="Type Somthing"
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event)=>{
                        const height=event.nativeEvent.contentSize.height;
                        if(height<=60){
                            setfooterHigth(60)
                        }else if(height>60 && height<=100){
                            setfooterHigth(height)
                        }else if(height>100){
                            setfooterHigth(100)
                        }
                    }}
                    />
                    <IconButton
                    icon={icons.send}
                    iconStyle={{height:25,width:25,
                    tintColor:COLORS.primary}}/>
                </View>
        )
    }
    return(
        // <Text>CourseDiscussion</Text>
        <View
        style={{flex:1,
        backgroundColor:COLORS.white}}>
            {/* Discussion */}

            {renderDiscussion()}

            {/* Footer */}
            {renderfooterTextInput()}
        </View>
    )
}
export default CourseDiscussion;