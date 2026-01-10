'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Plus, Download } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import ReferralStats from '@/components/Referral/ReferralStats';
import ReferralTable from '@/components/Referral/ReferralTable';
import AddPartnerModal from '@/components/Referral/AddPartnerModal';
import Toast from '@/components/UI/Toast';
import styles from '@/components/Referral/Referral.module.css';

export default function ReferralPage() {
  const { data, error, isLoading } = useSWR('/api/referral', fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDownload = () => {
    // Simulate download delay
    setTimeout(() => {
      setToastMessage('Rekap partner berhasil diunduh');
      setShowToast(true);
      // Logic for actual download would go here
    }, 1500); // 1.5s delay to make it feel real
  };

  const handleAddPartnerSuccess = () => {
    setToastMessage('Partner berhasil ditambahkan');
    setShowToast(true);
    // In real app, revalidate/mutate SWR data here
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Referral & Partner</h2>
          <p className={styles.subtitle}>Kelola program referral dan kemitraan</p>
        </div>
        <div className={styles.actions}>
           <button className={styles.btn} onClick={handleDownload}>
            <Download size={18} />
            Unduh Rekap
          </button>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            Tambah Partner
          </button>
        </div>
      </div>

      <ReferralStats stats={data.stats} />
      <ReferralTable partners={data.partners} />

      <AddPartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddPartnerSuccess}
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
