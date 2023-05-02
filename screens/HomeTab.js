import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import Search from "./Search";
import Courses from "./Courses";
import DownloadCourses from "./DownloadCourses";
import Profile from "./Profile";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
// import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function HomeTab() {

    return (

        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                }}
                screenOptions={
                    {
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: 15,
                            left: 20,
                            right: 20,
                            borderRadius: 20,
                            shadowColor: 'blue',
                            shadowRadius: 3.5,
                        },
                    }} >


                <Tab.Screen name="search" component={Search} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <AntDesign name="search1"
                                size={20}
                                color={focused ? 'gray' : 'blue'}
                            >
                            </AntDesign>
                            <Text style={{
                                alignItems: 'center',
                                color: focused ? 'gray' : 'blue',
                            }}>Search</Text>

                        </View>
                    ),
                    headerShown: false
                }}


                />
                <Tab.Screen name="Courses" component={Courses}

                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center' }}>
                                <SimpleLineIcons
                                    name="book-open"
                                    size={20}
                                    color={focused ? 'gray' : 'blue'}
                                >
                                </SimpleLineIcons>
                                <Text style={{
                                    alignItems: 'center',
                                    color: focused ? 'gray' : 'blue',
                                }}>Courses</Text>

                            </View>
                        ),
                        headerShown: false
                    }} />

                <Tab.Screen name="Download" component={DownloadCourses} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <SimpleLineIcons name="cloud-download"
                                size={20}
                                color={focused ? 'gray' : 'blue'}
                            >
                            </SimpleLineIcons>
                            <Text style={{
                                alignItems: 'center',
                                color: focused ? 'gray' : 'blue',
                            }}>Downloads</Text>

                        </View>
                    ), headerShown: false
                }} />
                <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>

                            <Ionicons name="ios-person-circle-outline"
                                size={25}
                                color={focused ? 'gray' : 'blue'}
                            >
                            </Ionicons>

                            <Text style={{
                                alignItems: 'center',
                                color: focused ? 'gray' : 'blue',
                                marginTop: -4,
                            }}>Profile</Text>
                        </View>
                    ), headerShown: false
                }} />
            </Tab.Navigator >
        </NavigationContainer>

    );
}