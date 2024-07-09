import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalColors } from '@/app/constants/Colors'

const PlaceItem = ({place ,onSelect}) => {
  return (
    <Pressable style={({pressed})=>[styles.press , pressed && styles.pressed]} onPress={onSelect.bind(this , place.id)}>
      <Image style={styles.img} source={{uri:place.imageUri}} />
      <View style={styles.contentView} >
      <Text style={styles.text}>{place.title}</Text>
      <Text style={styles.address} >{place.address}</Text>
      </View>
    </Pressable>
  )
}

export default PlaceItem

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:200,
        borderRadius:7
    },
    press:{
        padding:10,
        margin:10,
        backgroundColor:GlobalColors.borderColor,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:7,
        gap:7,
        borderColor:GlobalColors.primaryColor
      
    },
    pressed:{
      opacity:0.5
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color: GlobalColors.primaryColor
    },
    address:{
        fontSize:18,
        color: GlobalColors.primaryColor
    },
    contentView:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
      gap:7
    }
    
})