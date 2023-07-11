<<<<<<< HEAD
import { LogBox, Text } from "react-native";
import { useAssets } from "expo-asset";
import React, { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screen/SignIn";
import ContextWrapper from "./context/ContextWrapper";
import Profile from "./screen/Profile";
=======
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
>>>>>>> c7b7989 (setup email and password)

LogBox.ignoreLogs([
  "setting a timer",
  "AsyncStorage has been extracted  from react-native core and will be removed in feature release",
]);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });
<<<<<<< HEAD
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
            options={{ title: "whatsapp" }}
            component={Home}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function Home() {
  return <Text>Hi i have a profile</Text>;
}

function Main() {
=======
    return unsubscribe();
  }, []);

  if (loading) {
    return<Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(currentUser)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

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
  const [assets] = useAssets([
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  ]);
<<<<<<< HEAD

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
=======
  if (!assets) {
    return <Text>Loading...</Text>;
  }
  return <App />;
}

export default main();
>>>>>>> c7b7989 (setup email and password)
