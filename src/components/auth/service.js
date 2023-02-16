import client from '../../api/client.js';

const signupURL = '/api/users/signup';

export const createUser = async (body) => {
    const response = await client.post(signupURL, body);
  
    return response;
  };