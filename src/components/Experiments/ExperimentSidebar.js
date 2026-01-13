import styles from './Experiments.module.css';
import { X, Trophy, AlertTriangle } from 'lucide-react';

export default function ExperimentSidebar({ experiment, onClose }) {
  if (!experiment) return null;

  // Determine winner
  const winner = experiment.variants.find(v => v.isWinner);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div>
             <h3 className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>Detail Eksperimen</h3>
             <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem' }}>
               {experiment.name}
             </div>
              <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
               {experiment.target}
             </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.sidebarContent}>
           <div className={styles.detailSection}>
             <h4 className={styles.sectionLabel}>Status</h4>
             <span className={`${styles.statusBadge} ${styles['status' + experiment.status]}`}>
                  {experiment.status}
             </span>
           </div>

           <div className={styles.dateGrid}>
              <div className={styles.dateItem}>
                 <span className={styles.sectionLabel}>Tanggal Mulai</span>
                 <span className={styles.dateValue}>{experiment.startDate || '-'}</span>
              </div>
               <div className={styles.dateItem}>
                 <span className={styles.sectionLabel}>Tanggal Berakhir</span>
                 <span className={styles.dateValue}>{experiment.endDate || '-'}</span>
              </div>
           </div>

           <h4 className={styles.sectionLabel} style={{ marginBottom: '1rem' }}>Perbandingan Varian</h4>
           <div className={styles.variantGrid}>
              {experiment.variants.map((variant, index) => (
                <div key={index} className={styles.variantCard}>
                   {variant.isWinner && (
                     <div className={styles.winnerBadge}>
                       <Trophy size={14} /> Pemenang
                     </div>
                   )}
                   <span className={styles.variantName}>{variant.name.split(':')[0]}</span>
                   <span className={styles.variantSub}>{variant.name.split(':')[1]}</span>
                   
                   <div className={styles.variantStat}>
                      <span className={styles.statSmallLabel}>Impressions</span>
                      <span className={styles.statSmallValue}>{variant.impressions.toLocaleString()}</span>
                   </div>

                   <div className={styles.variantStat}>
                      <span className={styles.statSmallLabel}>Conversions</span>
                      <span className={styles.statSmallValue}>{variant.conversions.toLocaleString()}</span>
                   </div>

                   <div>
                      <span className={styles.statSmallLabel}>CTR</span>
                      <span className={`${styles.statSmallValue} ${styles.ctrValue}`}>{variant.ctr}</span>
                   </div>
                </div>
              ))}
           </div>

           {winner && (
             <div className={styles.winnerBox}>
                <div className={styles.winnerBoxTitle}>
                  <Trophy size={18} /> Hasil Eksperimen
                </div>
                <p className={styles.winnerBoxText}>
                  Varian B menang dengan peningkatan <strong>+19.7% CTR</strong> dibandingkan Varian A based on 95% statistical significance.
                </p>
             </div>
           )}

           {!winner && experiment.status === 'Berjalan' && (
              <div className={styles.winnerBox} style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }}>
                 <div className={styles.winnerBoxTitle} style={{ color: '#0284C7' }}>
                    <AlertTriangle size={18} /> Eksperimen Sedang Berjalan
                 </div>
                 <p className={styles.winnerBoxText} style={{ color: '#0369A1' }}>
                    Data belum cukup konklusif untuk menentukan pemenang. Estimasi 3 hari lagi.
                 </p>
              </div>
           )}
        </div>
      </div>
    </>
  );
}
