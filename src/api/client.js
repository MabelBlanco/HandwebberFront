import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_CONNECTION,
});

client.interceptors.response.use((response) => response.data.result);

export default client;
