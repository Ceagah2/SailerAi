import React, { useState } from "react";
import { useUserStore } from "../../../../data/context/user.context";


const UserSetup = () => {
  const { name, photo, setName, setPhoto } = useUserStore();
  const [tempName, setTempName] = useState(name || "");
  const [tempPhoto, setTempPhoto] = useState<File | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setTempPhoto(file);


      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempName && tempPhoto) {
      setName(tempName);
      alert("Informações salvas com sucesso!");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Configuração do Usuário</h1>

      <input
        type="text"
        placeholder="Digite seu nome"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        className="border p-2 rounded w-72 mb-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="mb-4"
      />

      {photo && (
        <img
          src={photo}
          alt="Preview"
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>
    </div>
  );
};

export default UserSetup;
