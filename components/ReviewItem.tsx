import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function ReviewItem() {
  return (
    <View
      style={{ width: "100%" }}
      className="p-3 mb-3.5 bg-slate-300 rounded-md h-24  flex flex-row  "
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 30 }}
        source={require("@/assets/images/profile.webp")}
      />
      {/* text section */}
      <View>
        <Text className="mt-2 mx-3" style={{ fontFamily: "Nunito_400Regular" }}>
          Rachael Lee
        </Text>
        <Text className="p-2 mx-3">
          Lorem ipsum dolor sit amet consectetur/n adipisicing elit.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
