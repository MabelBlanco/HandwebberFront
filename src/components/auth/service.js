import client, { setAuthorizationHeader } from '../../api/client.js';
import storage from '../../utils/storage.js';

const signupURL = '/api/users/signup';
const loginURL = '/api/users/login';
const usersURL = '/api/users';
const tokenTestURL = '/api/users/tokenTest';

export const testToken = async () => {
  const response = await client.post(tokenTestURL);

  return response;
};

export const getAllUsers = async () => {
  const response = await client.get(usersURL);

  return response;
};

export const getUserByUsername = async (username) => {
  const response = await client.get(`${usersURL}/user/${username}`);

  return response;
};

export const getUserById = async (userID) => {
  const response = await client.get(`${usersURL}/${userID}`);

  return response;
};
export const getUserPrivateDataById = async (userID) => {
  const response = await client.get(`${usersURL}/private/${userID}`);

  return response;
};

export const createUser = async (body) => {
  const response = await client.post(signupURL, body);

  return response;
};

export const updateUser = async (userID, body) => {
  const response = await client.put(`${usersURL}/${userID}`, body);

  return response;
};

export const updatePassword = async (mail) => {
  const response = await client.put(`${usersURL}/recover-password/${mail}`);

  return response;
};

export const deleteUser = async (userID) => {
  const response = await client.delete(`${usersURL}/${userID}`);

  return response;
};

export const loginUser = async (credentials) => {
  const accessToken = await client.post(loginURL, credentials);
  storage.set('auth', accessToken);
  //TODO
  //console.log(accessToken);
  setAuthorizationHeader(accessToken);
  return accessToken;
};

export const updateUserSubscriptions = async (userID, body) => {
  const response = await client.put(
    `${usersURL}/${userID}/usersubscriptions`,
    body
  );
  return response;
};
