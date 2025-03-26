import axios from "axios";

const API_URL = "https://wccbackend-production.up.railway.app/api/messages"; // Change to backend URL if deployed

export const getMessages = async () => {
  return axios.get(API_URL).then(res => res.data);
};

export const sendMessage = async (username, message) => {
  return axios.post(API_URL, { username, message });
};
