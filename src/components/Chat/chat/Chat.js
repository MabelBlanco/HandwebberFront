import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIsLoggedSelector } from "../../../store/authSlice";
import { getAdvertisementDetail } from "../../advertisements/service";
import { getUserById } from "../../auth/service";
import { Conversation } from "../conversation/conversation";
import { getConversations } from "../conversation/service";

export function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userToName, setUserToName] = useState("");
  const { user } = useIsLoggedSelector();

  const [conversations, setConversations] = useState([]);

  const advertisement = searchParams.get("ad_id");
  const userTo = searchParams.get("user_id");

  useEffect(() => {
    // declarate functions
    const addNamesById = async (conversationsArray) => {
      const newConversations = [...conversationsArray];
      const conversationsMap = await Promise.all(
        newConversations.map(async (conver) => {
          const advertisementConversation = await getAdvertisementDetail(
            conver.advertisement
          );
          const advertisementNameConversation =
            advertisementConversation.result.name;

          const userNameTo = conver.users.filter((data) => data !== user._id);
          const userConversation = await getUserById(userNameTo[0]);
          const userNameConversation = userConversation.result.username;

          conver.advertisementName = advertisementNameConversation;
          conver.userToName = userNameConversation;

          console.log(conver);
          return conver;
        })
      );
      console.log(conversationsMap);
      setConversations(conversationsMap);
    };

    const getUserNameTo = async (user) => {
      const userName = await getUserById(user);
      setUserToName(userName);
    };

    const getConversationsByUserId = async (userId) => {
      const convers = await getConversations(userId);
      await addNamesById(convers);
    };
    // Use functions
    if (userTo) {
      try {
        getUserNameTo(userTo);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        getConversationsByUserId(user._id);
      } catch (error) {
        if (error.message === "This user do not have conversations") {
          console.log(error);
          return;
        } else {
          console.log(error);
        }
      }
    }
  }, [userTo, user._id]);

  return (
    <>
      {advertisement && userTo ? (
        <Conversation
          advertisement={advertisement}
          userToId={userTo}
          userToName={userToName}
        ></Conversation>
      ) : (
        <div>
          {conversations.length ? (
            <ul>
              {conversations.map((conversation) => {
                return (
                  <div key={conversation._id}>
                    <p key={conversation.advertisementName}>
                      {conversation.advertisementName}
                    </p>
                    <p key={conversation.userToName}>
                      {conversation.userToName}
                    </p>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>
              Aún no tienes conversaciones. ¡Empieza una y disfruta de nuestro
              chat!
            </p>
          )}
        </div>
      )}
    </>
  );
}
