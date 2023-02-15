import client from '../../api/client.js';

const signupURL = '/api/users/signup';
const usersURL = '/api/users';

export const getAllUsers = async () => {
  const response = await client.get(usersURL);

  return response;
};

export const getUserById = async (userID) => {
  const response = await client.get(`${usersURL}/${userID}`);

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

export const deleteUser = async (userID) => {
  const response = await client.delete(`${usersURL}/${userID}`);

  return response;
};
