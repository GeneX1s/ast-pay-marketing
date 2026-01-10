'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Download, Plus } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import CouponStats from '@/components/Coupon/CouponStats';
import CouponTable from '@/components/Coupon/CouponTable';
import Modal from '@/components/UI/Modal';
import Toast from '@/components/UI/Toast';
import CreateCouponForm from '@/components/Coupon/CreateCouponForm';
import styles from '@/components/Coupon/Coupon.module.css';

export default function KuponPage() {
  const { data, error, isLoading } = useSWR('/api/coupons', fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    // Simulate download delay
    setTimeout(() => {
      setShowToast(true);
      // Create a dummy CSV file download
      const csvContent = "data:text/csv;charset=utf-8,Kode,Tipe,Nilai\nASTNEW50,Persentase,50%";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "laporan_kupon.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 3000);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Penawaran & Kupon</h2>
          <p className={styles.subtitle}>Buat dan kelola kupon dan penawaran marketing</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={handleDownload}>
            <Download size={18} />
            Unduh Laporan CSV
          </button>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            Buat Kupon
          </button>
        </div>
      </div>

      <CouponStats stats={data.stats} />
      <CouponTable coupons={data.coupons} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Buat Kupon Baru"
      >
        <CreateCouponForm 
          onSubmit={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {showToast && (
        <Toast 
          message="Laporan CSV berhasil diunduh" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}
