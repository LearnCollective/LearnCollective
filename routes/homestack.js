import { createStackNavigator, Header, HeaderTitle } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Home from "../screens/home";
import Register from "../screens/Register";
import { NavigationContainer } from '@react-navigation/native';
import forgetpassword from "../screens/Forgetpassword";
import OnboardingScreen from "../screens/OnboardingScreen";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Purchase from "../screens/Purchase";
import Cart from "../screens/Cart";

const screens={   
  
    
   Home:{
        screen:Home,
        navigationOptions: ({ navigation }) => ({
            headerShown: navigation.getParam('showHeader', false),
          }), 
        },

      //  Cart:{
        //  screen:Cart,
          //navigationOptions: ({ navigation }) => ({
            //  headerShown: navigation.getParam('showHeader', false),
            //}), 
          //},
       

  SIGNIN:{
    screen:Login,
    navigationOptions: ({ navigation }) => ({
        headerShown: navigation.getParam('showHeader', false),
      }),
    },    SEARCH:{
    screen:Search,
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
 
    REGISTER:{
    screen:Register,
    navigationOptions: ({ navigation }) => ({
        headerShown: navigation.getParam('showHeader', false),
      }),   
}, 
   

PURCHASE:{
  screen:Purchase,
  navigationOptions: ({ navigation }) => ({
      headerShown: navigation.getParam('showHeader', false),
    }),
},


 
 
  SEARCH:{
    screen:Search,
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