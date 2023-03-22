import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { socket } from "../../..";
import { useIsLoggedSelector } from "../../../store/authSlice";
import { getAdvertisementDetail } from "../../advertisements/service";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";

import "./conversations.scss";
// import { createConversation, getConversation } from "./service";

export function Conversation({ advertisement, userToId, userToComplete }) {
  const { user } = useIsLoggedSelector();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [advert, setAdvert] = useState("");

  const navigate = useNavigate();

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

  function closeConversation() {
    const to = `/chat`;
    navigate(to);
  }

  useEffect(() => {
    // Declarate Functions
    const getAdvert = async (idAdvert) => {
      const advertFromApi = await getAdvertisementDetail(idAdvert);
      setAdvert(advertFromApi.result);
    };
    const askConversation = () => {
      socket.emit("ask_conversation", {
        advertisement,
        users: [userToId, user._id],
      });
    };

    const conversationReceived = (data) => {
      setMessages(data.messages);
      setConversationId(data._id);
    };

    // Execute functions
    askConversation();
    getAdvert(advertisement);
    socket.on("send_conversation", conversationReceived);

    // Delete suscriptions socket.io events
    return () => {
      socket.off("send_conversation", conversationReceived);
    };
  }, [advertisement, user._id, userToId]);

  useEffect(() => {
    const newMessageSendFunction = (data) => {
      if (data.conversationId === conversationId) {
        const newMessage = data.message;
        setMessages([...messages, newMessage]);
      }
    };
    socket.on("new_message_send", newMessageSendFunction);

    return () => {
      socket.off("new_message_send", newMessageSendFunction);
    };
  }, [messages]);
  return (
    <div className=" row chatContainer">
      <div className="col-lg-4 chatNav">
        <h2>{advert.name}</h2>
        <Button onClick={closeConversation}>X</Button>
      </div>
      <div className="col-lg-8 chatConversation">
        <div className="chatConversation-list">
          {messages.map((message) => {
            return (
              <div key={message._id} className="chatConversation-item">
                {user._id === message.from ? (
                  <p className="conversation-username">
                    {user.username} userfrom
                  </p>
                ) : (
                  <p className="conversation-username">
                    {userToComplete.username} userfrom
                  </p>
                )}
                <p className="conversation-body" key={message.body}>
                  {message.body}
                </p>
              </div>
            );
          })}
        </div>
        <div className="textAndSendButton">
          <form onSubmit={handleSubmit} className="form-chat">
            <Input
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              inputGroup
              className="textMessage"
            >
              <Button className="btn-message" type="submit">
                Send
              </Button>
            </Input>
          </form>
        </div>
      </div>
    </div>
  );
}
