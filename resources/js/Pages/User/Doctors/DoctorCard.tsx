import { TbDeviceMobileMessage } from "react-icons/tb";
import { MdOutlineMarkAsUnread } from "react-icons/md";
import { DoctorInfo } from "@/Interfaces";

const user01 = `${window.location.origin}/assets/user01.png`;

const DoctorCard = ({ doctor }: { doctor: DoctorInfo }) => {
    return (
        <div className="card-container">
            <div className="card max-w-[270px] w-full bg-white rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-[450px]"> {/* Increased height */}
                
                <div className="max-w-[270px] flex-grow flex flex-col items-center">
                    <div className="avatar w-[150px] h-[150px] rounded-full border-[5px] border-blue-500 p-1 mb-2">
                        <img src={user01} alt="doctor" className="h-full w-full rounded-full" />
                    </div>

                    <div className="text-xl font-bold pt-1">
                        <h2>{doctor.name}</h2>
                    </div>

                    <div className="text-sm text-gray-600">
                        {doctor.usertype === 'admin' ? 'Doctor' : 'Foster Owner'}
                    </div>

                    <div className="w-full text-xs text-gray-500 my-2 overflow-hidden">
                        <p className="w-full text-center max-h-[50px]">
                        Cardinal Rosales Avenue Corner Sumilon Road Cebu Business Park, Cebu City
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row gap-4 justify-center items-center bg-sky-200 p-3 rounded-lg w-full flex-wrap">
                    <div className="flex flex-col items-center text-center flex-1 min-w-[100px]">
                        <TbDeviceMobileMessage className="text-[#1E3A8A] mb-1" />
                        <span className="text-xs font-bold text-gray-700">{doctor.phone_number}</span> 
                    </div>
                    <div className="flex flex-col items-center text-center flex-1 min-w-[100px]">
                        <MdOutlineMarkAsUnread className="text-[#1E3A8A] mb-1" /> 
                        <span className="text-xs font-bold text-gray-700">{doctor.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
