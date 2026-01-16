'use client';

import { CheckCircle, X } from 'lucide-react';
import styles from './SuccessModal.module.css';

export default function SuccessModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
            <button onClick={onClose} className={styles.closeBtn}>
                <X size={20} />
            </button>
        </div>
        
        <div className={styles.content}>
            <div className={styles.iconWrapper}>
                <CheckCircle size={48} color="#10B981" fill="#DCFCE7" />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.footer}>
            <button className={styles.closeButton} onClick={onClose}>
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
}
