export const ChatInput = ({
  value,
  onChange,
  onSendMessage,
  onKeyDown,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center p-4 bg-gray-100">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg"
        placeholder="Digite sua mensagem..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={onSendMessage}
      >
        Enviar
      </button>
    </div>
  );
};
