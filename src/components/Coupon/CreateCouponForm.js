'use client';

import styles from './Coupon.module.css';

export default function CreateCouponForm({ onSubmit, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formGrid}>
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label className={styles.label}>Kode Kupon *</label>
        <input 
          type="text" 
          defaultValue="ASTNEW50" 
          className={styles.input} 
          required 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tipe Diskon *</label>
        <select className={styles.select} required defaultValue="Persentase">
          <option value="Persentase">Persentase</option>
          <option value="Nominal">Nominal</option>
          <option value="Free Trial">Free Trial</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nilai *</label>
        <input 
          type="text" 
          defaultValue="50%" 
          className={styles.input} 
          required 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tanggal Mulai</label>
        <input 
          type="date" 
          className={styles.input} 
          placeholder="dd/mm/yyyy" 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tanggal Berakhir</label>
        <input 
          type="date" 
          className={styles.input} 
          placeholder="dd/mm/yyyy" 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Limit Pemakaian</label>
        <input 
          type="number" 
          defaultValue="1000" 
          className={styles.input} 
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Target Segmen</label>
        <select className={styles.select} defaultValue="Semua Merchant">
          <option value="Semua Merchant">Semua Merchant</option>
          <option value="Merchant Baru">Merchant Baru</option>
          <option value="Merchant Premium">Merchant Premium</option>
          <option value="Merchant Jakarta">Merchant Jakarta</option>
        </select>
      </div>

      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.btn} 
          onClick={onCancel}
        >
          Batal
        </button>
        <button 
          type="submit" 
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Buat Kupon
        </button>
      </div>
    </form>
  );
}
