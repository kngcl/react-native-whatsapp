import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import Context from "../../context/Context";
/* import { auth, signIn, signUp } from "../../config/firebase"; */
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, firebaseConfig } from "../../config/confi";
import firebase from "firebase/compat/app";

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [code, setCode] = useState<any>("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);

  let [mode, setMode] = useState<string>("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  const handlePress = () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");

  /*   signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current); */
  };

  const confirmCode = async () => {
    try{
      const credential = PhoneAuthProvider.credential(
        verificationId,
        code
      );
      alert(verificationId)
     
     await signInWithCredential(auth,credential)
        .then(() => {
          setCode("");
        })
    } catch(error:any) {
        // show an alert in case of error
        alert(error);
        console.log(error);
      };
    Alert.alert("Login Successful. Welcome to Dashboard.");
  };

  /*  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  } */

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome To Whatsapp
      </Text>
      <Image
        source={require("../../assets/welcome-img.png")}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="phone Number with country code"
          keyboardType={"phone-pad"}
          value={phoneNumber}
          autoComplete="tel"
          onChangeText={setPhoneNumber}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Button
            /* title={mode === "SignUp" ? "Sign Up" : "Sign In"} */
            title="Send Code"
            color={colors.secondary}
            disabled={!phoneNumber}
            onPress={handlePress}
          />
        </View>
        <TextInput
          placeholder="Password"
          keyboardType="number-pad"
          onChangeText={setCode}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            /* title={mode === "SignUp" ? "Sign Up" : "Sign In"} */
            title="confirm code"
            color={colors.secondary}
            /*         disabled={!phoneNumber} */
            onPress={confirmCode}
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
              ? "Already have an account? SignIn"
              : "Don't have an account ? SignUp"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
