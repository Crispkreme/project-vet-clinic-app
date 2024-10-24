import { IoMdSearch } from "react-icons/io";
import { usePage } from '@inertiajs/react';
import UserChat from "@/Components/Chats/UserChat";

const user01 = `${window.location.origin}/assets/user01.png`;
const user02 = `${window.location.origin}/assets/user02.png`;


const ChatProfile = ({ users }) => {
    console.log(users);
    const user = usePage().props.auth.user;

    return (
        <>
            <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                <div className="flex-shrink-0">
                    <img
                        src={user01}
                        alt="doctor"
                        className="h-12 w-12 rounded-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-sm font-bold text-red-600">
                            {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{user.usertype}</p>
                    </a>
                </div>
            </div>
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoMdSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="search"
                        className="block w-full pl-10 pr-4 sm:text-sm border-gray-100 rounded-full p-2 border focus:ring-red-500 focus:border-red-500"
                        placeholder="Search"
                    />
                </div>
            </div>

            {users.map((user) => (
                <UserChat user={user} />
            ))}
            
        </>
    );
};

export default ChatProfile;
