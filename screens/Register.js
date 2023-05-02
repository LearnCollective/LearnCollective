import React, { useState } from 'react';
import { StyleSheet, alert, TouchableOpacity, Button, Text, Item, ScrollView, View, TextInput, ImageBackground, Dimensions, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "../firebase/firebase_config";
import { CheckBox, Input } from 'react-native-elements';
import photo2 from '../assets/back.jpg'
import { ListItem, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { provider, db } from "../firebase/firebase_config";
import { Formik } from 'formik';
import * as yup from 'yup';
// import PhoneInput from "react-native-phone-number-input";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";
import { marginTop, paddingBottom, width } from 'styled-system';


const loginValidationSchema = yup.object().shape({
  fullname: yup.string().matches(/(\w.+\s).+/, 'Enter at least 2 names').required('Full name is required'),
  email: yup.string().email('Please enter valid email').required('Email Address is required'),
  dateofbirth: yup.string()
    .required('Date of Birth is required')
    .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
 // phonenumber: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required('Phone Number is required'),
  password: yup.string()
    .required('password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ), confirmPwd: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});



const image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBR9MAw997U9x7Vjx0uQ4HFmMW9MM8ftj1NA&usqp=CAU' };
export default function Register({ navigation }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowconfirmPassword, setShowconfirmPassword] = useState(false);
  const [rememberMe, setrememberme] = useState(false);


  const press = () => {
    navigation.navigate('SIGNIN');
  }
  const press2 = () => {
    navigation.navigate('Home');
  }
  const [loggedIn, setloggedIn] = useState(false);
  const [,] = useState([]);

  const storeDataBase = async (email, name, phone, date) => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: email,
      name: name,
      phone: phone,
      birthdate: date
    });
  };
  // const auth = getAuth();
  const handelSignGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const [count, setcont] = useState(0);
  const image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBR9MAw997U9x7Vjx0uQ4HFmMW9MM8ftj1NA&usqp=CAU' };

  const increment = () => {
    setcont(count + 1);
  };

  return (

    <Formik

      initialValues={{ fullname: '', email: '', dateofbirth: '', phonenumber: '', password: '', confirmPwd: '' }}
      validateOnMount={true}
      onSubmit={values => {
        ////call sign In her
        createUserWithEmailAndPassword(auth, values.email, values.password, values.fullname, values.dateofbirth, values.phonenumber)

          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            storeDataBase(values.email, values.fullname, values.phonenumber, values.dateofbirth);

            console.log(values.email)
            navigation.navigate('Onboard')

            // {
            //   paramKey: values.fullname,
            // }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error")
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
              <Text style={{ color: '#001833', fontSize: 34 }}>Welcome</Text>
              <Text>Do you have an account ?
                <Text style={{ color: 'red', fontStyle: 'italic' }} onPress={press}>
                  {' '} login now
                </Text>
              </Text>
              {/*Form inputs View */}
              <View style={{ marginTop: 50 }}>

                <View floatingLable style={{ borderColor: '#4632A1', alignItems: 'stretch' }}>
                  <Text>Full Name</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Input style={styles.bord} fontWeight='500'
                      onChangeText={handleChange('fullname')}
                      onBlur={handleBlur('fullname')} value={values.fullname}
                    />
                    <Icon name={!errors.fullname ? 'check' : 'close'} style={{ color: !errors.fullname ? '#4632A1' : 'red' }} />

                  </View>
                </View>
                <View style={{ marginTop: -10, paddingBottom: 10 }}>
                  {[errors.fullname && touched.fullname] &&
                    <Text style={styles.errors}>{errors.fullname}</Text>
                  }
                </View>

                <View floatingLable style={{ borderColor: '#4632A1' }}>
                  <Text>Email</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                    <Input onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')} 
                      underlineColorAndroid="#111"

                      value={values.email}
                    />

                    <Icon name={!errors.email ? 'check' : 'close'} style={{ color: !errors.email ? '#4632A1' : 'red' }} />
                  </View>
                </View>

                <View style={{ marginTop: -10, paddingBottom: 10 }}>
                  {[errors.email && touched.email] &&
                    <Text style={styles.errors}>{errors.email}</Text>
                  }
                </View>

                <View floatingLable style={{ borderColor: '#4632A1' }}>
                  <Text>Date Of Birth</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                    <Input onChangeText={handleChange('dateofbirth')}
                      onBlur={handleBlur('dateofbirth')} value={values.dateofbirth}
                    />

                    <Icon name={!errors.dateofbirth ? 'check' : 'close'} style={{ color: !errors.dateofbirth ? '#4632A1' : 'red' }} />
                  </View>
                </View>
                <View style={{ marginTop: -10, paddingBottom: 10 }}>
                  {[errors.dateofbirth && touched.dateofbirth] &&
                    <Text style={styles.errors}>{errors.dateofbirth}</Text>
                  }
                </View>

                {/* <View floatingLable style={{ borderColor: '#4632A1' }}>
                  <Text>Phone Number</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    <PhoneInput
                      defaultCode='EG'
                      onChangeText={handleChange('phonenumber')}
                      onBlur={handleBlur('phonenumber')} value={values.phonenumber}
                    />
                    <Icon top={22} name={!errors.phonenumber ? 'check' : 'close'} style={{ color: !errors.phonenumber ? '#4632A1' : 'red' }} />
                  </View>
                </View> */}
                {/* <View style={{ marginTop: -10, paddingBottom: 10 }}>
                  {[errors.phonenumber && touched.phonenumber] &&
                    <Text style={styles.errors}>{errors.phonenumber}</Text>
                  }
                </View> */}

                <View floatingLable style={{ borderColor: '#4632A1', alignItems: 'stretch' }}>
                  <Text>Password</Text>
                  <View style={{ flexDirection: 'row' }}>

                    <Input style={styles.bord} fontWeight='500'
                      secureTextEntry={!ShowPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password} />

                    <Icon name={ShowPassword ? 'eye' : 'eye-slash'} style={{ color: '#4632A1' }} onPress={() => setShowPassword(!ShowPassword)} />
                  </View>
                </View>
                <View style={{ marginTop: -10 }}>
                  {[errors.password && touched.password] &&
                    <Text style={styles.errors}>{errors.password}</Text>
                  }</View>

                <View floatingLable style={{ borderColor: '#4632A1', alignItems: 'stretch' }}>
                  <Text>Confirm Password</Text>
                  <View style={{ flexDirection: 'row' }}>

                    <Input style={styles.bord} fontWeight='500'
                      secureTextEntry={!ShowconfirmPassword}
                      onChangeText={handleChange('confirmPwd')}
                      onBlur={handleBlur('confirmPwd')}
                      value={values.confirmPwd} />

                    <Icon name={ShowconfirmPassword ? 'eye' : 'eye-slash'} style={{ color: '#4632A1' }} onPress={() => setShowconfirmPassword(!ShowconfirmPassword)} />
                  </View>
                </View>
                <View style={{ marginTop: -10 }}>
                  {[errors.confirmPwd && touched.confirmPwd] &&
                    <Text style={styles.errors}>{errors.confirmPwd}</Text>
                  }</View>


              </View>
              {/*Forgot password And remember me */}
              <View style={styles.forgetpassView}>
                <View style={{ flex: 1, margin: -20 }}>

                  <ListItem noBorder style={{ marginLeft: -20 }}>
                    <CheckBox onPress={() => setrememberme(!rememberMe)} checked={rememberMe} color='#4632A1'></CheckBox>
                    <View>
                      <Text style={{ color: '#8f9195', alignSelf: 'flex-start', marginLeft: -30 }}>Remember Me</Text>
                    </View>
                  </ListItem>
                </View>

                <View style={{ flex: 1 }}>


                </View>

              </View>

              {/*Login Button & Social Login Buttons View */}
              <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSubmit} rounded disabled={!isValid} style={[styles.loginBtn, styles.shadowBtn, { shadowColor: '#00acee', backgroundColor: isValid ? '#001833' : '#cacfd2' }]} >
                  <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold' }}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>Or Login With</Text>
                {/*social buttons view */}
                <View style={styles.socialLoginView}>
                  <TouchableOpacity Icon style={[styles.shadowBtn, { backgroundColor: '#4267b2' }, { width: 55, height: 65 }]} rounded  >
                    <SocialIcon button type='facebook' />
                  </TouchableOpacity>

                  <TouchableOpacity Icon style={[styles.shadowBtn, { backgroundColor: '#00acee' }, { width: 55, height: 65 }]} rounded >
                    <SocialIcon button type='twitter' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handelSignGoogle} Icon style={[styles.shadowBtn, { backgroundColor: '#dd4a39' }, { width: 55, height: 65 }]} rounded >
                    <SocialIcon button type='google' />
                  </TouchableOpacity>


                </View>
              </View>

            </View>
          </View>

        </ScrollView>
      )
      }

    </Formik >

  )
}
const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, brandViewText: {
    color: 'white',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
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
  },
  container: {
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
  },
  photo: {
    alignContent: 'center',

    marginBottom: -50,
  }
});