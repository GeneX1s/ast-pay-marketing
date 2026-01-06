import React from 'react';
import styles from './Auth.module.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Konfirmasi Keluar</h3>
                <p className={styles.modalText}>Yakin ingin keluar?</p>

                <div className={styles.modalActions}>
                    <button className={styles.btnCancel} onClick={onClose}>
                        Batal
                    </button>
                    <button className={styles.btnConfirm} onClick={onConfirm}>
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
