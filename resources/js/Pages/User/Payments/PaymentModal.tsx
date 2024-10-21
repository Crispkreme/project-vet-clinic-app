import Modal from "@/Components/Modal";
import Title from "@/Components/Title";
import { useForm, usePage } from "@inertiajs/react";
import { t } from "i18next";
import { FormEventHandler, useEffect } from "react";
import { PaymentModalProps } from "@/Interfaces";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const PaymentModal = ({ selectedPayment, showModal, toggleModal }: PaymentModalProps) => {
    const { props } = usePage();
    const { errors } = props;

    const { data, setData, post, processing, reset } = useForm({
        prescription_id: '',
        total_amount: '',
        user_name: '',
        pet_name: '',
        status: 'In-Progress',
    });

    useEffect(() => {
        if (selectedPayment) {
            setData({
                prescription_id: selectedPayment.prescription_id || '',
                total_amount: selectedPayment.total_amount || '',
                user_name: selectedPayment.user_name || '',
                pet_name: selectedPayment.pet_name || '',
                status: selectedPayment.status || 'In-Progress',
            });
        }
    }, [selectedPayment]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Submit the form (uncomment the line below for actual submission)
        // post('/payments/store', data);
    };

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <Title>{t('Add Payment')}</Title>

                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        id="prescription_id"
                        name="prescription_id"
                        disabled={true}
                        value={data.prescription_id}
                        onChange={(e) => setData('prescription_id', e.target.value)}
                    />
                    <div className="mt-4">
                        <InputLabel htmlFor="pet_name" value={t('Pet Name')} />
                        <TextInput
                            id="pet_name"
                            name="pet_name"
                            value={data.pet_name}
                            onChange={(e) => setData('pet_name', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="pet_name"
                            isFocused={true}
                            required
                            disabled={true}
                        />
                        <InputError message={errors.pet_name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="user_name" value={t('Doctor Name')} />
                        <TextInput
                            id="user_name"
                            name="user_name"
                            value={data.user_name}
                            onChange={(e) => setData('user_name', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="user_name"
                            isFocused={true}
                            disabled={true}
                            required
                        />
                        <InputError message={errors.user_name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="total_amount" value={t('Total Amount')} />
                        <TextInput
                            id="total_amount"
                            name="total_amount"
                            value={data.total_amount}
                            onChange={(e) => setData('total_amount', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="total_amount"
                            isFocused={true}
                            disabled={true}
                            required
                        />
                        <InputError message={errors.total_amount} className="mt-2" />
                    </div>
                    <div className="mt-4 mb-2">
                        <InputLabel htmlFor="status" value={t('Payment Status')} />
                        <TextInput
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="status"
                            isFocused={true}
                            required
                            disabled={true}
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        disabled={processing}
                    >
                        {t('Pay')}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default PaymentModal;
