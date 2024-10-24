import { IoMdSearch } from "react-icons/io";
import { usePage } from '@inertiajs/react';

const user01 = `${window.location.origin}/assets/user01.png`;
const user02 = `${window.location.origin}/assets/user02.png`;


const ChatProfile = () => {

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
            <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                <div className="flex-shrink-0">
                    <img
                        src={user02}
                        alt="doctor"
                        className="h-10 w-10 rounded-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <a className="focus:outline-none" href="#">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-red-600">
                                Jude Igot
                            </p>
                            <div className="text-gray-400 text-xs">
                                12:35 AM
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 truncate">HI</p>
                            <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                2
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                <div className="flex-shrink-0">
                    <img
                        src={user02}
                        alt="doctor"
                        className="h-10 w-10 rounded-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <a className="focus:outline-none" href="#">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-red-600">
                                Jude Igot
                            </p>
                            <div className="text-gray-400 text-xs">
                                12:35 AM
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 truncate">HI</p>
                            <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                2
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                <div className="flex-shrink-0">
                    <img
                        src={user02}
                        alt="doctor"
                        className="h-10 w-10 rounded-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <a className="focus:outline-none" href="#">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-red-600">
                                Jude Igot
                            </p>
                            <div className="text-gray-400 text-xs">
                                12:35 AM
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 truncate">HI</p>
                            <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                2
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default ChatProfile;
