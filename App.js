import React, { useState } from 'react';
import * as Font from 'expo-font';
import Home from './screens/home';
import AppLoading from 'expo';
import Navigator from './routes/homestack'
import { Easing } from 'react-native';
import ReviewDetails from './screens/Login';
import { StackActions } from 'react-navigation';
import HomeTab from './screens/HomeTab';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CourseListing } from './screens';
import CourseDetails from './course/CourseDetails';
import Search from './screens/Search';
import Cart from './screens/Cart'
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import forgetpassword from './screens/Forgetpassword';
import OnboardingScreen from './screens/OnboardingScreen';
import CourseShow from './course/CourseShow';
// import HomeTab from './screens/HomeTab';
// const getFonts =()=>Font.loadAsync({
//     'Nunito-VariableFont_wg ht' :require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
//     'Nunito-Italic-VariableFont_wght':require('./assets/fonts/Nunito-Italic-VariableFont_wght.ttf')
//   });
const Stack = createSharedElementStackNavigator();
const options ={
  gestureEnabled:false,
  transitionSpac:{
    open:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    },
    close:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    }
  },
  cardStyleInterpolator :({current:{progress}})=>{
    return{
      cardStyle:{
        opacity:progress
      }
    }
  }
}
const App=()=> {
  // const [font, setfont] = useState(false);
  return (


    // <Navigator/> 
    // <HomeTab></HomeTab>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
      // useNativeDriver:true,
        headerShown:false

      }}
      // initialRouteName='Home'
      // detachInactiveScreens={false}
      > 
      <Stack.Screen
        name='OnboardingScreen'
        component={OnboardingScreen}
       /> 
       <Stack.Screen
        name='Login'
        component={Login}
       />
         <Stack.Screen
        name='Home'
        component={Home}/>

<Stack.Screen
        name='TAB'
        component={HomeTab}/>

         <Stack.Screen
        name='SEARCH'
        component={Search}/>
         <Stack.Screen
        name='CourseListing'
        component={CourseListing}
        options={()=>options}/>
         <Stack.Screen
        name='CourseDetails'
        component={CourseDetails}
       />
        <Stack.Screen
        name='Cart'
        component={Cart}
       />
        <Stack.Screen
        name='PROFILE'
        component={Profile}
       />
       

<Stack.Screen
        name='Register'
        component={Register}
       />
       <Stack.Screen
        name='Forgetpassword'
        component={forgetpassword}
       />
        <Stack.Screen
        name='CourseShow'
        component={CourseShow}
       />




     
       
      </Stack.Navigator>
    </NavigationContainer>
  );




}
export default App