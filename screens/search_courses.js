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
    course.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
          onPress={() => setSearchQuery("")}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ color: "#555", fontSize: 16 }}>Clear</Text>
        </TouchableOpacity>
      </View>
      {searchQuery ? (
        filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  const navigation = useNavigation();
                  navigation.navigate("CourseDetails", { courseId: item.id });
                }}
              >
                <Image source={item.thumbnail} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={{ fontSize: 16 }}>Sorry, no courses found</Text>
          </View>
        )
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 16 }}>Search about courses</Text>
        </View>
      )}
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
    backgroundColor: "#FFFFFF",
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
