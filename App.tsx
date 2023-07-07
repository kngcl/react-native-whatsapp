<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { LogBox, Text } from "react-native";
import { useAssets } from "expo-asset";
import React, { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
=======
import { LogBox, Text } from "react-native";
import { useAssets } from "expo-asset";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
>>>>>>> 5941063 (build login page)
=======
import React, { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
>>>>>>> d02c32b (build profile component)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screen/SignIn";
import ContextWrapper from "./context/ContextWrapper";
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from "./screen/Profile";
=======
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
=======
import { LogBox, Text } from "react-native";
>>>>>>> 5941063 (build login page)
import { useAssets } from "expo-asset";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
<<<<<<< HEAD
>>>>>>> c7b7989 (setup email and password)
=======
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screen/SignIn";
import ContextWrapper from "./context/ContextWrapper";
>>>>>>> 5941063 (build login page)
=======
>>>>>>> 5941063 (build login page)
=======
import Profile from "./screen/Profile";
>>>>>>> d02c32b (build profile component)

LogBox.ignoreLogs([
  "setting a timer",
  "AsyncStorage has been extracted  from react-native core and will be removed in feature release",
]);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const {
    theme: { colors },
  } = useContext(Context);
=======
function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
>>>>>>> c7b7989 (setup email and password)
=======
const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
>>>>>>> 5941063 (build login page)

=======
const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const {
    theme: { colors },
  } = useContext(Context);

<<<<<<< HEAD
>>>>>>> 5941063 (build login page)
  /*   useEffect(() => {
=======
  useEffect(() => {
>>>>>>> d02c32b (build profile component)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
=======
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
<<<<<<< HEAD
  } */
>>>>>>> 5941063 (build login page)

  return (
    <NavigationContainer>
      {!currentUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
<<<<<<< HEAD
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
            options={{ title: "whatsapp" }}
            component={Home}
          />
        </Stack.Navigator>
=======
        <Text>Hello</Text>
>>>>>>> 5941063 (build login page)
      )}
    </NavigationContainer>
  );
}

<<<<<<< HEAD
function Home() {
  return <Text>Hi i have a profile</Text>;
}

function Main() {
=======
    return unsubscribe();
  }, []);
=======
    return () => unsubscribe();
  }, []); */
>>>>>>> 5941063 (build login page)

  /*   if (!loading) {
    return <Text>Loading...</Text>;
  } */
=======
  }
>>>>>>> d02c32b (build profile component)

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
            options={{ title: "whatsapp" }}
            component={Home}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#012",
  },
});

function main() {
>>>>>>> c7b7989 (setup email and password)
=======
=======
function Home() {
  return <Text>Hi i have a profile</Text>;
}

>>>>>>> d02c32b (build profile component)
function Main() {
>>>>>>> 5941063 (build login page)
=======
function Main() {
>>>>>>> 5941063 (build login page)
  const [assets] = useAssets([
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  ]);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d02c32b (build profile component)

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
<<<<<<< HEAD
=======
  if (!assets) {
    return <Text>Loading...</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}
<<<<<<< HEAD

export default main();
>>>>>>> c7b7989 (setup email and password)
=======
export default Main;
>>>>>>> 5941063 (build login page)
=======
>>>>>>> 5941063 (build login page)
