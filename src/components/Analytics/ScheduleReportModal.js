'use client';

import { useState } from 'react';
import Modal from '@/components/UI/Modal';
import styles from './Analytics.module.css';

export default function ScheduleReportModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: 'Laporan Mingguan Marketing',
    frequency: 'Mingguan',
    email: 'marketing@astpay.id',
    autoSend: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Jadwalkan Laporan" width="500px">
      <div className={styles.formGroup}>
        <label className={styles.label}>Nama Laporan</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input} 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Frekuensi</label>
        <select 
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Harian">Harian</option>
          <option value="Mingguan">Mingguan</option>
          <option value="Bulanan">Bulanan</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email Penerima</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input} 
        />
      </div>

       <div className={styles.checkboxGroup}>
        <input 
          type="checkbox" 
          name="autoSend"
          checked={formData.autoSend}
          onChange={handleChange}
          id="autoSend"
          style={{ width: 'auto' }}
        />
        <label htmlFor="autoSend" className={styles.checkboxLabel}>Laporan akan dikirim otomatis sesuai jadwal</label>
      </div>

      <div className={styles.modalActions}>
        <button className={styles.btn} onClick={onClose}>Batal</button>
        <button 
          className={`${styles.btn} ${styles.btnPrimary}`} 
          onClick={handleSubmit}
        >
          Jadwalkan
        </button>
      </div>
    </Modal>
  );
}
