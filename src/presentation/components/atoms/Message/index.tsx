import React from "react";
import { MessageProps } from "../../molecules/Conversation/Conversation.interface";

type TypeMessage = {
  message: MessageProps;
  currentUserId: string;

};

const Message: React.FC<TypeMessage> = ({ message, currentUserId }) => {
  const isSender = message.user_id === currentUserId;


  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return <p>{message.content}</p>;
      case "image":
        return (
          <img
            src={message.content}
            alt="Imagem enviada"
            className="w-full h-auto rounded-md"
          />
        );
      case "audio":
        return (
          <audio controls>
            <source src={message.content} type="audio/mpeg" />
            Seu navegador não suporta o elemento de áudio.
          </audio>
        );
      default:
        return <p>Tipo de mensagem não suportado.</p>;
    }
  };


  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 `} >
      <div
        className={`p-3 rounded-lg ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        } max-w-xs`}
      >
        <p>{renderMessageContent()}</p>
        <div className="text-xs mt-1 flex items-center justify-end">
          <span className="text-gray-400">Sended at:{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
