import { useState, useEffect } from "react";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const UserChat = ({ user }) => {

    const owner = usePage().props.auth.user;

    const [currentTime, setCurrentTime] = useState('');
    const user02 = `${window.location.origin}/assets/user02.png`;

    const formatTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    };

    const handleChatClick = () => {
        if (owner.usertype === 'admin') {
          Inertia.get(`/admin/owner/message/${user.id}`);
        } else {
          Inertia.get(`/user/doctor/message/${user.id}`);
        }
    };
      
    const updateTime = () => {
        const now = new Date();
        setCurrentTime(formatTime(now));
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
            <div className="flex-shrink-0">
                <img
                    src={user02}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                />
            </div>
            <div className="flex-1 min-w-0">
                <a className="focus:outline-none" onClick={handleChatClick}>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-red-600">
                            {user.name}
                        </p>
                        <div className="text-gray-400 text-xs">{currentTime}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">Doctor</p>
                        {/* <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                            2
                        </div> */}
                    </div>
                </a>
            </div>
        </div>
    );
};

export default UserChat;
