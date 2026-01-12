import { Users, TrendingUp, Target, DollarSign } from 'lucide-react';
import styles from './Analytics.module.css';

const iconMap = {
  totalLeads: Users,
  conversionRate: TrendingUp,
  cac: Target,
  roi: DollarSign,
};

const iconColorMap = {
  totalLeads: '#3B82F6',   // Blue
  conversionRate: '#10B981', // Green
  cac: '#A855F7',      // Purple
  roi: '#10B981', // Green
};

export default function AnalyticsStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    { key: 'totalLeads', label: 'Total Leads' },
    { key: 'conversionRate', label: 'Conversion Rate' },
    { key: 'cac', label: 'CAC' },
    { key: 'roi', label: 'ROI' },
  ];

  return (
    <div className={styles.statsGrid}>
      {statItems.map((item) => {
        const Icon = iconMap[item.key];
        const data = stats[item.key];
        const isPositive = data.change && data.change.startsWith('+');
        return (
          <div key={item.key} className={styles.statCard}>
            <div>
              <span className={styles.statLabel}>{item.label}</span>
              <span className={styles.statValue}>{data.value}</span>
              <span className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                {data.change}
              </span>
            </div>
            <div 
              className={styles.iconWrapper} 
              style={{ backgroundColor: 'white' }}
            >
              <Icon size={24} color={iconColorMap[item.key]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
