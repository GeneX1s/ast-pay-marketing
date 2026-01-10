import { FileText, TrendingUp, Users, RefreshCw } from 'lucide-react';
import styles from './LandingPage.module.css';

const iconMap = {
  totalPages: FileText,
  active: TrendingUp,
  totalLeads: Users,
  conversionRate: RefreshCw,
};

const iconColorMap = {
  totalPages: '#3B82F6', // Blue
  active: '#10B981', // Green
  totalLeads: '#8B5CF6', // Purple
  conversionRate: '#F59E0B', // Orange
};

export default function LandingPageStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    { key: 'totalPages', label: 'Total Pages', value: stats.totalPages },
    { key: 'active', label: 'Aktif', value: stats.active },
    { key: 'totalLeads', label: 'Total Leads', value: stats.totalLeads },
    { key: 'conversionRate', label: 'Conversion Rate', value: stats.conversionRate },
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
