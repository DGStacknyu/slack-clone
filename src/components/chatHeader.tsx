import { FC } from "react";
import Typography from "./ui/typography";
import { IoMdHeadset } from "react-icons/io";
import { User } from "@/types/app";
type ChatHeaderProps = { title: string; chatId: string; userData: User };
const ChatHeader: FC<ChatHeaderProps> = ({ title, chatId, userData }) => {
  return (
    <div className="absolute z-20 h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography text={`# ${title}`} variant="h4" />
        <IoMdHeadset
          //   onClick={handleCall}
          className="text-primary cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
