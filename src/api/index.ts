import axios from 'axios';

const APIInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_ADDR,
  timeout: 10000,
  withCredentials: true,
});

export default APIInstance;
