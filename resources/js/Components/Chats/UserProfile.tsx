import { IoMdSearch } from 'react-icons/io';
import { RxHeart } from 'react-icons/rx';
import { UserProfileProps } from '@/Interfaces';

const UserProfile: React.FC<UserProfileProps> = ({ name, profile }) => {

    const profilePicture = `${window.location.origin}/assets/${profile}`;

    return (
        <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
            <div className="flex items-center space-x-4">
                <img 
                    src={profilePicture} 
                    alt={`${name}'s profile`} 
                    className="sm:w-12 w-10 sm:h-12 h-10 cursor-pointer rounded-full" 
                />
                <div className="flex flex-col leading-tight">
                    <div className="text-1xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">{name}</span>
                        <span className="text-green-500">
                            <svg width={10} height={10}>
                                <circle cx={5} cy={5} r={5} fill="currentColor" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <IoMdSearch />
                </button>
                <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <RxHeart />
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
