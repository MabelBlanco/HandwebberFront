import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserById } from "../../auth/service";
import { Conversation } from "../conversation/conversation";

export function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userToName, setUserToName] = useState("");

  const advertisement = searchParams.get("ad_id");
  const userTo = searchParams.get("user_id");

  useEffect(() => {
    try {
      const userName = getUserById(userTo);
      setUserToName(userName);
    } catch (error) {
      console.log(error);
    }
  }, [userTo]);

  if (advertisement && userTo) {
    return (
      <Conversation
        advertisement={advertisement}
        userToId={userTo}
        userToName={userToName}
      ></Conversation>
    );
  } else {
    <div>Aquí irían todas las conversaciones</div>;
  }
}
