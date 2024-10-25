import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FiSend } from "react-icons/fi";
import ChatProfile from "@/Components/Chats/ChatProfile";
import UserProfile from "@/Components/Chats/UserProfile";
import { ChatProps } from "@/Interfaces";

const Chat: React.FC<ChatProps> = ({ user, owners }) => {
    return (
        <Authenticated>
            <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-gray-50">
                        <div className="h-full pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                            <div className="h-full relative p-2">
                                <ChatProfile users={owners} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex">
                        <UserProfile name={user.name} profile={user.profile} />

                        <div className="p-[15px] flex flex-col space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        </div>

                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-16">
                            <div className="relative flex">
                                <span className="absolute inset-y-0 flex items-center">
                                    <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-200">
                                        <FiSend />
                                    </button>
                                </span>
                                <input
                                    className="focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                                    placeholder="Write something"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Chat;
