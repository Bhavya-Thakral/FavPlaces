import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceForm from '@/app/components/PlacesList/PlaceForm'


const AddPlaces = ({navigation}) => {
  function createPlace({place}){
    navigation.navigate('AllPlaces',{place:place})

  }
  return (
    <>
    <PlaceForm onCreatePlace={createPlace} />
    </>
  )
  
  
}

export default AddPlaces

const styles = StyleSheet.create({})