import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { GlobalColors } from "@/app/constants/Colors";
import ImagePickers from '@/app/components/PlacesList/ImagePicker'
import LocationPicker from "@/app/components/PlacesList/LocationPicker";
import {Place} from "../../models/place";

const PlaceForm = ({onCreatePlace}) => {

    const [form, setForm] = useState({
        title:'',
        image:'',
        location:null
    })

   

    // console.log(form);

    function handleImg(img){
     return setForm({...form, image:img})   
    }

    const handleLocation = useCallback((location)=>{
      console.log("getting location",location);
      return setForm({...form, location:location})
        
    },[]);

    function shareForm(){
      console.log("form title",form.title);
      console.log("form image",form.image);
      console.log("form location",form.location);
      const finalPlace = new Place( form.title, form.image, form.location);
      onCreatePlace(finalPlace);
    }

  return (
    <ScrollView style={styles.form} showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <Text style={styles.title}>Place Title</Text>
        <TextInput style={styles.input} onChangeText={(text)=> setForm({...form , title:text}) } value={form.title} />
      </View>
     
     <ImagePickers handleImg={handleImg} />
      <LocationPicker handleLocation={handleLocation} />
    <Pressable style={({pressed})=>[styles.press,pressed && styles.pressed]} onPress={shareForm} >
      <Text style={styles.btnTxt}>Add Place</Text>
    </Pressable>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex:1,

  },
  container: {
    width: "100%",
    padding: 10,
    gap:7
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
  press:{
      width:'97%',
      padding:10,
      alignSelf:'center',
      backgroundColor:GlobalColors.primaryColor,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:7,
      marginVertical:10
  },
  pressed:{
    opacity:0.5
  },
  btnTxt:{
      color:GlobalColors.secondaryColor,
      fontSize:18
  }
});
