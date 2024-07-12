import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TraineeCompletedDetailScreen() {
    const [expanded, setExpanded] = useState(false);

    const handleExpanded = () => {
        setExpanded((prevState) => !prevState);
      };
    const expandedStyle = `border-x-4 border-red-300 mt-5  p-5  mx-3 rounded-md h-[250px] `;
    const closedStyle = `border border-red-300 p-5 mt-5 mx-3 rounded-md mb-3`;
  return (
    <View>
      <View>
      <AntDesign name="left" size={24} color="black" />
      <Text style={{fontFamily:"Nunito_400Regular"}}>Poached Eggs Meal Plan</Text>
      </View>
      {/* Divider */}
      <View className='bg-slate-500 w-full h-1 mt-5 mb-5'>
    {/* Meal content */}
    <View className='bg-slate-50 h-16 rounded-md p-2'>
        <Text style={{fontFamily:"Nunito_400Regular"}} >10:30 AM | Today</Text>
    </View>
    {/* Drop Down for Ingredients */}
    <View className={expanded ? expandedStyle : closedStyle}>
      <TouchableOpacity onPress={handleExpanded}>
        <View className="flex flex-row gap-[50px]">
          <Text
            style={{ fontFamily: "Nunito_700Bold " }}
            className="text-xl font-mono"
          >
            Poached Eggs
          </Text>
          {expanded ? (
            <AntDesign name="up" size={20} color="black" />
          ) : (
            <AntDesign name="down" size={20} color="black" />
          )}
        </View>
      </TouchableOpacity>
      {/* Expanded Section */}
      {expanded && (
        <View>
          <View className="border border-slate-200 rounded-md h-[0px] mt-3 mb-3"></View>
          <View className="flex flex-row items-center gap-10">
            <FontAwesome name="calendar-times-o" size={24} color="black" />
            <Text>10:30 AM</Text>
          </View>
          <View className="border border-slate-200 rounded-md h-[0px] mt-3 mb-3"></View>
          <View>
            <Text className="mb-3">Trainees</Text>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row">
             
              </View>
              <Text>and 22 others</Text>
            </View>
            {/* Buttons for meal plan */}
            <View className="flex flex-row gap-2 mt-2 justify-end">
              
            </View>
          </View>
        </View>
      )}
      {/* End of expanded section */}
    </View>
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({})