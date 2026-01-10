'use client';

import { useState } from 'react';
import Modal from '@/components/UI/Modal';
import styles from './Referral.module.css';

export default function AddPartnerModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: 'PT Digital Marketing Solution',
    email: 'partner3@company.com',
    phone: '+62 812-3456-7890'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Partner Baru" width="600px">
      <div className={styles.formGroup}>
        <label className={styles.label}>Nama Partner *</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input} 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email *</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input} 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nomor Telepon</label>
        <input 
          type="text" 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input} 
        />
      </div>

      <div className={styles.generatedCodeBox}>
        Kode referral akan dibuat otomatis setelah partner ditambahkan
      </div>

      <div className={styles.modalActions}>
        <button className={styles.btn} onClick={onClose}>Batal</button>
        <button 
          className={`${styles.btn} ${styles.btnPrimary}`} 
          onClick={handleSubmit}
        >
          Tambah Partner
        </button>
      </div>
    </Modal>
  );
}
