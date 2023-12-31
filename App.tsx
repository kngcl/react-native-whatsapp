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
import Header from "./src/Header";
import Navigation from "./src/Navigation";
import Contacts from "./src/screens/Contacts";
import ChatHeader from "./components/ChatHeader";
import Chat from "./src/screens/Chat";

LogBox.ignoreLogs([
  "setting a timer",
  "AsyncStorage has been extracted  from react-native core and will be removed in feature release"
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
      {!currentUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currentUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Select Contacts" }}
            component={Contacts}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerTitle: (props:any) => <ChatHeader {...props} /> }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e806a",
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
