import { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Invoice } from "@/Interfaces";
import Title from '@/Components/Title';
import { MdPayment } from "react-icons/md";
import PaymentModal from '@/Pages/User/Payments/PaymentModal';
import { useTranslation } from 'react-i18next';

const Payment = ({ payments }: { payments: Invoice[] }) => {
  const { t } = useTranslation();
  const [selectedPayment, setSelectedPayment] = useState<Invoice | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false); 
    setSelectedPayment(null); 
  };

  const openPaymentModal = (payment: Invoice) => {
    setSelectedPayment(payment); 
    setShowModal(true);
  };

  return (
    <AuthenticatedLayout>
        <div className="container mx-auto max-w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between mb-4">
              <Title>
                {t('Payment History')}
                <span className="ml-2">
                  <MdPayment className="text-lg sm:text-xl" />
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
                      <th className="px-4 py-2 text-left text-sm font-medium">{t('Actions')}</th>
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
                          <td className="border px-4 py-2 flex flex-col sm:flex-row gap-2">
                            {payment.status === "Pending" && (
                              <button
                                onClick={() => openPaymentModal(payment)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs sm:text-sm"
                              >
                                <MdPayment className="mr-1" />
                                <span className="text-xs sm:text-sm">{t('Pay')}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-500">
                          No invoices available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </div>
        </div>

        {showModal && (
            <PaymentModal
                selectedPayment={selectedPayment}
                showModal={showModal}
                toggleModal={toggleModal}
            />
        )}
    </AuthenticatedLayout>
  );

};

export default Payment;
