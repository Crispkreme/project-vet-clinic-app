import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Title from '@/Components/Title';
import { MdPayment } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { PaymentProps } from "@/Interfaces";
import React, { useEffect } from 'react';

const Payment: React.FC<PaymentProps> = ({ payments, flash }) => {

    const { t } = useTranslation();

    useEffect(() => {
        if(flash.message.success) {
          toast.success(flash.message.success);
        }
        if(flash.message.error) {
          toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout>
            <ToastContainer />
            <div className="container mx-auto bg-white p-4 sm:p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400 mt-2">
                <div className="flex items-center justify-between mb-4">
                    <Title>
                        {t('Payment History')}
                        <span className="ml-4">
                            <MdPayment />
                        </span>
                    </Title>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Pet Owner')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Pet Name')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Total Amount')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="border-b dark:border-gray-600">
                                        <td className="border px-4 py-2 text-sm">{payment.user_name}</td>
                                        <td className="border px-4 py-2 text-sm">{payment.pet_name}</td>
                                        <td className="border px-4 py-2 text-sm">{payment.total_amount}</td>
                                        <td className="border px-4 py-2 text-sm">{payment.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-gray-500">
                                        {t('No invoices available')}.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payment;
