'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './Experiments.module.css';

export default function CreateExperimentModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    duration: 7,
    variantA: { name: 'Daftar Sekarang', content: '' },
    variantB: { name: 'Mulai Gratis', content: '' }
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (variant, field, value) => {
    setFormData(prev => ({
      ...prev,
      [variant]: { ...prev[variant], [field]: value }
    }));
  };

  const isStep1Valid = formData.name && formData.target && formData.duration;
  const isStep2Valid = formData.variantA.name && formData.variantA.content;
  const isStep3Valid = formData.variantB.name && formData.variantB.content;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    onSuccess(formData);
    // Reset form after a brief delay or immediately
    setStep(1);
    setFormData({
        name: '',
        target: '',
        duration: 7,
        variantA: { name: 'Daftar Sekarang', content: '' },
        variantB: { name: 'Mulai Gratis', content: '' }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Buat Eksperimen Baru</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Steps Indicator */}
          <div className={styles.stepsContainer}>
            <div className={`${styles.stepPill} ${step === 1 ? styles.activeStep : ''}`}>Setup</div>
            <div className={`${styles.stepPill} ${step === 2 ? styles.activeStep : ''}`}>Varian A</div>
            <div className={`${styles.stepPill} ${step === 3 ? styles.activeStep : ''}`}>Varian B</div>
          </div>

          {/* Form Fields */}
          {step === 1 && (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nama Eksperimen *</label>
                <input 
                  type="text" 
                  className={styles.input}
                  placeholder="Contoh: CTA Button Test"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Target / Kampanye</label>
                <input 
                  type="text" 
                  className={styles.input}
                  placeholder="Contoh: Landing Page Daftar Gratis"
                  value={formData.target}
                  onChange={(e) => handleChange('target', e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Durasi (hari)</label>
                <input 
                  type="number" 
                  className={styles.input}
                  min="1"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nama Varian A</label>
                <input 
                  type="text" 
                  className={styles.input}
                  value={formData.variantA.name}
                  onChange={(e) => handleVariantChange('variantA', 'name', e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Konten / Copy Varian A</label>
                <textarea 
                  className={styles.textArea}
                  placeholder="Deskripsi lengkap varian A..."
                  value={formData.variantA.content}
                  onChange={(e) => handleVariantChange('variantA', 'content', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nama Varian B</label>
                <input 
                  type="text" 
                  className={styles.input}
                  value={formData.variantB.name}
                  onChange={(e) => handleVariantChange('variantB', 'name', e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Konten / Copy Varian B</label>
                <textarea 
                  className={styles.textArea}
                  placeholder="Deskripsi lengkap varian B..."
                  value={formData.variantB.content}
                  onChange={(e) => handleVariantChange('variantB', 'content', e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.btnSecondary} onClick={onClose}>Batal</button>
          
          {step > 1 && (
            <button className={styles.btnSecondary} onClick={handleBack}>Sebelumnya</button>
          )}

          {step < 3 ? (
            <button 
                className={styles.btnPrimary} 
                onClick={handleNext}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            >
                Selanjutnya
            </button>
          ) : (
            <button 
                className={styles.btnPrimary} 
                onClick={handleSubmit}
                disabled={!isStep3Valid}
            >
                Buat Eksperimen
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
