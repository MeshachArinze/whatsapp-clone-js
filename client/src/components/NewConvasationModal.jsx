import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <header >Create Conversation</header>
      <section>
        <form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <div controlId={contact.id} key={contact.id}>
              <input
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </div>
          ))}
          <Button type="submit">Create</Button>
        </form>
      </section>
    </>
  );
}
