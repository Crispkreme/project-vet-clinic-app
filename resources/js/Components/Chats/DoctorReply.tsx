import { DoctorReplyProps } from "@/Interfaces";

const DoctorReply: React.FC<DoctorReplyProps> = ({ message, doctors, picture }) => {

    const doctorProfile = `${window.location.origin}/assets/${picture}`;

    return (
        <div className="chat-message">
            <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                    <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-500 text-white">
                            {message}
                        </span>
                    </div>
                </div>
                <img src={doctorProfile} className="w-6 h-6 rounded-full order-1" />
            </div>
        </div>
    );
};

export default DoctorReply;
