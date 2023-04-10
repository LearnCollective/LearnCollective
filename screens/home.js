import react from "react";
import photo from '../assets/sora.jpg'
import photo2 from '../assets/back2.png'
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase_config";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons'; 

import { Ionicons } from '@expo/vector-icons'; 
import {TextButton,LineDivider,CategoryCard,IconButton,VerticalCourseCard} from "../components";

// import {COLORS}

import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native';
import { globalstyles } from "../styles/global";
import Icon from 'react-native-vector-icons/FontAwesome';

import { padding } from "styled-system";


export default function Home({ navigation }) {
  const signOuthandle = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('SIGNIN');

    }).catch((error) => {
      // An error happened.
    });
  }
  const ic = () => {
    <Icon name='rowing' />

  }
  const Section=({containerStyle,title,onpress,children})=>{
    return(
      <View style={{...containerStyle}}>
        <View style={{flexDirection:'row',paddingHorizontal:10}}>
          <Text style={{flex:1,fontWeight:'bold',fontSize:20,color:'white'}}>
            {title}
            </Text>
         {/* <TouchableOpacity style={{backgroundColor:'white',padding:6,borderRadius:10}}><Text style={{fontWeight:'bold'}}>See ALL</Text></TouchableOpacity> */}
            <TextButton
            
            contentContainerStyle={{
              width:80,
              borderRadius:30,
              backgroundColor:"white",
            }}
            lable="See ALL"
            onPress={onpress}
            />

        </View>
        {children}

      </View>
    )
  }
  const presshandler = () => {
    navigation.navigate('REGISTER');

  }
  const press = () => {
    navigation.navigate('PROFILE');

  }

  const renderHeder=()=>{
    return(
      <View
      style={{flexDirection:'row',
    marginTop:30,marginBottom:10,marginLeft:40,alignItems:'center'}}>
      {/* Greeting */}
      <View
      style={{flex:1}}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={press}><AntDesign name="profile" size={24} color="white" style={{marginLeft:-20,marginTop:3}} /></TouchableOpacity>
        <Text style={{fontSize:30,fontWeight:'bold',marginBottom:3,color:'white',marginLeft:7}}>Hello To LearnCollective</Text>
        </View><Text style={{color:'white',marginLeft:7}}> thursday ,10th Apr 2023 </Text>
      </View>
      {/* Notification */}
      <Ionicons style={{marginRight:40}} name="notifications" size={24} color="white" />
      
    </View>
    )
  }
//////////////////////////////////// courses  //////////
  const dummyData = {
    courses_list_1: [
      {
        id: 1,
        title: "Introduction to Computer Science",
        instructor: "John Doe",
        image: "https://example.com/image1.jpg",
        description: "Learn the fundamentals of computer science.",
        duration: "4 weeks",
        price: "$49.99"
      },
      {
        id: 2,
        title: "Web Development",
        instructor: "Jane Smith",
        image: "https://example.com/image2.jpg",
        description: "Build web applications using HTML, CSS, and JavaScript.",
        duration: "6 weeks",
        price: "$79.99"
      },
      
      {
        id: 3,
        title: "Python",
        instructor: "Jane Smith",
        image: "https://example.com/image2.jpg",
        description: "Build web applications using HTML, CSS, and JavaScript.",
        duration: "2 weeks",
        price: "$79.99"
      },
      
      {
        id: 4,
        title: "React-Native",
        instructor: "Jane Smith",
        image: "https://example.com/image2.jpg",
        description: "Build web applications using HTML, CSS, and JavaScript.",
        duration: "3 weeks",
        price: "$79.99"
      },
      // more course objects...
    ],
    categories: [
      {
        id: 1,
        name: "Books",
        description: "Explore our vast collection of books",
        image:require('../assets/time.png')
      },
      {
        id: 2,
        name: "Music",
        description: "Discover new music from various genres",
        image:require('../assets/time.png')
      },
      {
        id: 3,
        name: "Movies",
        description: "Watch your favorite movies and TV shows",
        image:require('../assets/time.png')
      },
      // more category objects can be added here
    ]
  };
