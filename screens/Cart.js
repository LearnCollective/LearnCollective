import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, Button, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase_config";
import { doc, getDoc, updateDoc, onSnapshot, query, collection } from "firebase/firestore";
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LineDivider } from "../components";
import { background, backgroundColor, flex, height } from "styled-system";
import { SharedElement } from "react-native-shared-element";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Profile({ navigation }) {
  const [view, setView] = useState(true);
  const [wallet, setWallet] = useState();
  const [modelVisible, setModelVisible] = useState(false);
  const [mVisible, setMVisible] = useState(false);
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


  const ReadData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setWallet(data.wallet)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
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

  const buy = () => {
    // setWallet(wallet - 100)
    Upwallte();
  }
  const Confirm = () => {
    buy();
    setModelVisible(!modelVisible);
    setMVisible(!mVisible);
  }
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

  ReadData();
  return (

    <View style={styles.container} >
      <View>
        <TouchableOpacity onPress={presshandler} >
          <Ionicons name='arrow-back' size={25} top={55} right={20} color='white' />
        </TouchableOpacity>
        <View>
          <View>
            <View style={{ marginRight: 190 }}>
              <Text style={{ marginTop: 20, fontSize: 30, color: 'white', textAlign: 'center' }}>My Card</Text>
            </View>

            {/* <Text style={{
              fontSize: 20,
              marginTop: 10,
              marginBottom: 10,

              textAlign: 'left',
              color: 'white',
            }}>
              {wallet}</Text> */}

            <Modal
              animationType='slide'
              visible={modelVisible}
              transparent={true}
              onRequestClose={() => {
                setModelVisible(!modelVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 21 }}>Are you sure to buy</Text>
                    <Text style={{ fontSize: 21 }}>this course?</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                    <View style={styles.btview}>
                      <TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{ backgroundColor: '#f00', height: 40, width: 120, borderRadius: 20, alignItems: 'center' }}>
                        <Icon name='remove' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Cancel</Text></Icon>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.btview}>
                      <TouchableOpacity onPress={Confirm} style={{ backgroundColor: '#3ded97', height: 40, width: 120, borderRadius: 20, alignItems: 'center', marginLeft: 20 }}>
                        <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}>Confirm</Text></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>


            <Modal
              animationType='slide'
              visible={mVisible}
              transparent={true}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ fontSize: 21 }}>your balance:{wallet}</Text>
                  <View style={{ alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                      <View style={styles.btview}>
                        <TouchableOpacity onPress={() => setMVisible(!mVisible)} style={{ backgroundColor: '#3ded97', height: 40, width: 80, borderRadius: 20, alignItems: 'center', }}>
                          <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Ok</Text></Icon>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          {/* <TouchableOpacity onPress={buy}><Text style={{ fontSize: 20 }}>buy</Text></TouchableOpacity> */}
        </View>
        <View style={{ alignItems: 'center', marginTop: 450 }}>
          <LineDivider lineStyle={{ width: 350, backgroundColor: 'white' }} />
        </View>
        <View style={{ marginTop: 70, alignItems: 'center' }}>

          <TouchableOpacity onPress={() => setModelVisible(!modelVisible)} style={{ backgroundColor: '#3ded97', height: 40, width: 120, borderRadius: 20, alignItems: 'center', marginLeft: 20 }}>
            <Icon name='check' top={9} size={20} color={'white'}> <Text style={{ color: 'black', fontSize: 20 }}> Buy</Text></Icon>
          </TouchableOpacity>
        </View>
      </View >
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
  modalView: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

});
