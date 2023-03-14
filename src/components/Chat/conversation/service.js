import client from "../../../api/client";

const chatURL = "/api/chat";
const conversationURL = "/api/chat/conversation";

// export const getConversation = async (advertisementId, users) => {
//   const response = await client.get(
//     `${conversationURL}?advertisement=${advertisementId}&user1=${users[0]}&user2=${users[1]}`
//   );
//   return response;
// };

// export const createConversation = async (advertisementId, users) => {
//   const body = { advertisement: advertisementId, users };
//   const response = await client.post(conversationURL, body);
//   return response;
// };
