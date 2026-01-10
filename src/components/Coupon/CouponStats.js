import { Tag, TrendingUp, Users, Calendar } from 'lucide-react';
import styles from './Coupon.module.css';

const iconMap = {
  total: Tag,
  active: TrendingUp,
  usage: Users,
  scheduled: Calendar,
};

const colorMap = {
  total: '#E0E7FF', // Indigo
  active: '#DCFCE7', // Green
  usage: '#F3E8FF', // Purple
  scheduled: '#DBEAFE', // Blue
};

const iconColorMap = {
  total: '#4F46E5',
  active: '#166534',
  usage: '#9333EA',
  scheduled: '#1E40AF',
};

export default function CouponStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    { key: 'total', label: 'Total Kupon', value: stats.total },
    { key: 'active', label: 'Aktif', value: stats.active },
    { key: 'usage', label: 'Total Pemakaian', value: stats.usage },
    { key: 'scheduled', label: 'Terjadwal', value: stats.scheduled },
  ];

  return (
    <div className={styles.statsGrid}>
      {statItems.map((item) => {
        const Icon = iconMap[item.key];
        return (
          <div key={item.key} className={styles.statCard}>
            <div>
              <span className={styles.statLabel}>{item.label}</span>
              <span className={styles.statValue}>{item.value}</span>
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
