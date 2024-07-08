import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalColors } from "@/app/constants/Colors";
import Button from "@/app/components/Button";
import * as Location from "expo-location";
import { getAddress, getMapPreview } from "@/app/utils/Location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ handleLocation }) => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  async function verifyPermission() {
    if (
      locationPermissionInformation.status ===
      Location.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (
      locationPermissionInformation.status === Location.PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Permission Denied",
        "You need to grant camera permission to use this feature"
      );
      return false;
    }
    return true;
  }

  async function handleUserLocation() {
    await verifyPermission();

    if (!locationPermissionInformation) return;

    const location = await Location.getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    const humanAddress = await getAddress(
     location.coords.latitude,
     location.coords.longitude,
    );
    handleLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      address: humanAddress,
    });
  }

  function handleLocationPicker() {
    navigation.navigate("Map");
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setLocation(mapPickedLocation);
      handleLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function getLocation() {
      if (location) {
        const humanAddress = await getAddress(
           location.lat,
          location.lng,
        );
        //    console.log("human address",humanAddress);
        handleLocation({ ...location, address: humanAddress });
      }
    }
    getLocation();
  }, [location, handleLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Location</Text>
      {location ? (
        <Image
          source={{ uri: getMapPreview(location.lat, location.lng) }}
          style={styles.img}
        />
      ) : null}
      <View style={styles.btnCont}>
        <Button onPress={handleUserLocation}>User Location</Button>
        <Button onPress={handleLocationPicker}>Pick Location</Button>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalColors.primaryColor,
  },
  input: {
    borderWidth: 1,
    borderColor: GlobalColors.primaryColor,
    padding: 10,
    borderRadius: 7,
  },
  img: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 7,
  },
  btnCont: {
    flexDirection: "row",
    gap: 10,
  },
});
