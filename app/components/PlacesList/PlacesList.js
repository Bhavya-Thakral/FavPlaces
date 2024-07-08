import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import PlaceItem from './PlaceItem'
import { GlobalColors } from '@/app/constants/Colors'

const PlacesList = ({places}) => {

    if(!places || places.length === 0){
        return <View style={styles.fallbackContainer} >
            <Text style={styles.fallbackText} >No places found. Maybe start adding some!</Text>
        </View>
    }
  return (
    <View>
      <FlatList data={places} keyExtractor={(item)=>item.id} renderItem={({item})=> <PlaceItem place={item} />} />
    </View>
  )
}

export default PlacesList

const styles = StyleSheet.create({
    fallbackContainer:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        // backgroundColor:GlobalColors.bgcColor
    },
    fallbackText:{
        fontSize:18,
        color:GlobalColors.primaryColor,
        fontWeight:'bold'
    }
})