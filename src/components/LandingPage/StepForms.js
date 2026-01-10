'use client';

import styles from './LandingPage.module.css';

export function BasicInfoStep({ formData, handleChange }) {
  return (
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Judul Halaman</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Contoh: Daftar Gratis dan Mulai Terima Pembayaran Digital"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Deskripsi</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea} 
          placeholder="Bergabung dengan ribuan merchant yang sudah menggunakan AST PAY..."
        />
      </div>

       <div className={styles.formGroup}>
        <label className={styles.label}>CTA Button Text</label>
        <input 
          type="text" 
          name="ctaText"
          value={formData.ctaText}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Daftar Sekarang"
        />
      </div>
    </div>
  );
}

export function ContentStep({ formData, handleChange }) {
  // Assuming Content Step matches the "Konten" tab from screenshot which seems to be similar fields or maybe rich text.
  // Based on screenshot "Informasi Dasar" has Title. Let's adjust based on the 3rd image provided.
  // 3rd Image "Konten" shows: Judul Halaman, Deskripsi, CTA Button Text.
  // Wait, the 2nd image "Informasi Dasar" shows: Nama Landing Page, Tujuan.
  
  // RE-MAPPING based on images:
  // Step 1 (Informasi Dasar): Nama Landing Page, Tujuan.
  // Step 2 (Konten): Judul Halaman, Deskripsi, CTA Button Text.
  
  return (
    <div className={styles.formGrid}>
       <div className={styles.formGroup}>
        <label className={styles.label}>Judul Halaman</label>
        <input 
          type="text" 
          name="pageTitle"
          value={formData.pageTitle}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Masukkan judul halaman yang akan tampil..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Deskripsi</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea} 
          placeholder="Deskripsi singkat konten landing page..."
        />
      </div>
      
       <div className={styles.formGroup}>
        <label className={styles.label}>CTA Button Text</label>
        <input 
          type="text" 
          name="ctaText"
          value={formData.ctaText}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Contoh: Daftar Sekarang"
        />
      </div>
    </div>
  );
}

// Correcting BasicInfoStep based on new understanding of 2nd image
export function RealBasicInfoStep({ formData, handleChange }) {
  return (
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Nama Landing Page *</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Contoh: Daftar Gratis AST PAY"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tujuan</label>
        <input 
          type="text" 
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className={styles.input} 
          placeholder="Contoh: Sign Up, Event Registration, etc"
        />
      </div>
    </div>
  );
}

export function FormUtmStep({ formData, handleChange, toggleField }) {
  const availableFields = [
    'Nama', 'Email', 'Nomor HP', 'Nama Usaha', 'Perusahaan',
    'Jabatan', 'Kota', 'Alamat', 'Jadwal Demo', 'Pesan'
  ];

  return (
    <div className={styles.formGrid}>
      <div>
        <label className={styles.label} style={{ marginBottom: '0.75rem', display: 'block' }}>Field Form</label>
        <p className={styles.helperText} style={{ marginBottom: '1rem' }}>Pilih field yang ingin ditampilkan di form</p>
        <div className={styles.pillsContainer}>
          {availableFields.map((field) => (
            <div 
              key={field}
              className={`${styles.pill} ${formData.selectedFields.includes(field) ? styles.selected : ''}`}
              onClick={() => toggleField(field)}
            >
              {field}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.utmSection}>
        <label className={styles.utmTitle}>UTM Tracking</label>
        <div className={styles.utmGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '0.75rem' }}>utm_source</label>
            <input 
              type="text" 
              name="utmSource"
              value={formData.utmSource}
              onChange={handleChange}
              className={styles.input} 
              placeholder="google"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '0.75rem' }}>utm_medium</label>
            <input 
              type="text" 
              name="utmMedium"
              value={formData.utmMedium}
              onChange={handleChange}
              className={styles.input} 
              placeholder="cpc"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{ fontSize: '0.75rem' }}>utm_campaign</label>
            <input 
              type="text" 
              name="utmCampaign"
              value={formData.utmCampaign}
              onChange={handleChange}
              className={styles.input} 
              placeholder="promo-akhir-tahun"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
