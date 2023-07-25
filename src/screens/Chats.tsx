import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import GlobalContext from "../../context/Context";
import { auth, db } from "../../config/firebase";
import ContactsFloatingIcon from "../../components/ContactsFloatingIcon";
import ListItem from "../../components/ListItem";
import useContacts from "../../hooks/useHook";
export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext<any>(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser?.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p:any) => p.email !== currentUser?.email),
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
      {rooms?.map((room:any) => (
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
}