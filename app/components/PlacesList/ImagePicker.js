import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from "@/app/components/Button";
import { GlobalColors } from '@/app/constants/Colors';
import { launchCameraAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';

const ImagePickers = ({handleImg}) => {

    const [imageUri,setImageUri]=useState('');
    const[cameraPermissionInformation,requestPermission]= ImagePicker.useCameraPermissions();
  

    async function verifyPermission(){
        if(cameraPermissionInformation.status === ImagePicker.PermissionStatus.UNDETERMINED ){
            const permissionResponse= await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED){
            Alert.alert('Permission Denied','You need to grant camera permission to use this feature')
            return false;
        }
        return true;
    }


    async function handleImageCapture(){

        const hasPermission = verifyPermission();

        if(!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
        if(!image.canceled){
            setImageUri(image.assets[0].uri);
            handleImg(image.assets[0].uri);
        }else {
            Alert.alert('No Image Captured');
        }
    }


    async function handleImagePicker(){
        const hasPermission = verifyPermission();

        if(!hasPermission) return;
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
        if(!image.canceled){
            setImageUri(image.assets[0].uri);
            handleImg(imageUri);

        }else {
            Alert.alert('No Image Selected');
        }
    }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Place Image</Text>
    {imageUri ? <Image source={{uri:imageUri}} style={styles.img} /> : 
    null}

    <View style={styles.btnCont} >
    <Button onPress={handleImageCapture} >Capture Image</Button>
    <Button onPress={handleImagePicker} >Pick Image</Button>
    </View>

  </View>
  )
}

export default ImagePickers

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        gap:8
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.primaryColor
      },
      input: {
        borderWidth: 1,
        borderColor: GlobalColors.primaryColor,
        padding: 10,
        borderRadius:7
      },
      img:{
        width:'100%',
        aspectRatio:1/1,
        borderRadius:7
      },
      btnCont:{
        flexDirection:'row',
        gap:10
      }
})