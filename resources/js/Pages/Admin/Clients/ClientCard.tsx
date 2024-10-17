import { PetInfo } from "@/Interfaces";
import { GrUserManager } from "react-icons/gr";

const user01 = `${window.location.origin}/assets/user01.png`;

const ClientCard = ({ client }: { client: PetInfo }) => {

    return (
        <div className="card-container">
            <div className="card max-w-[270px] w-full bg-white rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-[400px]">

                <div className="max-w-[270px] flex-grow flex flex-col items-center">
                    <div className="avatar w-[150px] h-[150px] rounded-full border-[5px] border-blue-500 p-1 mb-2">
                        <img src={user01} alt="doctor" className="h-full w-full rounded-full" />
                    </div>

                    <div className="text-xl font-bold pt-1 text-center">
                        <h2>{client.pet_name}</h2>
                    </div>

                    <div className="w-full text-xs text-gray-500 my-2 overflow-hidden text-center">
                        <div className="text-sm text-gray-600">
                            {client.breed}
                        </div>

                        <div className="text-sm text-gray-600">
                            {client.age} yr old
                        </div>

                        <div className="text-sm text-gray-600">
                            {client.weight} kg
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row gap-4 justify-center items-center bg-sky-200 p-3 rounded-lg w-full">
                    <div className="flex flex-col items-center text-center">
                        <GrUserManager className="text-[#1E3A8A] mb-1" />
                        <span className="text-xs font-bold text-gray-700">{client.owner_name}</span> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;
