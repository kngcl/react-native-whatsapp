import React from "react";
import { Image } from "react-native";

export default function Avatar({ size, user }:any) {
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../assets/user-icon.png")
      }
      resizeMode="cover"
    />
  );
}