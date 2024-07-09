import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PlaceItem from "./PlaceItem";
import { GlobalColors } from "@/app/constants/Colors";
import { useNavigation } from "expo-router";

const PlacesList = ({ places }) => {

  const navigation = useNavigation();
  const validPlaces = places.filter(item => item && item.id);
  console.log("validPlaces", validPlaces);

  function selectHandler(id) {
   navigation.navigate('PlaceDetails',{placeId:id});
  }

  if (!validPlaces || validPlaces.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={validPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} onSelect={selectHandler} />}
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    // backgroundColor:GlobalColors.bgcColor
  },
  fallbackText: {
    fontSize: 18,
    color: GlobalColors.primaryColor,
    fontWeight: "bold",
  },
});
