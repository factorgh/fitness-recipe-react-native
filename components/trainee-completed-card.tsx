import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function TraineeCompletedCard() {
  return (
    <View className='border border-slate-500 rounded-md p-3 flex flex flex-row bg-slate-50 justify-between items-center mt-3'>
     <MaterialCommunityIcons name="food-variant" size={24} color="gray" />
     <Text style={{fontFamily:"Nunito_400Regular"}}>Vegetable Salads</Text>
     <FontAwesome name="check-circle-o" size={24} color="red" />
    </View>
  )

}

const styles = StyleSheet.create({})