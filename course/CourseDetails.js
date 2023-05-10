import React,{useState,useEffect} from "react";
import { View,Text,ImageBackground,Modal,Animated,StyleSheet,Dimensions,Keyboard,TouchableOpacity } from "react-native";
import { IconButton,LineDivider } from "../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase/firebase_config";
import { doc, getDoc, updateDoc, onSnapshot, query, collection } from "firebase/firestore";
// import video from "react-native-video"
import { AntDesign } from '@expo/vector-icons';
import {
    COLORS,
    images,
    icons,
    dummyData,
    SIZES,
    FONTS,
    }from '../constrants'

// import Video from "react-native-video";
import { Video } from "expo-av";
import { measure } from "react-native-reanimated";
import CourseChapters from "./CourseTabs/CourseChapters";
import CourseFiles from "./CourseTabs/CourseFiles";
import CourseDiscussion from "./CourseTabs/CourseDiscussion";
const CourseDetailsTabs = {
    course_details_tabs: [
      {
        id :0 ,
        title: "Characters",
        content: "This tab contains information about the characters in the course."
      },
      {
        id :1 ,
        title: "Files",
        content: "This tab contains a list of files that are associated with the course."
      },
      {
        id :2 ,
        title: "Discussions",
        content: "This tab contains a list of discussions that have been started about the course."
      }
    ]
  };

  const course_details_tabs = CourseDetailsTabs.course_details_tabs.map((course_details_tab)=>({
    ...course_details_tab,
    ref:React.createRef()
  }))

  function subscribe(callback) {
    const unsubscribe = onSnapshot(query(collection(db, "users")), (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        if (callback) callback({ change, snapshot });
      });
    });
    return unsubscribe;
  }
  const TabIndicator = ({measureLayout,scrollx})=>{
    const inputRange =course_details_tabs.map((_,i)=>i*SIZES.width)
    const TabIndicatorWidth = scrollx.interpolate({
        inputRange,outputRange :measureLayout.map(measure => measure.width)
    })
    const translatex = scrollx.interpolate({
        inputRange,outputRange :measureLayout.map(measure => measure.x)
    })
    return(
        <Animated.View
        style={{
            position:'absolute',
            bottom: 0,
            height: 4,
            width: TabIndicator,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.black,
            transform:[{
                translatex
            }]
        }}
        />

        
    )
  }
