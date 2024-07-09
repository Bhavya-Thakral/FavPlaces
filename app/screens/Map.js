import { Alert, Pressable, StyleSheet, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

function Map({ navigation, route }) {
  const initialState = route.params && {
    lat: route.params.initalLat,
    lng: route.params.initialLng,
  };

  const [location, setLocation] = useState(initialState);
  console.log(location, "location");

  const region = {
    latitude: initialState ? initialState.lat : 26.8434001,
    longitude: initialState ? initialState.lng :  75.8033221,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function markerHandler(e) {
    if (initialState) return;
    console.log(e.nativeEvent.coordinate);
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setLocation({ lat: lat, lng: lng });
  }

  const saveHandler = useCallback(() => {
    if (!location) {
      Alert.alert("No Location Picked", "Please pick a location on the map", [
        { text: "Okay" },
      ]);
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLat: location.lat,
      pickedLng: location.lng,
    });
  }, [navigation, location]);

  useLayoutEffect(() => {
    if (initialState) return;
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={saveHandler}>
          <Text>Save</Text>
        </Pressable>
      ),
    });
  }, [navigation, saveHandler, initialState]);

  return (
    <MapView initialRegion={region} style={styles.map} onPress={markerHandler}>
      {location && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
