import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import ListItem from "../../components/ListItem";
import GlobalContext from "../../context/Context";
import { db } from "../../config/firebase";
import useContacts from "../../hooks/useHook";

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute<any>();
  const image = route.params && route.params.image || "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg";

  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_:any, i:any) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
}

function ContactPreview({ contact, image }: any) {
  const { unfilteredRooms, rooms } = useContext<any>(GlobalContext);
  const [user, setUser] = useState<any>(contact);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("contactName", "==", contact.contactName)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser: any) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room: any) =>
        room.participantsArray.includes(contact.contactName)
      )}
    />
  );
}
