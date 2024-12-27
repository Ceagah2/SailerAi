export const NewChat = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Novo Chat
    </button>
  );
};
