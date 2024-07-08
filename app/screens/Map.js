import { Alert, Pressable, StyleSheet, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

const Map = ({navigation}) => {
  const [location, setLocation] = useState();
  console.log(location,"location");

  const region = {
    latitude: 47.60480536478526,
    longitude: -122.32783310115337,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function markerHandler(e) {
    console.log(e.nativeEvent.coordinate);
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setLocation({ lat: lat, lng: lng });
  }

  

  const saveHandler = useCallback(()=>{
    console.log("current location",location);
    if(!location){
      Alert.alert('No Location Picked', 'Please pick a location on the map', [{text:'Okay'}])
      return;
    }
    navigation.navigate("AddPlaces", {
      pickedLat: location.lat,
      pickedLng: location.lng,
    });
  },[navigation, location])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={saveHandler}>
          <Text>Save</Text>
        </Pressable>
      ),
    });
  },[navigation, saveHandler]);

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
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
