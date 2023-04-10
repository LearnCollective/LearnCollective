import { createStackNavigator, Header, HeaderTitle } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Home from "../screens/home";
import Register from "../screens/Register";
import { NavigationContainer } from '@react-navigation/native';
import forgetpassword from "../screens/Forgetpassword";
import OnboardingScreen from "../screens/OnboardingScreen";
import Profile from "../screens/Profile";

const screens={
  SIGNIN:{
    screen:Login,
    navigationOptions: ({ navigation }) => ({
        headerShown: navigation.getParam('showHeader', false),
      }),
},

REGISTER:{
    screen:Register,
    navigationOptions: ({ navigation }) => ({
        headerShown: navigation.getParam('showHeader', false),
      }),   
}, 
 
 


   
   
    Home:{
        screen:Home,
        navigationOptions: ({ navigation }) => ({
            headerShown: navigation.getParam('showHeader', false),
          }),
    },

    PROFILE:{
      screen:Profile,
      navigationOptions: ({ navigation }) => ({
          headerShown: navigation.getParam('showHeader', false),
        }),
  },
    
    Onboard:{
      screen:OnboardingScreen,
      navigationOptions: ({ navigation }) => ({
          headerShown: navigation.getParam('showHeader', false),
        }),   
  }, 
 Forgetpassword:{ 
      screen:forgetpassword,
      navigationOptions: ({ navigation }) => ({
          headerShown: navigation.getParam('showHeader', false),
        }),
  },
   

    
}
const HomeStack=createStackNavigator(screens);


export default createAppContainer(HomeStack);