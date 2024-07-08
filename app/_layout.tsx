import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import PlaceDetails from "./screens/PlaceDetails";
import Map from "./screens/Map";

import { StatusBar, StyleSheet } from "react-native";
import { GlobalColors } from "./constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer independent={true}>
        {/* <SafeAreaView style={styles.container}> */}
        <StatusBar
          backgroundColor={"transparent"}
          translucent={true}
          barStyle={"dark-content"}
        />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalColors.bgcColor,
            },
            headerTintColor: GlobalColors.primaryColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            contentStyle: { backgroundColor: GlobalColors.bgcColor },
          }}
        >
          <Stack.Screen name="AllPlaces" component={AllPlaces} />
          <Stack.Screen name="AddPlaces" component={AddPlaces} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1313",
  },
});
