import styles from './Experiments.module.css';
import { Beaker, Play, Trophy, TrendingUp } from 'lucide-react';

export default function ExperimentStats({ stats }) {
  if (!stats) return null;

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Total Eksperimen</span>
          <span className={styles.statValue}>{stats.total}</span>
        </div>
        <div className={styles.statIcon} style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
          <Beaker size={24} />
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Berjalan</span>
          <span className={styles.statValue}>{stats.running}</span>
        </div>
         <div className={styles.statIcon} style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
          <Play size={24} />
        </div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Selesai</span>
          <span className={styles.statValue}>{stats.finished}</span>
        </div>
         <div className={styles.statIcon} style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
          <Trophy size={24} />
        </div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Avg. Uplift</span>
          <span className={styles.statValue} style={{ color: '#7C3AED' }}>{stats.avgUplift}</span>
        </div>
         <div className={styles.statIcon} style={{ backgroundColor: '#F3E8FF', color: '#7C3AED' }}>
          <TrendingUp size={24} />
        </div>
      </div>
    </div>
  );
}
