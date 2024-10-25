import { useEffect } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FiSend } from "react-icons/fi";
import ChatProfile from "@/Components/Chats/ChatProfile";
import UserProfile from "@/Components/Chats/UserProfile";
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import DoctorReply from '@/Components/Chats/DoctorReply';
import OwnerReply from '@/Components/Chats/OwnerReply';

interface MessageProps {
  user: {
    id: number;
    name: string;
    usertype: string;
  };
  doctors?: Array<{ id: number; name: string }>;
  flash: {
    message: {
      success?: string;
      error?: string;
    };
  };
  sentMessages: Array<{
    id: number;
    message: string;
    sender: string;
  }>;
}

const Message = ({ user, doctors = [], flash, sentMessages }: MessageProps) => {
  console.log(sentMessages);

  const owner = usePage().props.auth.user;
  const isAdmin = user.usertype;
  const { data, setData, post, reset } = useForm({
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const routeName = 'user.send.message';

    post(route(routeName, user.id), {
      onSuccess: () => reset(),
    });
  };

  useEffect(() => {
    if (flash.message.success) {
      toast.success(flash.message.success);
    }
    if (flash.message.error) {
      toast.error(flash.message.error);
    }
  }, [flash]);

  return (
    <Authenticated>
      <ToastContainer />
      <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
        <div className="flex-1 min-w-0 bg-white xl:flex">
          <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-gray-50">
            <div className="h-full pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
              <div className="h-full relative p-2">
                <ChatProfile users={doctors} />
              </div>
            </div>
          </div>
          <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex">
            <UserProfile name={user.name} />

            <div className="p-[15px] flex flex-col space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              {sentMessages.map((sentMessage) => (
                sentMessage['sender'] !== owner.name ? (
                  <DoctorReply key={sentMessage.id} message={sentMessage['message']} />
                ) : (
                  <OwnerReply key={sentMessage.id} message={sentMessage['message']} />
                )
              ))}
            </div>

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-16">
              <div className="relative flex">
                <form className="w-full flex items-center" onSubmit={handleSubmit}>
                  <span className="absolute inset-y-0 flex items-center">
                    <button type="submit" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-200">
                      <FiSend />
                    </button>
                  </span>
                  <input
                    type="text"
                    className="focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                    placeholder="Write something"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSubmit(e);
                      }
                    }}
                  />
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Authenticated>
  );
}

export default Message;
