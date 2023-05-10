import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { shadow } from "styled-system";
import * as Font from 'expo-font';
import Login from "./Login";
//import * as Progress from 'react-native-progress';
const slides = [
  {
    key: "one",
    title: "Welcome to the   future of learning",
    text: "LearnCollective the ultimate destination for lifelong learners.",
    image: require("../assets/Logooo.png"),

  },
  {
    key: "two",
    title: "LearnCollective platform",
    text: "Help you discover a world of knowledge and be part of a community of lifelong learners",
    image: require("../assets/Logoo.png"),
  },
  {
    key: "three",
    title: "Join us and start learning today",
    text: "Let's go now",
    image: require("../assets/logo4.png"),
  },
];

let customFonts = {
  'kalam': require('../assets/fonts/Kalam-Bold.ttf'),
  'frederic': require('../assets/fonts/FrederickatheGreat-Regular.ttf'),
};
export default class OnboardingScreen extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }



  state = { showHomePage: false };
  _renderItem = ({ item }) => {

    return (
      <View style={styles.container}>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get('window').height / 2.8,
            width: Dimensions.get('window').width,
            marginTop: '7%',
          }}
        />
        <Text
          style={{
            marginTop: '2%',
            fontSize: 45,
            color: '#DAF5FF',
            textAlign: "center",
            // fontWeight: 'bold',
            fontFamily: 'frederic'

          }}>
          {item.title}
        </Text>

        <Text style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 23,
          marginTop: '2%',
          textAlign: 'center',
          marginRight: '2%',
          marginLeft: '2%',
          marginBottom: '15%',
          fontFamily: 'kalam',
          // fontWeight: 'bold',

        }}>
          {item.text}
        </Text>
      </View>
    )
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign

          name="rightcircle"
          color="white"
          size={40}
          top={7}
        />

      </View>
    )
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle} >
        <AntDesign TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}

          name="checkcircle"
          color="white"
          size={40}
          top={7}

        />
      </View>
    )
  }

  _renderSkipButton = () => {
    return (
      <View style={{ backgroundColor: 'white', borderRadius: 100, height: 40, width: 40, bottom: -.5, marginTop: 7 }}>
        <MaterialCommunityIcons TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}

          name="skip-forward-outline"
          color="#002147"
          size={30}
          top={5}
          left={5}
        />
      </View>
    )
  }


  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    if (this.state.showHomePage) {
      return (<OnboardingScreen />

      )
    } else
      return (

        <AppIntroSlider
          showSkipButton={true}
          renderItem={this._renderItem}
          data={slides}

          renderDoneButton={this._renderDoneButton}
          renderSkipButton={this._renderSkipButton}
          renderNextButton={this._renderNextButton}


          activeDotStyle={{
            backgroundColor: "white",
            width: 20,
          }}
        />

      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002147',
    alignItems: "center",
    height: 200,


  },
  buttonCircle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'red',
    shadowOpacity: 0.5,

  },


});