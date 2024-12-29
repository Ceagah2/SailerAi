import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { ChatInput } from "../Input";

interface Message {
  id: string;
  type: string;
  content: string;
  sender: "me" | "other";
  status?: "recording" | "texting" | "sending" | "sent";
}

export const Conversation = ({
  selectedChat,
  messages,
  isSidebarCollapsed,
}: {
  selectedChat: string | null;
  messages: Message[];
  isSidebarCollapsed: boolean;
}) => {
  const [activeMessages, setActiveMessages] = useState<Message[]>(messages);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioWaveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (audioWaveformRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: audioWaveformRef.current,
        waveColor: "#ddd",
        progressColor: "#007BFF",
        cursorColor: "#333",
        barWidth: 2,
        height: 50,
      });
    }
    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      type: "text",
      content: inputValue,
      sender: "me",
    };

    setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
      if (waveSurferRef.current) {
        waveSurferRef.current.load(URL.createObjectURL(blob));
      }
      stopRecording(blob);
    };

    mediaRecorder.start();

    setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    }, 30000); // Limita a gravação a 30 segundos
  };

  const stopRecording = (blob: Blob | null) => {
    setIsRecording(false);

    if (blob) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        type: "audio",
        content: URL.createObjectURL(blob),
        sender: "me",
        status: "sent",
      };
      setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
      setAudioBlob(null);
    }
  };

  return (
    <section
      className={`flex flex-col h-screen bg-gray-300 transition-all duration-500 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      }`}
      style={{ width: `calc(100% - ${isSidebarCollapsed ? "4rem" : "16rem"})` }}
    >
      <header className="flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">
          {selectedChat ? `${selectedChat}` : "Nenhum chat selecionado"}
        </h2>
        {isRecording && (
          <div className="animate-pulse text-sm text-red-500">
            Gravando áudio...
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col gap-4 p-4 w-full overflow-y-auto">
        {activeMessages.length > 0 ? (
          activeMessages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.type === "audio"
                  ? ""
                  : message.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              } p-3 rounded-lg`}
              style={{
                maxWidth: "70%",
                alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
              }}
            >
              {message.type === "audio" ? (
                <div>
                  <audio controls src={message.content}></audio>
                  <div ref={audioWaveformRef}></div>
                </div>
              ) : (
                message.content
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">
              Nenhuma mensagem neste chat. Crie um chat agora mesmo ou escolha
              um chat para conversar.
            </p>
          </div>
        )}
      </div>
      {selectedChat ? (
        <div className="flex items-center gap-2 p-4">
          <button
            onMouseDown={startRecording}
            onMouseUp={() => stopRecording(audioBlob)}
            className="bg-red-500 text-white rounded-full p-3"
          >
            🎤
          </button>
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSendMessage={handleSendMessage}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      ) : null}
    </section>
  );
};
