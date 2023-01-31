import React, { useState, useCallback } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }

  return (
    <div className=" flex flex-col flex-grow">
      <div className=" flex-grow overflow-auto">
        <div className=" flex flex-col align-items-start justify-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 flex flex-col ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-tomato text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-sm font-normal ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