///////////////////////////////////////////////////////////////
  function renderStartLearning(){
    return(
      <ImageBackground
      source={require('../assets/back.jpg')}
      style={{alignItems:'flex-start',
        marginTop:10,
        marginHorizontal:10,padding:20,color:'white'}}
        
        imageStyle={{
          borderRadius:20,
        }}>
          {/* INfo */}
          <View>
            <Text style={{color:'black',fontSize:16}}>
              HOW To
            </Text>
            <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>
              be good Developer
            </Text>
            <Text style={{marginTop:20,color:'black',fontWeight:'bold'}}>
              By Ahmed Hussieny
            </Text>
          </View>

          {/* Image */}
          <Image
          source={require('../assets/we.png')}
          style={{width:"100%",height:170,marginTop:10}}/>

          {/* Button */}
          <TouchableOpacity style={{
            marginTop:4,
            height:30,
            paddingHorizontal:10,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',backgroundColor:'black',}}
            >
          <Text style={{
            color:'white',
        fontSize:20,fontStyle:'italic'}}
        >
          Start lerning
          </Text>
          </TouchableOpacity>
         

      </ImageBackground>
    )
  }
  const renderCourses=()=>{
    return(
      <FlatList
      horizontal
      data={dummyData.courses_list_1}
     listkey="Courses"
     keyExtractor={item=>`Courses-${item.id}`}
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{marginTop:10}
      
     }
     
     renderItem={({item,index})=>(
      <VerticalCourseCard
      containerStyle={{marginLeft:index==0?10:20}}
      course={item}
      />
     )}/>
    )
  }
  function renderCategories(){
  //   return(
  //     <Section
  //      title="Categories"
  //      >
  //       <FlatList
  //       horizontal
  //       data={dummyData.categories}
  //       listkey="categories"
  //       keyExtractor={item=>`categories-${item.id}`}
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={{
  //         marginTop:10
  //       }}
  //       renderItem={({item,index})=>(
  //         <VerticalCourseCard 
  //         category={item}
  //         containerStyle={{
  //           marginLeft:index==0?10:20,
  //           arginRight:index==dummyData.categories.length-1?10:0
  //         }}
  //     />
  //    )}
  // />
  //      </Section>
  //   )
  return(
        <Section
       title="Categories"
       >
    <FlatList
    
    horizontal
    data={dummyData.categories}
   listkey="Courses"
   keyExtractor={item=>`Courses-${item.id}`}
   showsHorizontalScrollIndicator={false}
   contentContainerStyle={{marginTop:10}
    
   }
   
   renderItem={({item,index})=>(
    <CategoryCard
    containerStyle={{marginLeft:index==0?10:20}}
    course={item}
    />
   )}/>
   </Section>
  )
  }
  return (
    <View 
    style={{
      flex:1,backgroundColor:'#002147',
    }}> 
    {/* Header */}
    {renderHeder()}

    {/* Contant */}

    <ScrollView
        contentContainerStyle={{
          paddingBottom:150,
        }}
        showsVerticalScrollIndicator={false}
        >
          {renderStartLearning()}


            {/* Courses */}

            {renderCourses()}
           <LineDivider
           lineStyle={{marginVertical:10}}
           />

           {/* categories */}
           {renderCategories()}

    </ScrollView>
    
    </View>


  );
}
const styles = StyleSheet.create({
  container: {

  }, photo: {
    justifyContent: 'center',
    marginLeft: -24,
    marginTop: -24,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  text: {
    textAlign: 'center'
    , fontSize: 30,
    color: 'white',
    fontStyle: 'italic'

  }, Tbtn: {
    marginLeft: 15,
  }, teext: {
    backgroundColor: 'blue'
    , color: '#fff',
    padding: 10,
  }
  , cont: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});  {/* <ImageBackground style={styles.photo} source={photo2} >
        <Text style={styles.text}>Welcome</Text>
        <Button onPress={signOuthandle} title="SignOut"></Button>
      </ImageBackground> */}