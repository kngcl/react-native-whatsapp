import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import Context from "../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Profile() {
  const [displayName, setDisplayName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingTop: Constants.statusBarHeight + 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>Profile</Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Hi bro please enter your image and displayName
        </Text>
        <TouchableOpacity>
          {!selectedImage ? <MaterialCommunityIcons /> : /*  <Image /> */ "f"}
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
