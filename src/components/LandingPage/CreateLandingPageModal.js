'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/UI/Modal';
import { RealBasicInfoStep, ContentStep, FormUtmStep } from './StepForms';
import styles from './LandingPage.module.css';

export default function CreateLandingPageModal({ isOpen, onClose, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    pageTitle: '',
    description: '',
    ctaText: '',
    selectedFields: ['Nama', 'Email'],
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });
  const [isValid, setIsValid] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        name: '',
        goal: '',
        pageTitle: '',
        description: '',
        ctaText: '',
        selectedFields: ['Nama', 'Email'],
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
      });
    }
  }, [isOpen]);

  // Validation Logic
  useEffect(() => {
    const isStep1Valid = formData.name.trim() !== '' && formData.goal.trim() !== '';
    const isStep2Valid = formData.pageTitle.trim() !== '' && formData.description.trim() !== '' && formData.ctaText.trim() !== '';
    const isStep3Valid = formData.selectedFields.length > 0; // Simplified validation

    if (currentStep === 1) setIsValid(isStep1Valid);
    else if (currentStep === 2) setIsValid(isStep2Valid);
    else setIsValid(isStep1Valid && isStep2Valid && isStep3Valid);
  }, [formData, currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleField = (field) => {
    setFormData(prev => {
      const isSelected = prev.selectedFields.includes(field);
      if (isSelected) {
        return { ...prev, selectedFields: prev.selectedFields.filter(f => f !== field) };
      } else {
        return { ...prev, selectedFields: [...prev.selectedFields, field] };
      }
    });
  };

  const handleNext = () => {
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (isValid) {
      onSuccess();
      onClose();
    }
  };

  const handleDraft = () => {
    // Basic validation for draft (e.g., just name required)
    if (formData.name.trim() !== '') {
      onSuccess('draft');
      onClose();
    }
  };

  const steps = [
    { id: 1, label: 'Informasi Dasar' },
    { id: 2, label: 'Konten' },
    { id: 3, label: 'Form & UTM' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buat Landing Page Baru" width="1000px">
      <div className={styles.stepIndicator}>
        {steps.map(step => (
          <div 
            key={step.id} 
            className={`${styles.step} ${currentStep === step.id ? styles.activeStep : ''}`}
            onClick={() => {
              // Allow clicking back, or clicking forward only if current step is complete (simplified: linear flow enforced for now)
              if (step.id < currentStep) setCurrentStep(step.id);
            }}
          >
            {step.label}
          </div>
        ))}
      </div>

      <div style={{ minHeight: '300px' }}>
        {currentStep === 1 && (
          <RealBasicInfoStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 2 && (
          <ContentStep formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 3 && (
          <FormUtmStep 
            formData={formData} 
            handleChange={handleChange} 
            toggleField={toggleField} 
          />
        )}
      </div>

      <div className={styles.modalActions}>
        <button className={styles.btn} onClick={onClose}>Batal</button>
        
        <div className={styles.rightActions}>
          {currentStep > 1 && (
            <button className={styles.btn} onClick={handleBack}>Sebelumnya</button>
          )}

          {currentStep < 3 ? (
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={handleNext}
              disabled={!isValid}
            >
              Selanjutnya
            </button>
          ) : (
             <>
               <button className={styles.btn} onClick={handleDraft}>Simpan Draft</button>
               <button 
                  className={`${styles.btn} ${styles.btnPrimary}`} 
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Publikasikan
                </button>
             </>
          )}
        </div>
      </div>
    </Modal>
  );
}
