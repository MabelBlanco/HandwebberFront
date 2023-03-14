import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../..";
import { getAdById, loadOneAdByIdAction } from "../../../store/adsListSlice";
import { useIsLoggedSelector } from "../../../store/authSlice";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";

import "./conversation.css";
// import { createConversation, getConversation } from "./service";

export function Conversation({ advertisement, userToId, userToName }) {
  const dispatch = useDispatch();
  const { user } = useIsLoggedSelector();
  const advert = useSelector(getAdById(advertisement));
  if (!advert) {
    dispatch(loadOneAdByIdAction(advertisement));
  }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const date = Date.now();
    socket.emit("new_message", {
      conversationId,
      message: {
        from: user._id,
        date,
        body: message,
      },
    });

    setMessage("");
  }

  useEffect(() => {
    // Declarate Functions
    const askConversation = () => {
      socket.emit("ask_conversation", {
        advertisement,
        users: [userToId, user._id],
      });
    };

    const conversationReceived = (data) => {
      console.log("Conversación recibida: ", data);
      setMessages(data.messages);
      setConversationId(data._id);
    };

    // Execute functions
    askConversation();
    socket.on("send_conversation", conversationReceived);

    // Delete suscriptions socket.io events
    return () => {
      socket.off("send_conversation", conversationReceived);
    };
  }, [advertisement, user._id, userToId]);

  useEffect(() => {
    const newMessageSendFunction = (data) => {
      const newMessage = data.message;
      setMessages([...messages, newMessage]);
    };
    socket.on("new_message_send", newMessageSendFunction);

    return () => {
      socket.off("new_message_send", newMessageSendFunction);
    };
  }, [messages]);
  return (
    <div className="chatContainer">
      <div className="chatNav">
        <h2>{advert.name}</h2>
        <Button>X</Button>
      </div>
      <div className="chatConversation">
        {messages.map((message) => {
          return (
            <div>
              <p key={message.date}>
                {user._id === message.from ? user.username : userToName}:
              </p>
              <p key={message.body}>{message.body}</p>
            </div>
          );
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
