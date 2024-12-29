import axios from "axios";

const API_URL = "http://localhost:8000/";
const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

const api = axios.create({
  baseURL: corsProxyUrl + API_URL, 
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getChats = async () => {
  try {
    const response = await api.get("/chats");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar chats:", error);
    throw error;
  }
};

export const createChat = async (participants: string[]) => {
  try {
    const response = await api.post("/chats", participants);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar chat:", error);
    throw error;
  }
};

export const getMessages = async(chatId: string) => {
  try{
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data
  } catch(error){
     console.error("Erro ao carregar mensagens:", error);
     throw error;
  }
}

export const sendMessage = async (
  chatId: string,
  messageData: { text: string }
) => {
  try {
    const response = await api.post(`/chats/${chatId}/messages`, messageData);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
};
