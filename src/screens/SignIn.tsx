import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import { auth, signIn, signUp } from "../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

    declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    recaptchaVerifier: any,
    confirmationResult :any;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
   const [phone, setPhone] = useState('+91');
    const [otp, setOtp] = useState('');

  let [mode, setMode] = useState<string>("signUp");
  const {
    theme: { colors },
  } = useContext(Context);


  const generateRecaptcha = () => {
    window.recaptchaVerifier  = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response :any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  const handlePress = (event :any) => {
    event.preventDefault();
/*     setHasFilled(true); */
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }

/*   const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  } */


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
              ? "Already have an account? SignIn"
              : "Don't have an account ? SignUp"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
