'use client';

import { X, Eye, RefreshCw, Trash2, Upload, FileText } from 'lucide-react';
import styles from './Settings.module.css';

export default function SubmissionSidebar({ isOpen, onClose, submission, mode, onSave, onPreview }) {
  if (!isOpen || !submission) return null;

  // Mock Data for "Existing Files"
  const existingDocs = {
    ktp: 'KTP_Budi.pdf',
    kk: null,
    npwp: null,
    businessPhoto: 'Warung_Photo.jpg'
  };

  return (
    <>
      <div className={styles.sidebarOverlay} onClick={onClose} />
      <div className={styles.sidebar}>
        
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>
             {mode === 'edit' ? 'Lengkapi Dokumen' : 'Detail Pengajuan'}
          </h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={onClose}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <div className={styles.sidebarContent}>
             <div style={{ marginBottom: '1.5rem' }}>
                 <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                     {submission.id}
                 </p>
                 
                 <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Nama Merchant</span>
                    <span className={styles.detailValue}>{submission.merchant}</span>
                 </div>
                 <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Nama Pemilik</span>
                    <span className={styles.detailValue}>{submission.owner}</span>
                 </div>
                 <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Telepon</span>
                    <span className={styles.detailValue}>{submission.phone}</span>
                 </div>
                 
                 {mode === 'view' && (
                    <>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Email</span>
                            <span className={styles.detailValue}>budi@email.com</span>
                        </div>
                         <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Alamat</span>
                            <span className={styles.detailValue} style={{ maxWidth: '200px', textAlign: 'right' }}>Jl. Sudirman No. 123, Jakarta Pusat</span>
                        </div>
                        <div className={styles.detailRow} style={{ borderBottom: 'none' }}>
                            <span className={styles.detailLabel}>Status</span>
                            <span className={`${styles.statusBadge} ${styles.statusInfo}`}>
                                {submission.status === 'Accepted' ? 'Diterima' : 'Disetujui'}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Tanggal Pengajuan</span>
                            <span className={styles.detailValue}>{submission.date}</span>
                        </div>
                    </>
                 )}
             </div>

             <h4 className={styles.sectionTitle} style={{ fontSize: '1rem', marginBottom: '1rem' }}>Dokumen</h4>

             {/* KTP */}
             {mode === 'edit' ? (
                <div className={styles.docCallbackBox}>
                    <div className={styles.docHeader}>
                        <span className={styles.docTitle}>Upload KTP <span className={styles.requiredStar}>*</span></span>
                    </div>
                    {existingDocs.ktp ? (
                         <div className={styles.docFile}>
                             <FileText size={16} color="#3B82F6"/>
                             <span>{existingDocs.ktp}</span>
                         </div>
                    ) : (
                         <div className={styles.uploadBox} style={{ padding: '1rem' }}>
                            <Upload size={20} className={styles.uploadIcon} />
                            <span className={styles.uploadText} style={{ fontSize: '0.75rem' }}>Klik untuk mengunggah</span>
                         </div>
                    )}
                    
                    {existingDocs.ktp && (
                        <div className={styles.docActions}>
                            <button className={styles.docActionBtn} onClick={() => onPreview(existingDocs.ktp)}>
                                <Eye size={16} className={styles.btnView}/> <span className={styles.btnView}>Lihat</span>
                            </button>
                            <button className={styles.docActionBtn}>
                                <RefreshCw size={16} className={styles.btnChange}/> <span className={styles.btnChange}>Ganti</span>
                            </button>
                             <button className={styles.docActionBtn}>
                                <Trash2 size={16} className={styles.btnDelete}/> <span className={styles.btnDelete}>Hapus</span>
                            </button>
                        </div>
                    )}
                </div>
             ) : (
                 // View Mode Doc Item
                 <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>KTP: {existingDocs.ktp}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onPreview(existingDocs.ktp)}>
                         <Eye size={16} color="#64748B" />
                    </button>
                 </div>
             )}

             {/* Photo */}
             {mode === 'edit' ? (
                 <div className={styles.docCallbackBox}>
                     <div className={styles.docHeader}>
                        <span className={styles.docTitle}>Upload Foto Tempat Usaha <span className={styles.requiredStar}>*</span></span>
                    </div>
                     <div className={styles.docFile}>
                             <FileText size={16} color="#3B82F6"/>
                             <span>{existingDocs.businessPhoto}</span>
                    </div>
                    <div className={styles.docActions}>
                          <button className={styles.docActionBtn} onClick={() => onPreview(existingDocs.businessPhoto)}>
                                <Eye size={16} className={styles.btnView}/> <span className={styles.btnView}>Lihat</span>
                            </button>
                             <button className={styles.docActionBtn}>
                                <RefreshCw size={16} className={styles.btnChange}/> <span className={styles.btnChange}>Ganti</span>
                            </button>
                    </div>
                 </div>
             ) : (
                 <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Foto Tempat: {existingDocs.businessPhoto}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onPreview(existingDocs.businessPhoto)}>
                         <Eye size={16} color="#64748B" />
                    </button>
                 </div>
             )}

            {mode === 'edit' && (
                <div style={{ marginTop: '1rem' }}>
                    <div className={styles.uploadBox} style={{ padding: '1rem' }}>
                        <Upload size={20} className={styles.uploadIcon} />
                        <span className={styles.uploadText} style={{ fontSize: '0.75rem' }}>Upload KK</span>
                    </div>
                     <div className={styles.uploadBox} style={{ padding: '1rem', marginTop: '1rem' }}>
                        <Upload size={20} className={styles.uploadIcon} />
                        <span className={styles.uploadText} style={{ fontSize: '0.75rem' }}>Upload NPWP</span>
                    </div>
                </div>
            )}

        </div>

        {mode === 'edit' && (
            <div className={styles.sidebarFooter}>
                <button className={styles.btnPrimary} onClick={onSave} style={{ width: '100%' }}>
                    Simpan Perubahan
                </button>
            </div>
        )}
      </div>
    </>
  );
}
