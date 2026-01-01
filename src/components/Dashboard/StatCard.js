import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './StatCard.module.css';

export default function StatCard({ icon: Icon, label, value, trend, trendValue, subLabel }) {
  const isPositive = trend === 'up';
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Icon size={20} className={styles.icon} />
        </div>
        <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trendValue}</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.value}>{value}</h3>
        <p className={styles.label}>{label}</p>
        {subLabel && <p className={styles.subLabel}>{subLabel}</p>}
      </div>
    </div>
  );
}
