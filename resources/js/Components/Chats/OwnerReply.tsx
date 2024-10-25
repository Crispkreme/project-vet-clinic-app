import { ReplyProps } from "@/Interfaces";
import { usePage } from '@inertiajs/react';

const OwnerReply: React.FC<ReplyProps> = ({ message }) => {
    
    const userCredential = usePage().props.auth.user;
    const profilePicture = `${window.location.origin}/assets/${userCredential.profile}`;


    return (
        <div className="chat-message">
            <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                            {message}
                        </span>
                    </div>
                </div>
                <img src={profilePicture} className="w-6 h-6 rounded-full order-1" alt="Owner profile" />
            </div>
        </div>
    );
};

export default OwnerReply;
