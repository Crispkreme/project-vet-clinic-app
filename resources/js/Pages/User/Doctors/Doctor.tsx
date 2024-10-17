import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { UserProps } from "@/Interfaces";

const Doctor = ({ doctors }: UserProps) => {

  return (
    <Authenticated>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {doctors.map((doctor) => (
            <Card doctor={doctor} />
          ))}
        </div>
      </div>
    </Authenticated>
  );
};

export default Doctor;
