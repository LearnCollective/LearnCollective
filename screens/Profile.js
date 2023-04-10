import react from "react";
import { Text, View, StyleSheet, Button, ImageBackground, Dimensions } from "react-native";
import { signOut } from "firebase/auth";
import { globalstyles } from "../styles/global";
import { auth } from "../firebase/firebase_config";
export default function Profile({ navigation }) {
    // const signOuthandle = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         navigation.navigate('SIGNIN');

    //     }).catch((error) => {
    //         // An error happened.
    //     });
    // }
     const signOuthandle = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          navigation.navigate('SIGNIN');
    
        }).catch((error) => {
          // An error happened.
        });
      }
    return (
        <ImageBackground
            source={require('../assets/back2.png')}
            style={{
                height: Dimensions.get('window').height
            }}>
            <View style={globalstyles.container}>

                <ImageBackground style={styles.photo}  >
                    <Button onPress={signOuthandle} title="SignOut"></Button>


                </ImageBackground>

            </View>

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {

    }, photo: {
        justifyContent: 'center',
        marginLeft: -24,
        marginTop: -24,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    text: {
        textAlign: 'center'
        , fontSize: 30,
        color: 'white',
        fontStyle: 'italic'

    }, Tbtn: {
        marginLeft: 15,
    }, teext: {
        backgroundColor: 'blue'
        , color: '#fff',
        padding: 10,
    }
    , cont: {
        flexDirection: 'row',
        justifyContent: 'center',
    }

});