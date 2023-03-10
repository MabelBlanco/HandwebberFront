import { useState } from "react";
import Button from "../commons/button/Button";
import Input from "../commons/forms/input/Input";

import "./chat.css";

export function Chat() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(message);
  }
  return (
    <div className="chatContainer">
      <div className="chatNav">
        <h2>Título del anuncio</h2>
        <Button>X</Button>
      </div>
      <div className="chatConversation">
        <p>Aquí iría la conversación</p>
      </div>
      <div className="textAndSendButton">
        <form onSubmit={handleSubmit}>
          <Input
            className="textMessage"
            onChange={(event) => setMessage(event.target.value)}
          ></Input>
          <Button className="sendButton" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
