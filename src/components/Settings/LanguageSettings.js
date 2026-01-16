'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Settings.module.css';
import { useState } from 'react';

export default function LanguageSettings({ onSave }) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  const handleSave = () => {
    setLanguage(selectedLang);
    onSave();
  };

  return (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>{t.settings.language.title}</h3>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>{t.settings.language.interfaceLabel}</label>
        <select 
          className={styles.select}
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </select>
        <p className={styles.description}>
          {t.settings.language.description}
        </p>
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>
        {t.settings.language.save}
      </button>

      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
         <h3 className={styles.sectionTitle} style={{ fontSize: '1rem', marginBottom: '1rem' }}>Notifications</h3>
         <p style={{ fontSize: '0.875rem', color: '#64748B' }}>Notification settings coming soon.</p>
      </div>
    </div>
  );
}
