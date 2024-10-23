import React, { useState, useEffect } from 'react';
import Title from "@/Components/Title";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/Textarea";
import InputError from "@/Components/InputError";
import { Inertia } from '@inertiajs/inertia';
import { PrescriptionModalProps } from '@/Interfaces';
import { useTranslation } from 'react-i18next';

const PrescriptionModal = ({ showModal, toggleModal, selectedPrescription, doctors = [], pets = []}: PrescriptionModalProps) => {
  
  const { t } = useTranslation();
  const [id, setId] = useState<number | ''>('');
  const [vetId, setVetId] = useState<number | ''>('');
  const [petId, setPetId] = useState<number | ''>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [treatmentPlan, setTreatmentPlan] = useState<string>('');
  const [prescribedMedication, setPrescribedMedication] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedPrescription) {
      setId(selectedPrescription.id || '');
      setVetId(selectedPrescription.vet_id || '');
      setPetId(selectedPrescription.pet_id || '');
      setDiagnosis(selectedPrescription.diagnosis || '');
      setTreatmentPlan(selectedPrescription.treatment_plan || '');
      setPrescribedMedication(selectedPrescription.prescribed_medication || '');
    }
  }, [selectedPrescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    if (!vetId || !petId || !diagnosis || !treatmentPlan || !prescribedMedication) {
      const newErrors: { [key: string]: string } = {};
      if (!vetId) newErrors.vetId = t('Doctor is required');
      if (!petId) newErrors.petId = t('Pet is required');
      if (!diagnosis) newErrors.diagnosis = t('Diagnosis is required');
      if (!treatmentPlan) newErrors.treatmentPlan = t('Treatment Plan is required');
      if (!prescribedMedication) newErrors.prescribedMedication = t('Prescribed Medication is required');
      setErrors(newErrors);
      return;
    }
  
    const formData = new FormData();
    formData.append('vet_id', vetId.toString());
    formData.append('pet_id', petId.toString());
    formData.append('diagnosis', diagnosis);
    formData.append('treatment_plan', treatmentPlan);
    formData.append('prescribed_medication', prescribedMedication);
  
    Inertia.post(route('admin.create.prescription', id), formData, {
      onSuccess: (response: { props: { message: string } }) => {
        toggleModal();
      },
      onError: (error: { props?: { error: string } }) => {
        const errorMessage = error?.props?.error || "An error occurred.";
      },
    });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <Title>{selectedPrescription ? 'Edit Prescription' : 'Add Prescription'}</Title>

        <form onSubmit={handleSubmit}>
          <input type="hidden" value={id}/>
          <div className="mb-4">
            <InputLabel htmlFor="vetId" value={t('Doctor')} />
            <TextInput
              type="number"
              id="vetId"
              value={vetId}
              onChange={(e) => setVetId(Number(e.target.value))}
              required
              className="mt-1 block w-full"
            />
            <InputError message={errors.vetId} className="mt-2" />
          </div>
          <div className="mb-4">
            <InputLabel htmlFor="petId" value={t('Pet')} />
            <TextInput
              type="number"
              id="petId"
              value={petId}
              onChange={(e) => setPetId(Number(e.target.value))}
              required
              className="mt-1 block w-full"
            />
            <InputError message={errors.title} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="diagnosis" value={t('Diagnosis')} />
            <Textarea
              id="diagnosis"
              name="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="mt-1 block w-full  focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
            <InputError message={errors.diagnosis} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="treatmentPlan" value={t('Treatment Plan')} />
            <Textarea
              id="treatmentPlan"
              name="treatmentPlan"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              required
              className="mt-1 block w-full  focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
            <InputError message={errors.treatmentPlan} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="prescribedMedication" value={t('Prescribed Medication')} />
            <Textarea
              id="prescribedMedication"
              name="prescribedMedication"
              value={prescribedMedication}
              onChange={(e) => setPrescribedMedication(e.target.value)}
              required
              className="mt-1 block w-full focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
            <InputError message={errors.prescribedMedication} className="mt-2" />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={toggleModal} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">{t('Cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              {selectedPrescription ? t('Update') : t('Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionModal;
