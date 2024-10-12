import React, { useState } from "react";
import Modal from "@/Components/Modal";

interface AddPetProps {
    showModal: boolean;
    toggleModal: () => void;
}

const AddPet: React.FC<AddPetProps> = ({ showModal, toggleModal }) => {
    const [weight, setWeight] = useState<string>("");

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value === "") {
            setWeight(value);
            return;
        }

        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setWeight(value);
        }
    };

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Add New Pet</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Pet Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter pet name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Breed</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter breed"
                        />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Age</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter age"
                                min="0"
                                max="99"
                                step="1"
                                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                    const input = e.currentTarget;
                                    if (input.value.length > 2) {
                                        input.value = input.value.slice(0, 2);
                                    }
                                }}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Weight</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter weight"
                                value={weight}
                                onChange={handleWeightChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Status</label>
                        <select className="w-full px-3 py-2 border rounded-md" defaultValue="">
                            <option value="" disabled>
                                Select status
                            </option>
                            <option value="Healthy">Healthy</option>
                            <option value="Due for Vaccination">Due for Vaccination</option>
                            <option value="Under Treatment">Under Treatment</option>
                            <option value="Post-Surgery">Post-Surgery</option>
                            <option value="Needs Medication">Needs Medication</option>
                            <option value="In Quarantine">In Quarantine</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Adopted">Adopted</option>
                            <option value="Lost">Lost</option>
                            <option value="Pending Vet Visit">Pending Vet Visit</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Medical History</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter medical history"
                            rows={4}
                        ></textarea>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddPet;
