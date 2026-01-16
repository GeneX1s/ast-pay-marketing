'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from '@/components/Settings/Settings.module.css';
import LanguageSettings from '@/components/Settings/LanguageSettings';
import MySubmissions from '@/components/Settings/MySubmissions';
import ActivityLog from '@/components/Settings/ActivityLog';
import Toast from '@/components/UI/Toast';

export default function SettingsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveSuccess = () => {
    setToastMessage(t.settings.language.success);
    setShowToast(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <LanguageSettings onSave={handleSaveSuccess} />;
      case 'submissions':
        return <MySubmissions />;
      case 'activity':
        return <ActivityLog />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>{t.settings.title}</h2>
        <p className={styles.subtitle}>{t.settings.subtitle}</p>
      </div>

      <div className={styles.tabsContainer}>
        <div 
          className={`${styles.tab} ${activeTab === 'account' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('account')}
        >
          {t.settings.tabs.account}
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'submissions' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          {t.settings.tabs.submissions}
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'activity' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          {t.settings.tabs.activity}
        </div>
      </div>

      {renderContent()}

      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}
