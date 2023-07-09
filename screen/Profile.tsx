import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import Context from "../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage } from "../utils";

export default function Profile() {
  const [displayName, setDisplayName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {}

  async function handleImagePicker() {
    const result = await pickImage();

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  }

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
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            marginTop: 20,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Enter your Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <View style={{ marginTop: "auto", width: 80 }}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </React.Fragment>
  );
}