const Tabs =({scrollx , onTabPress})=>{
    const [measureLayout , setmeasureLayout] =React.useState([])
    const containerRef = React.useRef()
    React.useEffect(()=>{
        let ml=[]

        course_details_tabs.forEach(course_details_tab=>{
            course_details_tab?.ref.current?.measureLayout(
                containerRef.current,
                (x,y,width , height)=>{
                    ml.push({
                        x,y,width,height
                    })
                    if(ml.length == course_details_tabs.length){
                        setmeasureLayout(ml)
                    }
                }
            )
        } )
    },[containerRef])
    return(
        <View ref={containerRef}
        style={{
            flex:1,
            flexDirection:'row'
        }}
        >
            {/* tab indicator */}

            {measureLayout.length>0 && <TabIndicator
            measureLayout={measureLayout} scrollx={scrollx}/>}
            {/* tabs */}

            {CourseDetailsTabs.course_details_tabs.map((item , index)=>{
                return(
                    <TouchableOpacity
                    key={`Tab-${index}`}
                    ref={item.ref}
                    style={{flex:1,
                    paddingHorizontal:15,
                alignItems:'center',justifyContent:'center'
            }}
            onPress={()=>{Keyboard.dismiss() 
                onTabPress(index)}}
                    >
                        <Text style={{
                           fontWeight:'bold',color:'white',
                            fontSize:SIZES.height>800?18:17
                        }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )
            })}
            
        
</View>
    )
}
const CourseDetails =({navigation,route})=>{
    const [modelVisible, setModelVisible] = useState(false);
    const [footerposition ,setfooterposition]=React.useState(0);
    const [footerHigth ,setfooterHigth]=React.useState(60);
    const {selectedCourse} =route.params;
    const [mVisible, setMVisible] = useState(false);
    const [wallet, setWallet] = useState();
    const [playVideo , setPlayVideo ] =React.useState(false)
    const flatListRef = React.useRef()
    const scrollx =React.useRef(new Animated.Value(0)).current

  

    
      const ReadData = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data();
          setWallet(data.wallet)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    
      const Upwallte = async () => {
        const washingtonRef = doc(db, "users", auth.currentUser.uid);
        // Set the "capital" field of the city 'DC'
        console.log(wallet)
        let newwallet = wallet - 100
        await updateDoc(washingtonRef, {
          wallet: newwallet
    
        });
      }

    const onTabPress = React.useCallback(tabIndex =>{
        flatListRef?.current?.scrollToOffset({
            offset : tabIndex *SIZES.width
        })
    })
    function renderHeaderComponents (){
        
        return(
            <>
            {/* Back */}
            <View style={{
                flex:1
                }}
            >
                <IconButton
                icon={icons.back}
                iconStyle={{
                    width:25,height:25,tintColor:COLORS.black
                }}
                containerStyle={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:20,
                    backgroundColor:COLORS.white
                }}
                onPress={()=>navigation.goBack()}
                />

            </View>

            {/* Share & favorite */}
            <View style={{flexDirection:'row'
            }}
            >
                <IconButton 
                icon={icons.media}
                iconStyle={{tintColor:COLORS.white}}
                containerStyle={{width:50,height:50,alignItems:'center',justifyContent:'center'}}
                />
                <IconButton 
                icon={icons.favourite_outline}
                iconStyle={{tintColor:COLORS.white}}
                containerStyle={{width:50,height:50,alignItems:'center',justifyContent:'center'}}
                />

            </View>
            </>
        )
    }
//     <Modal
//     animationType='slide'
//     visible={modelVisible}
//     transparent={true}
//     onRequestClose={() => {
//       setModelVisible(!modelVisible);
//     }}
//   >
//     <View style={styles.centeredView}>
//       <View style={styles.modalView}>
//         <View style={{ alignItems: 'center' }}>
//           <Text style={{ fontSize: 21 }}>Are you sure to buy</Text>
//           <Text style={{ fontSize: 21 }}>this course?</Text>
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

//           <View style={styles.btview}>
//             <TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{ backgroundColor: '#f00', height: 40, width: 120, borderRadius: 20, alignItems: 'center' }}>
//               <Icon name='remove' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Cancel</Text></Icon>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.btview}>
//             <TouchableOpacity onPress={Confirm} style={{ backgroundColor: '#3ded97', height: 40, width: 120, borderRadius: 20, alignItems: 'center', marginLeft: 20 }}>
//               <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}>Confirm</Text></Icon>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   </Modal>
    function renderHeader(){
        if(playVideo){
            return(
                <View 
                style={{flexDirection:'row',
                paddingHorizontal:SIZES.radius,
                paddingBottom:SIZES.base,
                height:85,
                backgroundColor:COLORS.black,
                alignItems:'flex-end'}}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }
        else{
            return(
            <View style={{
                position:'absolute',
                top:SIZES.height>800?40:20,
                left:0,
                right:0,
                flexDirection:'row',
                paddingHorizontal:SIZES.padding,
                zIndex:1
            }}>
                {renderHeaderComponents()}
            </View>
        )
        }
        
    }
 
    function renderVideoSection(){
        return(
            <View style={{
                height:SIZES.height>800 ? 220 :200,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:COLORS.gray90
            }}
            >
                <ImageBackground
                source={selectedCourse.image}
                style={{width:'100%',height:'100%', alignItems:'center',
                justifyContent:'center',
                }}
                >
                    {/* play Button */}
                <IconButton 
                icon={icons.play}
                iconStyle={{
                    width:25,
                    height:25,
                    tintColor:COLORS.white
                }}
                containerStyle={{
                    width:55,
                    height:55,
                    alignItems:'center',
                    justifyContent:'center'
                    ,marginTop:SIZES.padding,
                    borderRadius:30,backgroundColor:COLORS.primary
                }}
                onPress={()=>setPlayVideo(true)}
                />

                </ImageBackground>
{/* /////////////////////////////////////////////////////////////////// */}
                {playVideo && 
                        <Video 
                        
                      
                                source={{uri:"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                                controls={true}
                                style={{
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    bottom:0,
                                    right:0,
                                    backgroundColor:COLORS.black
                                }}
                                useNativeControls={true}
  isLooping={true}
                        />
                                }

            </View>
        )
    }

    function renderfooterTextInput(){
        return(
            
            <View 
            style={{flexDirection:'row',position:'absolute',
                    bottom:footerposition,left:0,right:0,height:footerHigth,paddingHorizontal:SIZES.padding
                ,paddingVertical:SIZES.radius,backgroundColor:COLORS.gray10}}>


<TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{backgroundColor:COLORS.black,width:420,left:-30,height:70,top:-12}}>
                                                          <Text style={{color:COLORS.gray10,textAlign:'center',marginTop:18,fontSize:20,fontWeight:'bold'}}>Buy It !</Text></TouchableOpacity>
                                                          <Modal
              animationType='slide'
              visible={modelVisible}
              transparent={true}
              onRequestClose={() => {
                setModelVisible(!modelVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 21 }}>Are you sure to buy</Text>
                    <Text style={{ fontSize: 21 }}>this course?</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                    <View style={styles.btview}>
                      <TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{ backgroundColor: '#f00', height: 40, width: 120, borderRadius: 20, alignItems: 'center' }}>
                        <Icon name='remove' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Cancel</Text></Icon>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.btview}>
                      <TouchableOpacity onPress={Confirm} style={{ backgroundColor: '#3ded97', height: 40, width: 120, borderRadius: 20, alignItems: 'center', marginLeft: 20 }}>
                        <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}>Confirm</Text></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType='slide'
              visible={mVisible}
              transparent={true}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ fontSize: 21 }}>your balance:{wallet}</Text>
                  <View style={{ alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                      <View style={styles.btview}>
                        <TouchableOpacity onPress={() => setMVisible(!mVisible)} style={{ backgroundColor: '#3ded97', height: 40, width: 80, borderRadius: 20, alignItems: 'center', }}>
                          <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Ok</Text></Icon>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

                    {/* <IconButton
                    icon={icons.send}
                    iconStyle={{height:25,width:25,
                    tintColor:COLORS.primary}}/> */}
                </View>
        )
    }

    
   function renderContent(){
    return(
        <View style={{flex:1
        }}
        >
            {/* Tabs */}
            <View style={{
                height:60,
                
            }}>
                <Tabs
                scrollx={scrollx}
                onTabPress={onTabPress}
                />

            </View> 
             {/* Linedevider */}
            <LineDivider
            lineStyle={{backgroundColor:COLORS.gray20}}/>
          
            {/* Content */}
            <Animated.FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            decelerationRate="fast"
            keyboardDismissMode='on-drag'
            showsHorizontalScrollIndicator={false}
            data={CourseDetailsTabs.course_details_tabs}
            keyExtractor={item => `CourseDetailsTabs-${item.id}`}
            onScroll={Animated.event([
                {nativeEvent : {contentOffset : {x:scrollx}}}
            ],{useNativeDriver:false
            })
        }
        renderItem={({item,index})=>{
            return (
                <View style={{width:SIZES.width}}>
                    {index == 0 && <CourseChapters/>}
                    {index == 1 && <CourseFiles/>}
                    {index == 2 && <CourseDiscussion/>}
                </View>
            )
        }}
            />
        </View>
    )
   }
   const buy = () => {
    // setWallet(wallet - 100)
    Upwallte();
  }
  const Confirm = () => {
    buy();
    setModelVisible(!modelVisible);
    setMVisible(!mVisible);
  }
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added" || change.type === "modified" || change.type === "removed") {
        ReadData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  ReadData();
    return(
        <View style={{flex:1,backgroundColor:"#002147"}}
        >
            {/* Header Bar */}
             {renderHeader()}
            {/* Vedio */}
            {renderVideoSection()} 
           {renderContent()}
           {renderfooterTextInput()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: '#002147',
      alignItems: 'center',
    },
    modalView: {
      margin: 10,
      backgroundColor: "#fff",
      borderRadius: 25,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
  
  });
  

export default CourseDetails;