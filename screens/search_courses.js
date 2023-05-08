import React, { useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import dummyData from "../constrants/dummyData";
import { Image } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const CoursesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const coursesList = dummyData.categories;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCourses = coursesList.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Search courses"
            value={searchQuery}
            onChangeText={handleSearch}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              borderColor: "#ccc",
              borderWidth: 1,
            }}
          />
        </View>
        <TouchableOpacity
          // onPress={() => {
          //   setSearchQuery("");
          //   setFilteredCourses([]);
          // }}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ color: "#555", fontSize: 16 }}>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            // onPress={() => {
            //   const navigation = useNavigation();
            //   navigation.navigate("CourseDetails", { courseId: item.id });
            // }}
          >
            <Image source={item.thumbnail} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#888888",
  },
});


export default CoursesScreen;
