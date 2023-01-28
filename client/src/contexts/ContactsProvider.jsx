import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactContext = createContext();

export function useContacts() {
  return useContext(ContactContext);
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contact", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
      <ContactContext.Provider value={{ contacts, createContact }}>{
      children}
    </ContactContext.Provider>
  );
};
