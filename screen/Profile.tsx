<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 778c1d2 (profile style)
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
=======
import { View, Text, TouchableOpacity, Image } from "react-native";
=======
>>>>>>> 778c1d2 (profile style)
import React, { useContext, useState } from "react";
>>>>>>> d02c32b (build profile component)
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> 51a2417 (PROFILE screen done)
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import Context from "../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 51a2417 (PROFILE screen done)
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db } from "../config/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
=======
>>>>>>> d02c32b (build profile component)
=======
import { pickImage } from "../utils";
>>>>>>> 778c1d2 (profile style)
=======
>>>>>>> 51a2417 (PROFILE screen done)

export default function Profile() {
  const [displayName, setDisplayName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 51a2417 (PROFILE screen done)
  const [permission, setPermission] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    async () => {
      const status = await askForPermission();
      setPermission(status);
      permissions();
    };
  }, []);
<<<<<<< HEAD
=======
>>>>>>> d02c32b (build profile component)
=======
>>>>>>> 51a2417 (PROFILE screen done)

  const {
    theme: { colors },
  } = useContext(GlobalContext);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 51a2417 (PROFILE screen done)
  async function handlePress() {
    const user = auth.currentUser;
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
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user?.uid }),
    ]);
        navigation.navigate("home");
  }
<<<<<<< HEAD
=======
  async function handlePress() {}
>>>>>>> 778c1d2 (profile style)
=======
>>>>>>> 51a2417 (PROFILE screen done)

  async function handleImagePicker() {
    const result = await pickImage();

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 51a2417 (PROFILE screen done)
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
<<<<<<< HEAD
    }
  }

=======
>>>>>>> d02c32b (build profile component)
=======
    if (!result.cancelled) {
      setSelectedImage(result);
=======
>>>>>>> 51a2417 (PROFILE screen done)
    }
  }

>>>>>>> 778c1d2 (profile style)
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingTop: Constants.statusBarHeight + 20,
<<<<<<< HEAD
<<<<<<< HEAD
          padding: 20,
=======
>>>>>>> d02c32b (build profile component)
=======
          padding: 20,
>>>>>>> 51a2417 (PROFILE screen done)
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>Profile</Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Hi bro please enter your image and displayName
        </Text>
<<<<<<< HEAD
<<<<<<< HEAD
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            marginTop: 30,
=======
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
<<<<<<< HEAD
            marginTop: 20,
>>>>>>> 778c1d2 (profile style)
=======
            marginTop: 30,
>>>>>>> 51a2417 (PROFILE screen done)
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
<<<<<<< HEAD
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
=======
        <TouchableOpacity>
          {!selectedImage ? <MaterialCommunityIcons /> : /*  <Image /> */ "f"}
        </TouchableOpacity>
>>>>>>> d02c32b (build profile component)
=======
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
>>>>>>> 778c1d2 (profile style)
      </View>
    </React.Fragment>
  );
}
