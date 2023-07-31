import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data }: any = await Contacts.getContactsAsync({


          fields: [Contacts.Fields.FirstName],
        });        
        if (data.length >= 0) {
          setContacts(
            data
              .filter(
                (c: any) =>

                  c.firstName && c.lastName

              )
              .map(mapContactToUser)
          );
        }
      }
    })();
  }, []);
  return contacts;
}
function mapContactToUser(contact: any) {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,

  };
}

