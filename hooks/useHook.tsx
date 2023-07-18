import {useEffect, useState} from "react"
import * as Contacts from "expo-contacts"

export default function useContacts() {
    const [contacts, setContacts] = useState<any>([])
    useEffect(() => {
        (async () => {
            const {status} = await Contacts.requestPermissionsAsync()
            if (status === 'granted') {
                const {data} = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails]
                })
                if (data.length > 0) {
                  setContacts(
                    data.filter(
                        c => c.firstName && c.emails && c.emails[0] && c.emails[0].email
                    ).map(mapContactToUser)
                  )  
                }
            }
        })()
    }, [])
    return contacts
}

function mapContactToUser (contact:any) {
    return {
        contactName: contact.firtName && contact.lastName ? 
        `${contact.firstName} ${contact.lastName}`
        : contact.firstName, 
        email: contact.eamils[0].email
    }
}