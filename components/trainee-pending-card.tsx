import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function TraineePendingCard() {
  return (
    <TouchableOpacity onPress={()=> console.log("selected pnding user")}>
    <View className='border border-slate-500 rounded-md p-3 flex flex flex-row bg-slate-50 justify-between items-center  mt-3'>
     <MaterialCommunityIcons name="food-variant" size={24} color="gray" />
     <Text style={{fontFamily:"Nunito_400Regular"}}>Vegetable Salads</Text>
     <FontAwesome name="spinner" size={24} color="black" />
    </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({})