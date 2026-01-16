'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { MoreVertical, FileText, Send, Eye, Download, Plus } from 'lucide-react';
import styles from './Settings.module.css';
import { useState, useRef, useEffect } from 'react';
import SubmissionModal from './SubmissionModal';
import SubmissionSidebar from './SubmissionSidebar';
import ImagePreviewModal from './ImagePreviewModal';
import SuccessModal from '@/components/UI/SuccessModal';
import Toast from '@/components/UI/Toast';

export default function MySubmissions() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState([
    { id: 'SUB-001', merchant: 'Warung Makan Sejahtera', owner: 'Budi Santoso', phone: '081234567890', date: '2026-01-10', status: 'Needs Verification' },
    { id: 'SUB-002', merchant: 'Toko Elektronik Jaya', owner: 'Siti Aminah', phone: '082345678001', date: '2026-01-09', status: 'Accepted' },
    { id: 'SUB-003', merchant: 'Kedai Kopi Nusantara', owner: 'Ahmad Yani', phone: '083456789012', date: '2026-01-08', status: 'Approved' },
  ]);

  // Sidebar & Preview State
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [sidebarMode, setSidebarMode] = useState('view'); // 'edit' or 'view'
  const [openActionId, setOpenActionId] = useState(null); // For dropdown
  const [previewFile, setPreviewFile] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenActionId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSubmit = (data) => {
    const newSubmission = {
        id: `SUB-00${submissions.length + 1}`,
        merchant: data.merchantName,
        owner: data.ownerName,
        phone: data.phone,
        date: new Date().toISOString().split('T')[0],
        status: 'Needs Verification'
    };
    
    setSubmissions([newSubmission, ...submissions]);
    setIsModalOpen(false);
    handleToast('Pengajuan berhasil dikirim');
  };

  const handleActionClick = (e, id) => {
      e.stopPropagation();
      setOpenActionId(openActionId === id ? null : id);
  };

  const handleEdit = (sub) => {
      setSelectedSubmission(sub);
      setSidebarMode('edit');
      setOpenActionId(null);
  };

  const handleView = (sub) => {
      setSelectedSubmission(sub);
      setSidebarMode('view');
      setOpenActionId(null);
  };

  const handleResend = () => {
      setOpenActionId(null);
      handleToast('Permintaan kirim ulang berhasil dikirim');
  };
  
  const handleDownload = () => {
      setOpenActionId(null);
      setIsSuccessModalOpen(true);
  };

  const handleSidebarSave = () => {
      setSelectedSubmission(null);
      handleToast('Perubahan berhasil disimpan');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Needs Verification': return <span className={`${styles.statusBadge} ${styles.statusWarning}`}>{t.settings.submissions.actions.needsVerification}</span>;
      case 'Accepted': return <span className={`${styles.statusBadge} ${styles.statusInfo}`}>Diterima</span>;
      case 'Approved': return <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Disetujui</span>;
      default: return null;
    }
  };

  const renderActions = (sub) => {
    return (
        <div className={styles.actionWrapper}>
            <button className={styles.actionBtn} onClick={(e) => handleActionClick(e, sub.id)}>
                Aksi <MoreVertical size={16} />
            </button>
            {openActionId === sub.id && (
                <div className={styles.actionMenu}>
                    {sub.status === 'Needs Verification' && (
                        <>
                            <button className={styles.actionMenuItem} onClick={() => handleEdit(sub)}>
                                Lengkapi Dokumen
                            </button>
                            <button className={styles.actionMenuItem} onClick={handleResend}>
                                Kirim Ulang
                            </button>
                        </>
                    )}
                    {(sub.status === 'Accepted' || sub.status === 'Approved') && (
                        <button className={styles.actionMenuItem} onClick={() => handleView(sub)}>
                            Lihat Detail
                        </button>
                    )}
                    {sub.status === 'Approved' && (
                        <button className={styles.actionMenuItem} onClick={handleDownload}>
                            Unduh Ringkasan
                        </button>
                    )}
                </div>
            )}
        </div>
    );
  };

  return (
    <div className={styles.settingsSection}>
      <div className={styles.toolbar}>
        <div>
          <h3 className={styles.sectionTitle}>{t.settings.submissions.title}</h3>
          <p className={styles.subtitle}>{t.settings.submissions.subtitle}</p>
        </div>
        <button className={styles.saveBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={16} style={{ marginRight: '8px' }}/> Tambah Pengajuan Baru
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t.settings.submissions.table.id}</th>
              <th>{t.settings.submissions.table.merchant}</th>
              <th>{t.settings.submissions.table.owner}</th>
              <th>{t.settings.submissions.table.phone}</th>
              <th>{t.settings.submissions.table.date}</th>
              <th>{t.settings.submissions.table.status}</th>
              <th>{t.settings.submissions.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td style={{ fontWeight: 500 }}>{sub.merchant}</td>
                <td>{sub.owner}</td>
                <td>{sub.phone}</td>
                <td>{sub.date}</td>
                <td>{getStatusBadge(sub.status)}</td>
                <td>{renderActions(sub)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        onToast={handleToast}
      />

      <SubmissionSidebar
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        submission={selectedSubmission}
        mode={sidebarMode}
        onSave={handleSidebarSave}
        onPreview={setPreviewFile}
      />

      <ImagePreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        fileName={previewFile}
      />

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Berhasil!"
        message="Ringkasan pengajuan berhasil diunduh."
      />

      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}
