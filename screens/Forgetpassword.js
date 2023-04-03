import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Image, Button, Text, Item, ScrollView, View, TextInput, ImageBackground, Dimensions } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

import { auth } from "../firebase/firebase_config";
import { CheckBox, Input } from 'react-native-elements';
import photo2 from '../assets/back.jpg'
import { ListItem, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup'


const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is required'),
 
});



const image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBR9MAw997U9x7Vjx0uQ4HFmMW9MM8ftj1NA&usqp=CAU' };
export default function forgetpassword({ navigation }) {

  const [ShowPassword, setShowPassword] = useState(false);
  const [rememberMe, setrememberme] = useState(false);
  const press = () => {
    navigation.navigate('REGISTER');
  }
  const press2 = () => {
    navigation.navigate('Forgetpassword');
  }
  const [count, setcont] = useState(0);
  const image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBR9MAw997U9x7Vjx0uQ4HFmMW9MM8ftj1NA&usqp=CAU' };

  const increment = () => {
    setcont(count + 1);
  }
  return (

    <Formik

      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={values => {
        ////call sign In here

        sendPasswordResetEmail(auth,values.email)
  .then(() => {
    // Password reset email sent!
    Alert.alert('Email sent');
    navigation.navigate('SIGNIN');
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

      }}
      validationSchema={loginValidationSchema}

    >

      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


        <ScrollView
          style={{ flex: 1, backgroundColor: '#ffffff' }}
          showsVerticalScrollIndicator={false}>

          <ImageBackground
            source={require('../assets/back2.png')}
            style={{
              height: Dimensions.get('window').height / 2.5
            }}>
            <View style={styles.brandView}>

              {/* <Icon
                name='laptop'
                type='evilicon'
                color='#ffffff'
                size={110}
              /> */}
              <Image style={{
                marginBottom: -170,
                width: 380,
                height: 380,
              }}
                source={require('../assets/logo2.png')}
              />

              <Text style={styles.brandViewText}>LearnCollective</Text>
            </View>
          </ImageBackground>
          {/* bottom view */}
          <View style={styles.bottomView}>
            {/*Welcome View */}
            <View style={{ padding: 40 }}>
              <Text style={{ color: '#001833', fontSize: 30 }}>Reset Your Password</Text>
              
              {/*Form inputs View */}
              <View style={{ marginTop: 35 }}>
                <View floatingLable style={{ borderColor: '#4632A1' }}>
                  <Text>Email</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                    <Input onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')} value={values.email}
                       />

                    <Icon name={!errors.email ? 'check' : 'close'} style={{ color: !errors.email ? '#4632A1' : 'red' }} />
                  </View>
                </View>

                <View style={{ marginTop: -10, paddingBottom: 10 }}>
                  {[errors.email && touched.email] &&
                    <Text style={styles.errors}>{errors.email}</Text>
                  }

                </View>
              
              </View>
              {/*Forgot password And remember me */}
       
              {/*Login Button & Social Login Buttons View */}
              <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSubmit} rounded disabled={!isValid} style={[styles.loginBtn, styles.shadowBtn, { shadowColor: '#00acee',marginTop:80, backgroundColor: isValid ? '#001833' : '#cacfd2' }]} >
                  <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold' }}>send mail</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>

                {/*social buttons view */}
                <View style={styles.socialLoginView}>
                  {/* <TouchableOpacity Icon style={[styles.shadowBtn, { backgroundColor: '#4267b2' }, { width: 55, height: 65 }]} rounded >
                    <SocialIcon button type='facebook' />
                  </TouchableOpacity>

                  <TouchableOpacity Icon style={[styles.shadowBtn, { backgroundColor: '#00acee' }, { width: 55, height: 65 }]} rounded >
                    <SocialIcon button type='twitter' />
                  </TouchableOpacity>


                  <TouchableOpacity Icon style={[styles.shadowBtn, { backgroundColor: '#dd4a39' }, { width: 55, height: 65 }]} rounded >
                    <SocialIcon button type='google' />
                  </TouchableOpacity> */}


                </View>
              </View>

            </View>
          </View>

        </ScrollView>
      )}

    </Formik>

  )
}
const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, brandViewText: {
    color: 'white',
    fontSize: 30
    , fontStyle: 'italic'
    , fontWeight: 'bold',
    marginBottom: 110,
  }, bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  }, forgetpassView: {
    height: 50,
    marginTop: 20,
    flexDirection: 'row'
  }, loginBtn: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    borderRadius: 50,
    height: 30,
  },
  socialLoginView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
    , marginTop: 20,
  }, shadowBtn: {
    shadowOffset: { width: 1, height: 10 }
    , shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15, borderRadius: 50,
  }, errors: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold'
    , marginTop: 5,
  }




  , container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  }, bold: {
    fontWeight: 'bold',
  }, body: {
    backgroundColor: 'red',
    padding: 20,

  }, ButtonContainer: {

    marginTop: 20
  }, input: {
    borderWidth: 3,
    borderColor: '#99c9ff',
    padding: 15,
    margin: 5,
    width: 370,
    height: 60,
  }, Tbtn: {

    flexDirection: 'row',
    margin: 10,

  }, image: {
    width: 370,
    height: 200,
    marginTop: -150,
    justifyContent: 'center',
  },

  floatingMenuButtonStyle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 35,
    width: 300
  }
});