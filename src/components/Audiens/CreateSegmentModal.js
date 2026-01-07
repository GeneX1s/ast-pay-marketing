import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './Audiens.module.css';

// Predefined criteria options from screenshot
const CRITERIA_OPTIONS = [
    'Kota: Jakarta',
    'Kota: Surabaya',
    'Kota: Bandung',
    'Status: Merchant Baru',
    'Status: Aktif',
    'Status: Tidak Aktif',
    'Kategori: F&B',
    'Kategori: Retail',
    'Plan: Free',
    'Plan: Premium',
    'Volume: >100 transaksi',
    'Last Active: <30 hari'
];

export default function CreateSegmentModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState('');
    const [selectedCriteria, setSelectedCriteria] = useState([]);

    const toggleCriteria = (criteria) => {
        setSelectedCriteria(prev =>
            prev.includes(criteria)
                ? prev.filter(c => c !== criteria)
                : [...prev, criteria]
        );
    };

    const handleSave = () => {
        if (!name) return;
        onSave({ name, criteria: selectedCriteria });
        // Reset form
        setName('');
        setSelectedCriteria([]);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Buat Segmen Baru</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Nama Segmen</label>
                    <input
                        type="text"
                        placeholder="Misal: Merchant Aktif Jakarta"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Kriteria Segmentasi</label>
                    <p className={styles.helperText}>Klik untuk menambah atau menghapus kriteria</p>
                    <div className={styles.chipGrid}>
                        {CRITERIA_OPTIONS.map((criteria) => (
                            <button
                                key={criteria}
                                className={`${styles.chip} ${selectedCriteria.includes(criteria) ? styles.chipSelected : ''}`}
                                onClick={() => toggleCriteria(criteria)}
                            >
                                {criteria}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.btnText} onClick={onClose}>
                        Batal
                    </button>
                    <button className={styles.btnSecondary}>
                        Gunakan Segmen
                    </button>
                    <button
                        className={`${styles.btnPrimary} ${name ? styles.btnPrimaryActive : ''}`}
                        onClick={handleSave}
                        disabled={!name}
                    >
                        Simpan Segmen
                    </button>
                </div>
            </div>
        </div>
    );
}
