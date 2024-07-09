import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import { fetchPlaceDetails } from "../utils/Database";
import { GlobalColors } from "../constants/Colors";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const selectedPlaceId = route.params.placeId;
  console.log(selectedPlaceId, "selectedPlaceId");

  useEffect(() => {
    async function fetchPlace() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    fetchPlace();
  }, [selectedPlaceId, navigation]);

  console.log(fetchedPlace, "fetchedPlace");

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data..</Text>
      </View>
    );
  }

  function showMapHandler() {
    navigation.navigate("Map", {
      initalLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  return (
    <ScrollView>
      <Image source={{ uri: fetchedPlace.imageUri }} style={styles.img} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <Button onPress={showMapHandler}>View on Map</Button>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  img: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalColors.primaryColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
