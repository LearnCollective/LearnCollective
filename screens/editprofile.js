import react from "react";
import {SafeAreaView,Text,StyleSheet,View,Image}from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
export default function editprofile({ navigation }) {
const Editprifile = () => {
  // Implement logic to sign out the user
  navigation.navigate("PROFILE");
};
const handleSignOut = () => {
  // Implement logic to sign out the user
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#437B85" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#3d3d3d " />
          
        </TouchableOpacity>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Image
              source={require("../assets/profile.png")}
              style={styles.provileAvatar}
            />
            <View style={styles.profilebody}>
              <Text style={styles.profileName}>hazem</Text>
              <Text style={styles.profileHandle}>hazemamr@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity onPress={Editprifile}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    flex: 1,
  },
  provileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
  },
  profileHandle: {
    fontSize: 15,
    color: "#989898",
    marginTop: 4,
  },
  profileAction: {
    marginTop: 16,
    backgroundColor: "#6C7C8D",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: "#F31818",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
  },
});
