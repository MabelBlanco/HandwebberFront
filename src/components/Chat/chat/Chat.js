import { useSearchParams } from "react-router-dom";
import { Conversation } from "../conversation/conversation";

export function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();

  const advertisement = searchParams.get("ad_id");
  const userTo = searchParams.get("user_id");

  if (advertisement && userTo) {
    return (
      <Conversation
        advertisement={advertisement}
        userTo={userTo}
      ></Conversation>
    );
  } else {
    <div>Aquí irían todas las conversaciones</div>;
  }
}
