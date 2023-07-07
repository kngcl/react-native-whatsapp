<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d02c32b (build profile component)
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
<<<<<<< HEAD
=======
import { View, Text, Image, TextInput, Button } from "react-native";
>>>>>>> 5941063 (build login page)
=======
>>>>>>> d02c32b (build profile component)
import React, { useContext, useState } from "react";
import Context from "../context/Context";
import { signIn, signUp } from "../config/firebase";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let [mode, setMode] = useState<string>("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >   
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome To Whatsapp
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "SignUp" ? "Sign Up" : "Sign In"}
            color={colors.secondary}
            disabled={!password || !email}
            onPress={handlePress}
          />
        </View>

        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "SignUp" ? setMode("SignIn") : setMode("SignUp")
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === "SignUp"
              ? "Already have an account"
              : "Don't have an account ? SignUp"}
          </Text>
        </TouchableOpacity>
        {mode === "signUp"}
      </View>
    </View>
  );
}
