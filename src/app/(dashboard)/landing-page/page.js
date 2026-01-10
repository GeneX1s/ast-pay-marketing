'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Plus } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import LandingPageStats from '@/components/LandingPage/LandingPageStats';
import LandingPageTable from '@/components/LandingPage/LandingPageTable';
import CreateLandingPageModal from '@/components/LandingPage/CreateLandingPageModal';
import Toast from '@/components/UI/Toast';
import styles from '@/components/LandingPage/LandingPage.module.css';

export default function LandingPage() {
  const { data, error, isLoading } = useSWR('/api/landing-pages', fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSuccess = (type = 'publish') => {
    if (type === 'draft') {
      setToastMessage('Landing page berhasil disimpan sebagai draft');
    } else {
      setToastMessage('Landing page berhasil dipublikasikan');
    }
    setShowToast(true);
    // In a real app, we would revalidate the SWR data here
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Landing Page & Form</h2>
          <p className={styles.subtitle}>Buat dan kelola landing page untuk kampanye marketing</p>
        </div>
        <button 
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Buat Landing Page
        </button>
      </div>

      <LandingPageStats stats={data.stats} />
      <LandingPageTable pages={data.landingPages} />

      <CreateLandingPageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
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
