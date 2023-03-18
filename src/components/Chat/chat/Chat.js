import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../..";
import { useIsLoggedSelector } from "../../../store/authSlice";
import { getAdvertisementDetail } from "../../advertisements/service";
import { getUserById } from "../../auth/service";
import NoImage from "../../commons/noImage/NoImage";
import { Conversation } from "../conversation/conversation";
import { getConversations } from "../conversation/service";

import "./chat.css";

export function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLogged } = useIsLoggedSelector();
  const navigate = useNavigate();

  const [userToComplete, setUserToComplete] = useState("");
  const [conversations, setConversations] = useState([]);

  const advertisement = searchParams.get("ad_id");
  const userTo = searchParams.get("user_id");

  useEffect(() => {
    // declarate functions
    const addNamesById = async (conversationsArray) => {
      const newConversations = [...conversationsArray];
      const conversationsMap = await Promise.all(
        newConversations.map(async (conver) => {
          if (!conver.advertisement || !conver.users[0] || !conver.users[1]) {
            socket.emit("corrupt_conversation", conver._id);
            return;
          }
          const advertisementConversation = await getAdvertisementDetail(
            conver.advertisement
          );
          const advertisementNameConversation =
            advertisementConversation.result.name;
          const advertisementImageConversation =
            advertisementConversation.result.image;

          const userNameTo = conver.users.filter((data) => data !== user._id);
          const userConversation = await getUserById(userNameTo[0]);
          const userNameConversation = userConversation.result.username;

          conver.advertisementName = advertisementNameConversation;
          conver.advertisementImage = advertisementImageConversation;
          conver.userToId = userNameTo[0];
          conver.userToName = userNameConversation;

          return conver;
        })
      );
      setConversations(conversationsMap);
    };

    const getUserTo = async (user) => {
      const userToComplete = await getUserById(user);
      setUserToComplete(userToComplete.result);
    };

    const getConversationsByUserId = async (userId) => {
      const convers = await getConversations(userId);
      await addNamesById(convers);
    };
    // Use functions
    if (!isLogged) {
      navigate(`/`);
    } else if (userTo) {
      try {
        getUserTo(userTo);
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
  }, [userTo, user._id, isLogged, navigate]);

  useEffect(() => {
    const addNameById = async (conver) => {
      if (!conver.advertisement || !conver.users[0] || !conver.users[1]) {
        socket.emit("corrupt_conversation", conver._id);
        return;
      }
      const advertisementConversation = await getAdvertisementDetail(
        conver.advertisement
      );
      const advertisementNameConversation =
        advertisementConversation.result.name;
      const advertisementImageConversation =
        advertisementConversation.result.image;

      const userNameTo = conver.users.filter((data) => data !== user._id);
      const userConversation = await getUserById(userNameTo[0]);
      const userNameConversation = userConversation.result.username;

      conver.advertisementName = advertisementNameConversation;
      conver.advertisementImage = advertisementImageConversation;
      conver.userToId = userNameTo[0];
      conver.userToName = userNameConversation;

      return conver;
    };
    const addConversation = async (conversation) => {
      const conversationWithNames = await addNameById(conversation);
      const newConversations = [...conversations, conversationWithNames];
      setConversations(newConversations);
    };
    socket.on("new_conversation_created", addConversation);

    // Delete suscriptions socket.io events
    return () => {
      socket.off("new_conversation_created", addConversation);
    };
  });

  return (
    <>
      {advertisement && userTo ? (
        <Conversation
          advertisement={advertisement}
          userToId={userTo}
          userToComplete={userToComplete}
        ></Conversation>
      ) : (
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-3 chat">
              <div className="card mb-sm-3 mb-md-0 conversations_card">
                <div className="card-body conversations_body">
                  {conversations.length ? (
                    <ul className="conversations">
                      {conversations.map((conversation) => {
                        return (
                          <li key={conversation._id}>
                            <Link
                              to={`/chat?ad_id=${conversation.advertisement}&user_id=${conversation.userToId}`}
                              className="d-flex bd-highlight"
                            >
                              <div className="img_cont">
                                {conversation.advertisementImage ? (
                                  <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}/${conversation.advertisementImage}`}
                                    className="rounded-circle advert_img"
                                    alt={conversation.advertisementName}
                                  />
                                ) : (
                                  <NoImage className="rounded-circle advert_img" />
                                )}
                              </div>
                              <div className="conver_info">
                                <span key={conversation.advertisementName}>
                                  {conversation.advertisementName}
                                </span>
                                <p key={conversation.userToName}>
                                  {conversation.userToName}
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>
                      Aún no tienes conversaciones. ¡Empieza una y disfruta de
                      nuestro chat!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
