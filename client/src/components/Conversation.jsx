import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <select >
      {conversations.map((conversation, index) => (
        <option
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </option>
      ))}
    </select>
  );
}
