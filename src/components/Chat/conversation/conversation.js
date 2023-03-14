import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../..";
import { getAdById } from "../../../store/adsListSlice";
import { useIsLoggedSelector } from "../../../store/authSlice";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";

import "./conversation.css";
// import { createConversation, getConversation } from "./service";

export function Conversation({ advertisement, userToId, userToName }) {
  const { user } = useIsLoggedSelector();
  const advert = useSelector(getAdById(advertisement));

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const date = Date.now();
    socket.emit("new_message", {
      from: user._id,
      date,
      body: message,
      read: false,
    });
  }

  useEffect(() => {
    const askConversation = async () => {
      socket.emit("ask_conversation", {
        advertisement,
        users: [userToId, user._id],
      });
    };
    // try {
    //   const response = await getConversation(advertisement, [
    //     userToId,
    //     user._id,
    //   ]);
    //   console.log(response);
    //   setMessages(response.messages);
    // } catch (error) {
    //   if (error.message === "This conversation do not exist") {
    //     const newConversation = await createConversation(advertisement, [
    //       userToId,
    //       user._id,
    //     ]);
    //     setConversationId(newConversation._id);
    //     return;
    //   } else {
    //     console.log(error);
    //   }
    // }
    // };

    askConversation();
  }, [advertisement, user._id, userToId]);

  useEffect(() => {
    const newMessageSendFunction = (data) => {
      const newMessage = data;
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
              <p>{user._id === message.from ? user.username : userToName}:</p>
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
