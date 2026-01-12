'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Download, Calendar } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import AnalyticsStats from '@/components/Analytics/AnalyticsStats';
import TopCampaigns from '@/components/Analytics/TopCampaigns';
import ConversionTrendChart from '@/components/Analytics/ConversionTrendChart';
import ConversionFunnel from '@/components/Analytics/ConversionFunnel';
import ScheduleReportModal from '@/components/Analytics/ScheduleReportModal';
import Toast from '@/components/UI/Toast';
import ChannelTab from '@/components/Analytics/ChannelTab';
import CampaignTab from '@/components/Analytics/CampaignTab';
import CohortTab from '@/components/Analytics/CohortTab';
import AttributionTab from '@/components/Analytics/AttributionTab';
import styles from '@/components/Analytics/Analytics.module.css';

export default function AnalyticsPage() {
  const { data, error, isLoading } = useSWR('/api/analytics', fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');

  const handleDownload = () => {
    // Simulate download delay
    setTimeout(() => {
      setToastMessage('Laporan CSV berhasil diunduh');
      setShowToast(true);
      
      // Dummy CSV download
      const csvContent = "data:text/csv;charset=utf-8,Date,Leads,Conversion\n2024-12-01,120,40";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "analitik.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500); 
  };

  const handleScheduleSuccess = () => {
    setToastMessage('Laporan terjadwal berhasil dibuat');
    setShowToast(true);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Channel':
        return <ChannelTab data={data.channelData} />;
      case 'Kampanye':
        return <CampaignTab data={data.campaignFullData} />;
      case 'Cohort':
        return <CohortTab data={data.cohortData} />;
      case 'Atribusi':
        return <AttributionTab data={data.attributionData} />;
      case 'Overview':
      default:
        return (
          <>
            <ConversionTrendChart data={data.trend} />
            <div className={styles.bottomGrid}>
              <ConversionFunnel data={data.funnel} />
              <TopCampaigns campaigns={data.campaigns} />
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Analitik & Atribusi</h2>
          <p className={styles.subtitle}>Analisis performa marketing dan atribusi konversi</p>
        </div>
        <div className={styles.actions}>
           <button className={styles.btn} onClick={handleDownload}>
            <Download size={18} />
            Unduh CSV
          </button>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar size={18} />
            Jadwalkan Laporan
          </button>
        </div>
      </div>

      <AnalyticsStats stats={data.stats} />

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {['Overview', 'Channel', 'Kampanye', 'Cohort', 'Atribusi'].map(tab => (
          <div 
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {renderTabContent()}

      <ScheduleReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleScheduleSuccess}
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
