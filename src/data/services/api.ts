import axios from "axios";
import { MessageProps } from "../../presentation/components/Conversation/Conversation.interface";

const API_URL = "http://localhost:8000";
// const API_URL =
//   "https://sailer-ai-server-production.up.railway.app";
// const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

const api = axios.create({
  baseURL:  API_URL, 
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
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
    const response = await api.post("/chats", {participants});
    console.log('RESPONSE POST CHAT:', response)
    console.log('Participantes do chat:', participants)
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
  messageData: MessageProps
) => {
  try {
    const response = await api.post(`/chats/${chatId}/messages`, messageData);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
};

export const readMessage = async (chatId: string, userId: string, messageId: string) => {
  try{
    const response = await api.post(`/chats/${chatId}/read`, {chat_id: chatId, user_id: userId, last_message_id: messageId})
    return response.data
  }catch(error){
    console.log("Erro ao marcar como lida:", error)
    throw error;
  }
}

export const changeStatus = async (userId: string,status: string, chatId: string) => {
  try{
    const response = await api.post(`/chats/${chatId}/presence`, { user_id: userId, status });
    return response.data
  }catch(error){
    console.log("Erro ao alterar status:", error);
    throw error;
  }
}