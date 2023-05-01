import React, { useState } from "react";
import { Text, View, StyleSheet, Button, ImageBackground, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { globalstyles } from "../styles/global";
import { CheckBox, Input } from 'react-native-elements';
import { auth, db } from "../firebase/firebase_config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Avatar, Caption } from "react-native-paper";
import { Formik } from 'formik';
import Register from "./Register";
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { LineDivider } from "../components";

const loginValidationSchema = yup.object().shape({
    name: yup.string().matches(/(\w.+\s).+/, 'Enter at least 2 names').required('Full name is required'),
    date: yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required('Phone Number is required'),

});

export default function Profile({ navigation }) {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [view, setView] = useState(true);


    const edit = () => {
        setView(false);
    }
    const save = () => {
        setView(true);
    }

    const ReadData = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            setPhone(data.phone);
            setEmail(data.email);
            setName(data.name);
            setDate(data.birthdate);
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    { view ? ReadData() : null }
    const signOuthandle = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('SIGNIN');
            console.log()
        }).catch((error) => {
            // An error happened.
        });
    }

    const UpdateData = async (Uname, Uphone, UDate) => {
        const washingtonRef = doc(db, "users", auth.currentUser.uid);
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            name: Uname,
            phone: Uphone,
            birthdate: UDate
            // email: b,

        });
    }

    return (

        <View style={styles.container}>
            {view ? (
                <View>
                    <Text style={styles.title}>Profile</Text>

                    <View>
                        <Avatar.Image source={require('../assets/sora.jpg')}
                            size={100}
                            top={10}
                            right={-10}
                        />
                        <TouchableOpacity style={{ marginTop: '5%', marginLeft: '-4%' }} onPress={edit}>
                            <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold', marginLeft: '12%' }}>Edit Profile</Text>
                            <FontAwesome5
                                name="user-edit"
                                size={20}
                                color='white'
                                left={16}
                                top={-23}
                            />
                        </TouchableOpacity>
                        <View style={{ marginTop: '-20%', marginLeft: '25%', }}>
                            <Text style={{
                                color: '#47B5FF',
                                fontSize: 20,
                                marginTop: '-30%',
                                marginLeft: '10%'
                            }}> username </Text>

                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                marginLeft: '15%'
                            }}>{name}</Text>

                            <Text
                                style={{
                                    color: '#47B5FF',
                                    fontSize: 20,
                                    marginLeft: '10%'
                                }}
                            > Email</Text>

                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                marginLeft: '15%'
                            }}> {email}</Text>

                            <Text style={{
                                color: '#47B5FF',
                                fontSize: 20,
                                marginLeft: '10%'
                            }}> Birth Date</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                marginLeft: '15%'
                            }}>{date}</Text>
                            <Text style={{
                                color: '#47B5FF',
                                fontSize: 20,
                                marginLeft: '10%'
                            }}> phone Number</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                marginLeft: '15%'
                            }}>{phone}</Text>


                        </View>
                        <View style={{ borderBottomWidth: 1, marginTop: '15%', borderColor: 'white', }}></View>
                    </View >

                    <Button onPress={signOuthandle} title="SignOut"></Button>

                </View >
            ) : (
                <Formik

                    initialValues={{ name: name, date: date, phone: phone }}
                    validateOnMount={true}

                    onSubmit={values => {
                        UpdateData(values.name, values.phone, values.date);

                    }}


                    validationSchema={loginValidationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


                        <ScrollView
                            style={{
                                flex: 1,

                                backgroundColor: '#002147',

                            }}
                            showsVerticalScrollIndicator={false}>


                            <View style={{ marginLeft: 15, marginRight: 30 }}>


                                <View  >
                                    <Text style={styles.title1}>Edit Profile</Text>
                                    <TouchableOpacity onPress={save} >
                                        <Ionicons name='arrow-back' size={25} top={-40} right={10} color='white' />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center' }}>
                                        <Avatar.Image source={require('../assets/sora.jpg')}
                                            size={100}
                                            top={10}
                                        />


                                        <MenuProvider style={{ marginHorizontal: 100, marginVertical: 60 }} >
                                            <Menu >
                                                <MenuTrigger
                                                    customStyles={{
                                                        triggerWrapper: {
                                                            top: -80,
                                                            right: -20


                                                        },
                                                    }}

                                                >
                                                    <Entypo name='circle-with-plus' size={40} color='#666' />
                                                </MenuTrigger>
                                                <MenuOptions customStyles={{
                                                    optionsContainer: {
                                                        borderRadius: 10,
                                                    },
                                                }} style={{ alignItems: 'center' }}>

                                                    <TouchableOpacity>
                                                        <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 15 }}>Take Photo</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={{ fontSize: 20, marginBottom: 15 }}> Choose From Gallery</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={{ fontSize: 20, marginBottom: 15 }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </MenuOptions>
                                            </Menu>
                                        </MenuProvider>
                                    </View>



                                    <View style={{ marginTop: -80, }}>
                                        <View floatingLable style={{ borderColor: '#4632A1', alignItems: 'stretch', }}>
                                            <Text style={styles.textInput} >Username</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Input style={{ color: 'white' }} fontWeight='500'
                                                    underlineColorAndroid='#002147'
                                                    onChangeText={handleChange('name')}
                                                    onBlur={handleBlur('name')}

                                                    value={values.name}
                                                />
                                                <Icon right={10} name={!errors.name ? 'check' : 'close'} style={{ color: !errors.name ? '#38E54D' : '#FF1818' }} />

                                            </View>
                                        </View>
                                        <View style={{ marginTop: -10, paddingBottom: 10 }}>
                                            {[errors.name && touched.name] &&
                                                <Text style={styles.errors}>{errors.name}</Text>
                                            }
                                        </View>

                                        <View floatingLable style={{ borderColor: '#4632A1' }}>
                                            <Text style={styles.textInput}>Email</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                                                <Text style={{ color: 'white', fontSize: 20, marginLeft: '2%' }}

                                                >{email}</Text>



                                            </View>
                                            <LineDivider lineStyle={{ backgroundColor: '#C5C5C5', opacity: .6, marginBottom: 25, marginTop: 5, height: 1.9 }} />

                                        </View>


                                        <View floatingLable style={{ borderColor: '#4632A1' }}>
                                            <Text style={styles.textInput}  >BirthDate</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                                                <Input style={{ color: 'white' }}
                                                    onChangeText={handleChange('date')}
                                                    onBlur={handleBlur('date')}

                                                    value={values.date}
                                                />

                                                <Icon right={10} name={!errors.date ? 'check' : 'close'} style={{ color: !errors.date ? '#38E54D' : '#FF1818' }} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: -10, paddingBottom: 10 }}>
                                            {[errors.date && touched.date] &&
                                                <Text style={styles.errors}>{errors.date}</Text>
                                            }
                                        </View>

                                        <View floatingLable style={{ borderColor: '#4632A1' }}>
                                            <Text style={[styles.textInput]} >Phone Number</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'stretch', marginTop: 15 }}>

                                                <PhoneInput
                                                    defaultCode='EG'

                                                    onChangeText={handleChange('phone')}
                                                    onBlur={handleBlur('phone')}

                                                    value={values.phone}
                                                />

                                                <Icon top={22} right={-30} name={!errors.phone ? 'check' : 'close'} style={{ color: !errors.phone ? '#38E54D' : '#FF1818' }} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10, paddingBottom: 10 }}>
                                            {[errors.phone && touched.phone] &&
                                                <Text style={styles.errors}>{errors.phone}</Text>
                                            }
                                        </View>

                                        <View style={{ marginBottom: 30 }} />
                                    </View>
                                    <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={handleSubmit} rounded disabled={!isValid} style={[styles.loginBtn, styles.shadowBtn, { shadowColor: '#dd4a39', backgroundColor: isValid ? '#38E54D' : '#cacfd2' }]} >
                                            <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold' }}>Save</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginBottom: 30 }} />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>


                    )
                    }

                </Formik >
            )}
        </View >

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#002147',
        alignItems: 'center',


    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '10%',
        marginBottom: '3%',
        marginRight: '70%',
    }, text: {
        color: 'white',
        fontSize: 20,
        marginTop: '-5%',
        // marginBottom: '-40%',
    }
    , cont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    title1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '10%',
        marginBottom: '3%',
        marginRight: '-100%',
        marginLeft: '10%'
    },
    textInput: {
        marginTop: -5,
        color: 'white',
        fontSize: 17,
    },
    loginBtn: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        borderRadius: 50,
        height: 30,
        padding: 5,
        backgroundColor: '#39A2DB',
        height: '150%',
    },
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
        color: '#FF1818',
        fontWeight: 'bold'
        , marginTop: -3,
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