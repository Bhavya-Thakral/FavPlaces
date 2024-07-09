import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceForm from '@/app/components/PlacesList/PlaceForm'
import { insertPlace } from '../utils/Database';


const AddPlaces = ({navigation}) => {
  async function createPlace(place){
    await insertPlace(place);
    console.log("place",place);
    navigation.navigate('AllPlaces',{place:place})

  }
  return (

    <PlaceForm onCreatePlace={createPlace} />

  )
  
  
}

export default AddPlaces

const styles = StyleSheet.create({})