import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function TraineeCompletedDetailScreen() {
    const [expanded, setExpanded] = useState(false);

    const handleExpanded = () => {
        setExpanded((prevState) => !prevState);
      };
    const expandedStyle = `  bg-slate-300 border border-slate-300 mt-5  p-5  mx-3 rounded-md h-[250px]  `;
    const closedStyle = `   bg-slate-300 h-16 rounded-md p-2 flex-row items-center justify-center  mx-5 mt-5 `;
  return (

    <SafeAreaView>
       <LinearGradient className='h-screen' colors={["#E5ECF9", "#F6F7F9"]}>
      <View className='mt-16 flex-row pl-5 items-center ' >
      <AntDesign onPress={()=> router.back()} name="left" size={24} color="black" />
      <Text className='ml-10 text-xl text-slate-800' style={{fontFamily:"Nunito_700Bold"}}>Poached Eggs Meal Plan</Text>
      </View>
      {/* Divider */}
      <View className="border border-slate-200  bg-slate-400 flex w-full  mt-8 "></View>
      
    {/* Meal content */}
    <View className='bg-slate-300 h-16 rounded-md p-2 flex-row items-center justify-center mx-5 mt-5 '>
        <Text className='mr-3 text-md' style={{fontFamily:"Nunito_400Regular"}} >10:30 AM  </Text>
        <Text>|</Text>
        <Text  className='ml-3 text-md'  style={{fontFamily:"Nunito_400Regular"}} > Today</Text>
    </View>
    {/* Drop Down for Ingredients */}
    <View className={expanded ? expandedStyle : closedStyle}>
      <TouchableOpacity className='flex-row items-center justify-between' onPress={handleExpanded}>
    
          <Text
            style={{ fontFamily: "Nunito_400Regular " }}
            className="text-md mr-32 "
          >
            Ingredients
          </Text>
          {expanded ? (
            <AntDesign name="down" size={15} color="black" />
          ) : (
            <AntDesign name="down" size={15} color="black" />
          )}
        
      </TouchableOpacity>
      {/* Expanded Section */}
      {expanded && (
        <View>
          <View className="border border-slate-800 rounded-md h-[0px] mt-3 mb-3"></View>
          <View>
            <Text className="mb-3">Trainees</Text>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row">
             
              </View>
              <Text>and 22 others</Text>
            </View>
            {/* Buttons for meal plan */}
          </View>
        </View>
      )}
      {/* End of expanded section */}
    </View>
    {/* End of dropdown for ingredients */}
    {/* Dropdown for procedures */}
    <View className={expanded ? expandedStyle : closedStyle}>
      <TouchableOpacity className='flex-row items-center justify-between' onPress={handleExpanded}>
    
          <Text
            style={{ fontFamily: "Nunito_400Regular " }}
            className="text-md mr-32 "
          >
            Procedures
          </Text>
          {expanded ? (
            <AntDesign name="down" size={15} color="black" />
          ) : (
            <AntDesign name="down" size={15} color="black" />
          )}
        
      </TouchableOpacity>
      {/* Expanded Section */}
      {expanded && (
        <View>
          <View className="border border-slate-800 rounded-md h-[0px] mt-3 mb-3"></View>
          <View>
            <Text className="mb-3">Trainees</Text>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row">
             
              </View>
              <Text>and 22 others</Text>
            </View>
            {/* Buttons for meal plan */}
          </View>
        </View>
      )}
      {/* End of expanded section */}
    </View>
      </LinearGradient>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({})