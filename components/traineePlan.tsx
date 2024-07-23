import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { cld } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { truncateText } from "@/utils/fomatters";

// Define TypeScript types
interface TraineePlanItemProps {
  item: any;
}

export default function TraineePlanItem({ item }: TraineePlanItemProps) {
  // Date and time formatting
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "hh:mm:ss a"); // 'hh:mm:ss a' formats to 12-hour time with AM/PM
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "MM/dd/yy"); // 'MM/dd/yy' formats to '12/07/24'
  };

  const thumbNailImage = cld.image(item.recipe.thumbNail);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(routes)/trainee-plan-detail",
          params: { item: JSON.stringify(item.recipe) },
        })
      }
      style={styles.container}
    >
      <AdvancedImage style={styles.image} cldImg={thumbNailImage} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.recipeName}>{item.recipe.name}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {truncateText(item.recipe.description, 30)}
          </Text>
        </View>
        <View style={styles.timeDateContainer}>
          <View style={styles.timeContainer}>
            <Entypo name="back-in-time" size={15} color="black" />
            <Text style={styles.timeText}>{formatTime(item.time_picked)}</Text>
          </View>
          <View style={styles.dateContainer}>
            <FontAwesome name="calendar-times-o" size={15} color="black" />
            <Text style={styles.dateText}>{formatDate(item.date_picked)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginHorizontal: 8,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    marginBottom: 5,
  },
  recipeName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#333",
  },
  description: {
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: "Nunito_400Regular",
    color: "#666",
    fontSize: 14,
  },
  timeDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeText: {
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
});
