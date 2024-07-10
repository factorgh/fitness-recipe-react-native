import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Avatar } from "@rneui/base";
export default function FrequentlyAskedQuestions({ title }: any) {
  const [expanded, setExpanded] = useState(false);
  const list2 = [];
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {list2.map((l, i) => (
        <ListItem key={i} onPress={() => console.log("ok")} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({});
