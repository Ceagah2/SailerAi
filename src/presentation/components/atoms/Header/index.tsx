import { IMAGE_URL } from "../../../utils/constants";


export const Header = () => {
  return (
    <header className="flex direction-row justify-center items-center h-20 w-full">
      <img src={IMAGE_URL} className="w-1/10 h-1/10 " /> 
      <span className="text-white text-3xl">Chat</span>
    </header>
  );
};