import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
import Context from "./context/Context";

import { useAssets } from "expo-asset";
import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/screens/SignIn";

import ContextWrapper from "./context/ContextWrapper";
import Profile from "./src/screens/Profile";
import Header from './src/Header';
import Navigation from './src/Navigation';

LogBox.ignoreLogs([
  "setting a timer",
  "AsyncStorage has been extracted  from react-native core and will be removed in feature release",
]);

const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor='#0e806a' style='light'/>
        <Header/>
        
        <View style={{ flex:1, backgroundColor:'white'}}>
          <Navigation/>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function Home() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Navigation />
      </View>
    </View>
  );
}

function Main() {
  const [assets] = useAssets([
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  ]);

  if (!assets) {
    return <Text>Loading...</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}
export default Main;