import { useEffect, useState } from "react";
import { socket } from "../../..";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";

import "./conversation.css";

export function Conversation({ advertisement, userTo }) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  console.log(advertisement);
  console.log(userTo);

  function handleSubmit(event) {
    event.preventDefault();
    const date = Date.now();
    socket.emit("new_message", { date, body: message });
  }

  useEffect(() => {
    const newMessageSendFunction = (data) => {
      const newMessage = data;
      setConversation([...conversation, newMessage]);
    };
    socket.on("new_message_send", newMessageSendFunction);

    return () => {
      socket.off("new_message_send", newMessageSendFunction);
    };
  }, [conversation]);
  return (
    <div className="chatContainer">
      <div className="chatNav">
        <h2>Título del anuncio</h2>
        <Button>X</Button>
      </div>
      <div className="chatConversation">
        {conversation.map((message) => {
          return <p key={message.body}>{message.body}</p>;
        })}
      </div>
      <div className="textAndSendButton">
        <form onSubmit={handleSubmit}>
          <Input
            className="textMessage"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          ></Input>
          <Button className="sendButton" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
