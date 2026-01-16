'use client';

import { X } from 'lucide-react';
import styles from './Settings.module.css';

export default function ImagePreviewModal({ isOpen, onClose, imageSrc, fileName }) {
  if (!isOpen) return null;

  return (
    <div className={styles.sidebarOverlay} style={{ zIndex: 100 }}>
      {/* Centered Modal for Preview */}
      <div 
        style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            zIndex: 101,
            animation: 'fadeIn 0.2s'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A' }}>Preview Dokumen</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{fileName}</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
            </button>
        </div>

        <div style={{ 
            backgroundColor: '#F8FAFC', 
            borderRadius: '8px', 
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px'
        }}>
            {/* Placeholder for preview since we don't have real files */}
             <div style={{ textAlign: 'center', color: '#64748B' }}>
                <p>Preview file: {fileName}</p>
                {/* <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%', borderRadius: '4px' }} /> */}
            </div>
        </div>
      </div>
    </div>
  );
}
