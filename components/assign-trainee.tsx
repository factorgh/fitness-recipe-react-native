import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { router } from "expo-router";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";

export default function AssignedTrainee({ trainee }: { trainee: any }) {
  let remoteCldImage;
  if (trainee?.img_url) {
    remoteCldImage = cld
      .image(trainee.img_url)
      .resize(thumbnail().width(100).height(100));
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/trainee-detail",
          params: { traineeDetail: JSON.stringify(trainee) },
        })
      }
    >
      <View style={styles.row}>
        {/* Avatar */}
        {trainee?.img_url ? (
          <AdvancedImage
            className="w-12 h-12 rounded-full"
            cldImg={remoteCldImage!}
          />
        ) : (
          <Avatar
            rounded
            size="medium"
            source={require("@/assets/images/blank-profile.png")} // Example avatar image
            containerStyle={styles.avatar}
          />
        )}

        {/* Trainee detail */}
        <View style={styles.details}>
          <Text style={styles.name}>{trainee.name}</Text>
          <Text style={styles.plan}>{trainee.email}</Text>
        </View>
      </View>

      {/* Update assigned date */}
      <Text style={styles.date}>Today</Text>

      {/* Divider */}
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,

    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#E5ECF9",
  },
  details: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plan: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 14,
    color: "#888",
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ddd",
  },
});
