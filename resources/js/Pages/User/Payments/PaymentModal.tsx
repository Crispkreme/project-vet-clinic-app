import { useState } from 'react';
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
    console.log(selectedPayment);
    const { props } = usePage();
    const { errors } = props;
    const [notification, setNotification] = useState<string | null>(null);
    const { data, setData, post, processing, reset } = useForm({
        prescription_id: '',
        total_amount: '',
        medical_status: '',
        user_name: '',
        pet_name: '',
        status: 'In-Progress',
    });

    // const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    //     e.preventDefault();
    //     post(route('user.pay.paypal'), {
    //         onSuccess: (response) => {
    //             setNotification(response.message); 
    //             toggleModal();
    //         },
    //         onError: (errors) => {
    //             setNotification(errors.message || "An error occurred."); 
    //         },
    //     });
    // };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('user.pay.paypal'), {
            onSuccess: (response) => {
                if (response.props.redirect_url) {
                    window.location.href = response.props.redirect_url;
                } else {
                    setNotification("Payment initiation failed.");
                }
                toggleModal();
            },
            onError: (errors) => {
                setNotification(errors.message || "An error occurred.");
            },
        });
    };
    

    useEffect(() => {
        if (selectedPayment) {
            setData({
                prescription_id: selectedPayment.prescription_id || '',
                total_amount: selectedPayment.total_amount || '',
                medical_status: selectedPayment.medical_status || '',
                user_name: selectedPayment.user_name || '',
                pet_name: selectedPayment.pet_name || '',
                status: selectedPayment.status || 'In-Progress',
            });
        }
    }, [selectedPayment]);

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
                        <InputLabel htmlFor="medical_status" value={t('Medical Status')} />
                        <TextInput
                            id="medical_status"
                            name="medical_status"
                            value={data.medical_status}
                            onChange={(e) => setData('medical_status', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="medical_status"
                            isFocused={true}
                            required
                            disabled={true}
                        />
                        <InputError message={errors.pet_name} className="mt-2" />
                    </div>
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
