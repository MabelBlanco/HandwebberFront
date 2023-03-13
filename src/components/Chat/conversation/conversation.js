import { useEffect, useState } from "react";
import { socket } from "../../..";
import { useIsLoggedSelector } from "../../../store/authSlice";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";

import "./conversation.css";
import { getConversation } from "./service";

export function Conversation({ advertisement, userTo }) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const { user } = useIsLoggedSelector();

  const askConversation = async () => {
    try {
      const response = await getConversation(advertisement, [userTo, user._id]);
      console.log(response);
    } catch (error) {
      if (error.message === "This conversation do not exist") {
        console.log("creo una nueva conversacion");
        return;
      }
      console.log(error);
    }
  };

  console.log(advertisement);
  console.log(userTo);

  function handleSubmit(event) {
    event.preventDefault();
    const date = Date.now();
    socket.emit("new_message", { date, body: message });
  }

  useEffect(() => {
    askConversation();

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
