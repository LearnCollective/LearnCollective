import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import { signOut } from "firebase/auth";
import { globalstyles } from "../styles/global";
import { CheckBox, Input } from 'react-native-elements';
import { auth, db } from "../firebase/firebase_config";
import { doc, getDoc, updateDoc, onSnapshot, query, collection } from "firebase/firestore";

import { Avatar, Caption } from "react-native-paper";
import { Formik } from 'formik';
import Register from "./Register";
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import * as ImagePicker from 'expo-image-picker';


import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
    MenuOption,

} from "react-native-popup-menu";
import { LineDivider } from "../components";
import { background, backgroundColor, flex, height } from "styled-system";


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
    const [click, setClick] = useState(true);
    const [modelVisible, setModelVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [wallet, setWallet] = useState();

    const presshandler = () => {
        navigation.navigate('Home');

    }
    function subscribe(callback) {
        const unsubscribe = onSnapshot(query(collection(db, "users")), (snapshot) => {
            const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
            snapshot.docChanges().forEach((change) => {
                if (callback) callback({ change, snapshot });
            });
        });
        return unsubscribe;
    }


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
            setImage(data.photo);
            setWallet(data.wallet)
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
            birthdate: UDate,
            photo: image,

        });
    }

    const Upwallte = async () => {
        const washingtonRef = doc(db, "users", auth.currentUser.uid);
        // Set the "capital" field of the city 'DC'
        console.log(wallet)
        let newwallet = wallet - 100
        await updateDoc(washingtonRef, {
            wallet: newwallet

        });
    }
    const [open, setOpen] = useState(false);

    const handleOpenClose = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //image profile 
    // gallery
    const handelgallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,

        });
        setModelVisible(false)
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };
    // camera
    const handelcamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        setModelVisible(false)
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    // const buy = () => {
    //     // setWallet(wallet - 100)
    //     Upwallte();
    // }
    useEffect(() => {
        const unsubscribe = subscribe(({ change, snapshot }) => {
            if (change.type === "added" || change.type === "modified" || change.type === "removed") {
                ReadData();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);
    return (

        <View style={styles.container} >

            {view ? (
                <View>
                    <TouchableOpacity onPress={presshandler} >
                        <Ionicons name='arrow-back' size={25} top={50} right={40} color='white' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ marginTop: 20, fontSize: 30, color: 'white', fontStyle: 'italic', textAlign: 'center' }}>Profile Page</Text>

                        <View style={{ alignItems: 'center' }}>
                            <Avatar.Image source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                size={150}
                                top={30}
                                right={-10}
                            />
                            <TouchableOpacity style={{ marginTop: 10 }} onPress={edit}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold', marginTop: 30, fontSize: 20 }}>Edit Profile</Text>
                                    <FontAwesome5
                                        name="user-edit"
                                        size={20}
                                        color='white'
                                        left={20}
                                        top={20}
                                    /></View>
                            </TouchableOpacity>
                        </View >

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#47B5FF',
                                fontSize: 20,
                                marginTop: 100,
                                marginBottom: 0,
                                marginLeft: -70,
                                paddingRight: 70,
                                textAlign: 'left',
                            }}> username </Text>

                            <Text style={{
                                fontSize: 20,
                                marginTop: 102,
                                marginBottom: 10,

                                textAlign: 'left',
                                color: 'white',
                                fontSize: 15,

                            }}>{name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: '#47B5FF',
                                    marginLeft: -70,
                                    fontSize: 20,
                                    marginTop: 10,
                                    paddingRight: 100,
                                    marginBottom: 10,
                                    textAlign: 'left',
                                }}
                            > Email</Text>

                            <Text style={{
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 30,

                                textAlign: 'left',
                                color: 'white',
                            }}> {email}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#47B5FF',
                                marginLeft: -70,
                                paddingRight: 10,
                                fontSize: 20,
                                paddingRight: 70,
                                marginBottom: 10,
                                textAlign: 'left',
                            }}> Birth Date</Text>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 0,
                                marginBottom: 10,

                                textAlign: 'left',
                                color: 'white',
                            }}>{date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#47B5FF',
                                marginLeft: -70,
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10,
                                paddingRight: 40,
                                textAlign: 'left',
                            }}> phone Number</Text>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10,

                                textAlign: 'left',
                                color: 'white',
                            }}>{phone}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#47B5FF',
                                marginLeft: -70,
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10,
                                paddingRight: 40,
                                textAlign: 'left',
                            }}> balance</Text>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 10,

                                textAlign: 'left',
                                color: 'white',
                            }}>{wallet}</Text>
                        </View>
                    </View>
                    <LineDivider lineStyle={{ width: 200, backgroundColor: 'white' }} />
                    <View>
                        <TouchableOpacity onPress={signOuthandle}><Text style={{ margin: 10, marginTop: 40, color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>signOut</Text></TouchableOpacity>
                    </View>


                </View >
            ) : (
                <Formik

                    initialValues={{ name: name, date: date, phone: phone, photo: image }}
                    validateOnMount={true}

                    onSubmit={values => {
                        UpdateData(values.name, values.phone, values.date, image);
                        setView(true);
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



                                <View>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={save} >
                                        <Ionicons name='arrow-back' size={25} top={40} color='white' />
                                    </TouchableOpacity>
                                    <Text style={styles.title1}>Edit Profile</Text>


                                    <View style={{ alignItems: 'center' }}>
                                        <Avatar.Image source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                            size={150}
                                            top={5}
                                        />
                                        <View>
                                            {!modelVisible ? (
                                                <TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{ marginTop: -38, marginLeft: 60, height: 35, width: 35, backgroundColor: 'white', borderRadius: 50 }}>
                                                    <Ionicons
                                                        name='ios-camera-outline'
                                                        top={2}
                                                        left={3.4}
                                                        size={28}
                                                        color='black' />
                                                </TouchableOpacity>
                                            ) : null}
                                            {/*------------------------------------------*/}
                                        </View>


                                        <Modal
                                            animationType='no slide'
                                            visible={modelVisible}
                                            transparent={true}
                                        >
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>

                                                    <View style={{ alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={handelcamera} >
                                                            <Text style={{ fontSize: 20, marginBottom: 5 }}>Take Photo </Text>
                                                        </TouchableOpacity>


                                                        <TouchableOpacity onPress={handelgallery}>
                                                            <Text style={{ fontSize: 20, marginBottom: 5 }}>Choose From Gallery</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => setModelVisible(false)}>
                                                            <Text style={{ fontSize: 20, }}>close</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>



                                    <View style={{ marginTop: 35, }}>
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

                                        <View style={{ marginBottom: 40 }} />
                                    </View>
                                    <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={handleSubmit} rounded disabled={!isValid} style={[styles.loginBtn, styles.shadowBtn, { shadowColor: '#dd4a39', backgroundColor: isValid ? '#38E54D' : '#cacfd2' }]} >
                                            <Text style={{ color: '#ffffff', marginTop: 5, fontWeight: 'bold' }}>Save</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginBottom: 60 }} />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>


                    )
                    }

                </Formik >
            )
            }
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
        marginTop: 10,
        marginBottom: '3%',
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
    },
    modalView: {
        margin: 20,
        width: 210,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        elevation: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: -150,

    },


});