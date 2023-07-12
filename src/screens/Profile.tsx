import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import GlobalContext from "../../context/Context";
import Context from "../../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../../utils";
import { auth, db } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [displayName, setDisplayName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [permission, setPermission] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    async () => {
      const status = await askForPermission();
      setPermission(status);
      permissions();
    };
  }, []);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    console.log(displayName)
    const user = auth.currentUser! ;
    let photoURL;
    console.log(user);
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user?.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user?.email,
    };
    console.log(userData)
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    console.log({ ...userData, uid: user?.uid })
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user?.uid }),
    ]);
        navigation.navigate("home");
  }

  async function handleImagePicker() {
    const result = await pickImage();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  }

  function permissions() {
    if (!permission) {
      return <Text>Loading...</Text>;
    }

    if (permission != "granted") {
      return <Text>You need to give access</Text>;
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
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>Profile</Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Hi bro please enter your image and displayName
        </Text>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            marginTop: 30,
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
