import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import PlacesList from '../components/PlacesList/PlacesList'
import { GlobalColors } from '../constants/Colors'
import { useIsFocused } from '@react-navigation/native'



const AllPlaces = ({navigation , route }) => {

  const isFocused = useIsFocused();
  const [listedPlaces , setListedPlaces]= useState([]);


  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(
        <Pressable onPress={()=>navigation.navigate('AddPlaces')} style={({pressed})=>pressed && {opacity:0.5} } >
          <Text style={{color:GlobalColors.primaryColor, fontSize:36, marginRight:10}}>+</Text>
        </Pressable>
      ),
    
      
    })
  })

  useEffect(()=>{
    if(isFocused && route.params){
      setListedPlaces(curPlace => [...curPlace,route.params.place])
    }
  },[isFocused]);



  return (
    <View>
      <PlacesList places={listedPlaces}/>
    </View>
  )
}

export default AllPlaces

const styles = StyleSheet.create({})