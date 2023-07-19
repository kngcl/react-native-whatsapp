import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../../components/ListItem";
import useContacts from "../../hooks/useHook";
import GlobalContext from "../../context/Context";
import { auth, db } from "../../config/firebase";
import { Firestore, collection, onSnapshot, query, where } from "firebase/firestore";
import ContactsFloatingIcon from "../../components/ContactsFloatingIcon";

const Chat = () => {
  const navigation = useNavigation<any>();
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext<any>(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc:any) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc:any) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user:any, contacts:any) {
    const userContact = contacts.find((c:any) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {rooms.map((room:any) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcon />
    </View>
  );

  /* return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatContainer}>
            <Image source={item.photos} style={styles.image} />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <View style={styles.messages}>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.totalUnread > 0 && (
                  <View style={styles.unreadContainer}>
                    <Text style={styles.totalUnread}>{item.totalUnread}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate("contacts")}
      >
        <MaterialCommunityIcons
          name="android-messages"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  ); */
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  chatContainer: {
    flexDirection: "row",
    marginRight: 16,
    marginLeft: 16,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "#128C7E",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  chatContent: {
    flex: 5,
    borderBottomWidth: 0,
    marginLeft: 16,
    paddingBottom: 16,
    marginBottom: 13,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: 12,
    color: "#A0A09E",
  },
  messages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatMessage: {
    fontSize: 14,
    color: "#A0A09E",
    width: "90%",
  },
  unreadContainer: {
    height: 20,
    width: 25,
    borderRadius: 20,
    backgroundColor: "#25D366",
    alignContent: "center",
    justifyContent: "center",
  },
  totalUnread: {
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
  chatButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0e806a",
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});