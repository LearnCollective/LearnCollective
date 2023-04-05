import react from "react";
import { Text, View, ImageBackground, Dimensions } from "react-native";
export default function Search() {
    return (
        <ImageBackground
            source={require('../assets/back2.png')}
            style={{
                height: Dimensions.get('window').height
            }}>
            <View>

                <Text >Welcome in Home</Text>
            </View>
        </ImageBackground>
    );
}