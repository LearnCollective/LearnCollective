import React, { useState } from 'react';
import * as Font from 'expo-font';
import Home from './screens/home';
import AppLoading from 'expo';
import Navigator from './routes/homestack'
import ReviewDetails from './screens/Login';
import { StackActions } from 'react-navigation';
import HomeTab from './screens/HomeTab';


// const getFonts =()=>Font.loadAsync({
//     'Nunito-VariableFont_wg ht' :require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
//     'Nunito-Italic-VariableFont_wght':require('./assets/fonts/Nunito-Italic-VariableFont_wght.ttf')
//   });

export default function App() {
  const [font, setfont] = useState(false);

  return (


    <Navigator />
  );




}


