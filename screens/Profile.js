import react from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Dimensions,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { signOut } from "firebase/auth";
import { globalstyles } from "../styles/global";
import { auth } from "../firebase/firebase_config";
import React, { useState } from "react";
import { TouchableOpacity, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";

//--------------------------------------------------------------------------------------------------
export default function Profile({ navigation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState("hazem");
  const [lastName, setLastName] = useState("hgjf@gmail.com");
  const [email, setEmail] = useState("hazemamromar@gmail.com");
  const [birthdate, setBirthdate] = useState("1/1/1990");
  const [phoneNumber, setPhoneNumber] = useState("01158885124");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  //--------------------------------validation-------------------------------------------------------------
  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!firstName) {
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    // Validate email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email address";
    }

    // Validate birthdate
    if (!birthdate) {
      errors.birthdate = "Birthdate is required";
    }

    // Validate phone number
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const handleSaveProfile = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      // TODO: handle saving profile changes to backend
      //  setIsEditMode(false);
    } else {
      setIsSubmitted(true);
      setIsEditMode(false);
    }
  };

  const renderViewMode = () => (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile.png")}
        style={styles.provileAvatar}
      />
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={[styles.value, styles.dimmedValue]}>{email}</Text>
      <Text style={styles.label}>Birthdate:</Text>
      <Text style={styles.value}>{birthdate}</Text>
      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{phoneNumber}</Text>
      <TouchableOpacity
        onPress={() => setIsEditMode(true)}
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const renderEditMode = () => (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile.png")}
        style={styles.provileAvatar}
      />

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        style={styles.textInput}
      />
      {firstName.length < 3 && (
        <Text style={styles.validationError}>First name is too short.</Text>
      )}
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        style={styles.textInput}
      />
      {lastName.length < 3 && (
        <Text style={styles.validationError}>Last name is too short.</Text>
      )}
      <Text style={styles.label}>Email:</Text>
      <Text style={[styles.value, styles.dimmedValue]}>{email}</Text>
      <TextInput
        value={birthdate}
        onChangeText={setBirthdate}
        placeholder="Birthdate (MM/DD/YYYY)"
        style={styles.textInput}
      />
      {!/^([1-9]|1[0-2])\/([1-9]|[12]\d|3[01])\/\d{4}$/.test(birthdate) && (
        <Text style={styles.validationError}>
          Birthdate format must be MM/DD/YYYY.
        </Text>
      )}
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        style={styles.textInput}
      />
      {!/^\d{3}\d{3}\d{4}\d{1}$/.test(phoneNumber) && (
        <Text style={styles.validationError}>
          Phone number format must be 11 number.
        </Text>
      )}
      <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsEditMode(false)}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return <View>{isEditMode ? renderEditMode() : renderViewMode()}</View>;
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const styles = StyleSheet.create({
  validationError: {
    color: "red", // Add this line to change the color to red
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    marginBottom: 17,
    borderRadius: 50,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
    backgroundColor: "#A5A7AA",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    marginBottom: 10,
    backgroundColor: "#ECEAEBEF",
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  dimmedValue: {
    color: "#999",
  },
  editButton: {
    marginTop: 16,
    backgroundColor: "#0C1116",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: {
    fontSize: 18,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#0C1722",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 16,
    backgroundColor: "#3D628D",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  provileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
});
