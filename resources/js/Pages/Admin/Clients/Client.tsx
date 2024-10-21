import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PetInfo } from "@/Interfaces";
import ClientCard from "@/Pages/Admin/Clients/ClientCard";

const Client = ({ clients }: { clients: PetInfo[] }) => { 

    return (
        <Authenticated>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {clients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}

export default Client;
