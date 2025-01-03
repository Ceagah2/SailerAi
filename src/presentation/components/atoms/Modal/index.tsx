import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (participants: string[]) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    const participants = inputValue
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name); 

    onConfirm([...participants, "bot_user"]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md w-96">
        <h2 className="text-lg font-semibold">
          Digite os participantes do chat
        </h2>
        <p className="text-sm text-gray-500">
          Separe os nomes dos participantes por vírgula (ex: João, Maria,
          Pedro).
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ex: João, Maria, Pedro"
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 p-2 rounded-md text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 p-2 rounded-md text-sm text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
