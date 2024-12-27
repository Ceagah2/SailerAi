import { useState } from "react";

export const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center bg-white rounded-lg overflow-hidden">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  );
};
