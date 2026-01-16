'use client';

import { useState } from 'react';
import { X, Upload, AlertTriangle } from 'lucide-react';
import styles from '@/components/Experiments/Experiments.module.css'; // Reusing modal container styles
import settingStyles from './Settings.module.css'; // Specific form styles

export default function SubmissionModal({ isOpen, onClose, onSubmit, onToast }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    merchantName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: ''
  });

  const [files, setFiles] = useState({
    ktp: null,
    kk: null,
    npwp: null,
    businessPhoto: null
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, fileName) => {
    // Simulate upload delay
    setTimeout(() => {
        setFiles(prev => ({ ...prev, [field]: true }));
        onToast(`${fileName} berhasil diunggah!`, 'success');
    }, 1000);
  };

  const isFormValid = formData.merchantName && formData.ownerName && formData.phone && formData.address && files.ktp && files.businessPhoto;

  const handleSubmit = () => {
    onSubmit(formData);
    // Reset form
    setFormData({ merchantName: '', ownerName: '', phone: '', email: '', address: '' });
    setFiles({ ktp: null, kk: null, npwp: null, businessPhoto: null });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '700px' }}>
        
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Tambah Pengajuan Baru</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={`${styles.modalBody} ${settingStyles.modalScroll}`}>
            <p className={settingStyles.description} style={{ marginBottom: '1.5rem' }}>
                Lengkapi informasi merchant dan unggah dokumen yang diperlukan.
            </p>

            <div className={settingStyles.modalColumns}>
                <div className={settingStyles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={settingStyles.label}>Nama Merchant <span className={settingStyles.requiredStar}>*</span></label>
                    <input 
                        type="text" 
                        className={settingStyles.searchInput} 
                        placeholder="Masukkan nama merchant"
                        value={formData.merchantName}
                        onChange={(e) => handleChange('merchantName', e.target.value)}
                    />
                </div>
                <div className={settingStyles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={settingStyles.label}>Nama Pemilik <span className={settingStyles.requiredStar}>*</span></label>
                    <input 
                        type="text" 
                        className={settingStyles.searchInput} 
                        placeholder="Masukkan nama pemilik"
                        value={formData.ownerName}
                        onChange={(e) => handleChange('ownerName', e.target.value)}
                    />
                </div>
            </div>

            <div className={settingStyles.modalColumns} style={{ marginTop: '1rem' }}>
                <div className={settingStyles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={settingStyles.label}>Nomor Telepon <span className={settingStyles.requiredStar}>*</span></label>
                    <input 
                        type="text" 
                        className={settingStyles.searchInput} 
                        placeholder="Masukkan nomor telepon"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </div>
                <div className={settingStyles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={settingStyles.label}>Email</label>
                    <input 
                        type="email" 
                        className={settingStyles.searchInput} 
                        placeholder="Masukkan email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>
            </div>

            <div className={settingStyles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={settingStyles.label}>Alamat <span className={settingStyles.requiredStar}>*</span></label>
                <input 
                    type="text" 
                    className={settingStyles.searchInput} 
                    placeholder="Masukkan alamat lengkap"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                />
            </div>

            <h4 className={styles.sectionTitle} style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Lampiran Dokumen</h4>

            {/* KTP */}
            <div className={settingStyles.formGroup}>
                <label className={settingStyles.uploadLabel}>Upload KTP <span className={settingStyles.requiredStar}>*</span></label>
                <div className={settingStyles.uploadBox} onClick={() => handleFileUpload('ktp', 'KTP')}>
                    <Upload size={24} className={settingStyles.uploadIcon} />
                    <div style={{ textAlign: 'center' }}>
                        <span className={settingStyles.uploadText}>
                            {files.ktp ? 'KTP Terunggah' : 'Klik untuk mengunggah'}
                        </span>
                        <div className={settingStyles.uploadSubtext}>PDF, JPG, PNG (Max. 5MB)</div>
                    </div>
                </div>
            </div>

             {/* KK */}
             <div className={settingStyles.formGroup}>
                <label className={settingStyles.uploadLabel}>Upload KK</label>
                <div className={settingStyles.uploadBox} onClick={() => handleFileUpload('kk', 'KK')}>
                    <Upload size={24} className={settingStyles.uploadIcon} />
                    <div style={{ textAlign: 'center' }}>
                        <span className={settingStyles.uploadText}>
                            {files.kk ? 'KK Terunggah' : 'Klik untuk mengunggah'}
                        </span>
                        <div className={settingStyles.uploadSubtext}>PDF, JPG, PNG (Max. 5MB)</div>
                    </div>
                </div>
            </div>

            {/* NPWP */}
            <div className={settingStyles.formGroup}>
                <label className={settingStyles.uploadLabel}>Upload NPWP</label>
                <div className={settingStyles.uploadBox} onClick={() => handleFileUpload('npwp', 'NPWP')}>
                    <Upload size={24} className={settingStyles.uploadIcon} />
                    <div style={{ textAlign: 'center' }}>
                        <span className={settingStyles.uploadText}>
                             {files.npwp ? 'NPWP Terunggah' : 'Klik untuk mengunggah'}
                        </span>
                        <div className={settingStyles.uploadSubtext}>PDF, JPG, PNG (Max. 5MB)</div>
                    </div>
                </div>
            </div>

            {/* Foto Tempat Usaha */}
            <div className={settingStyles.formGroup}>
                <label className={settingStyles.uploadLabel}>Upload Foto Tempat Usaha <span className={settingStyles.requiredStar}>*</span></label>
                <div className={settingStyles.uploadBox} onClick={() => handleFileUpload('businessPhoto', 'Foto Usaha')}>
                    <Upload size={24} className={settingStyles.uploadIcon} />
                    <div style={{ textAlign: 'center' }}>
                        <span className={settingStyles.uploadText}>
                             {files.businessPhoto ? 'Foto Terunggah' : 'Klik untuk mengunggah'}
                        </span>
                        <div className={settingStyles.uploadSubtext}>JPG, PNG (Max. 5MB)</div>
                    </div>
                </div>
            </div>

            <div className={settingStyles.alertBox}>
                <AlertTriangle size={16} />
                <span>KTP dan Foto Tempat Usaha wajib diunggah sebelum mengirim pengajuan</span>
            </div>

        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnSecondary} onClick={onClose}>Batal</button>
          <button 
            className={styles.btnPrimary} 
            onClick={handleSubmit} 
            disabled={!isFormValid}
          >
            Kirim Pengajuan
          </button>
        </div>
      </div>
    </div>
  );
}
