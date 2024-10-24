
const OwnerReply = ({ message }) => {

    const user02 = `${window.location.origin}/assets/user02.png`;

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
                <img src={user02} className="w-6 h-6 rounded-full order-1" />
            </div>
        </div>
    );
};

export default OwnerReply;
