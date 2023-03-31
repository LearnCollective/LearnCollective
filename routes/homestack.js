import { createStackNavigator, Header, HeaderTitle } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Home from "../screens/home";
import Register from "../screens/Register";
import { NavigationContainer } from '@react-navigation/native';


const screens={ 
  
  REGISTER:{
        screen:Register,
        navigationOptions: ({ navigation }) => ({
            headerShown: navigation.getParam('showHeader', false),
          }),   
    },


    SIGNIN:{
        screen:Login,
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

    
}
const HomeStack=createStackNavigator(screens);


export default createAppContainer(HomeStack);