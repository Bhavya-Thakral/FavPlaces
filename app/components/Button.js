import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalColors } from '../constants/Colors'

const Button = ({onPress , children}) => {
  return (
   <Pressable onPress={onPress} style={ ({pressed})=> [styles.button , pressed && {opacity:0.5}]}>
    <Text style={styles.btnTxt}>{children}</Text>
   </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        borderWidth:1,
        borderColor: GlobalColors.primaryColor,
        padding:10,
        borderRadius:7,
        flex:1
    },
    btnTxt:{
        color:GlobalColors.primaryColor,
        fontSize:18,
        alignSelf:'center'
    }

})