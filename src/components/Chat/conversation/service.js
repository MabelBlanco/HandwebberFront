import client from "../../../api/client";

const chatURL = "/api/chat";
const conversationURL = "/api/chat/conversation";

export const getConversation = async (advertisementId, users) => {
  const body = { advertisement: advertisementId, users };
  const response = await client.get(conversationURL, body);
  return response;
};
