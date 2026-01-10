import { Users, TrendingUp, Link as LinkIcon, DollarSign } from 'lucide-react';
import styles from './Referral.module.css';

const iconMap = {
  totalPartners: Users,
  totalLeads: TrendingUp, // Using TrendingUp as proxy for "Chart" icon in screenshot
  activation: LinkIcon,   // Using Link for "Aktivasi" (Chain icon)
  totalCommission: DollarSign,
};

const iconColorMap = {
  totalPartners: '#3B82F6',   // Blue
  totalLeads: '#10B981',      // Green
  activation: '#A855F7',      // Purple
  totalCommission: '#10B981', // Green
};

export default function ReferralStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    { key: 'totalPartners', label: 'Total Partner', value: stats.totalPartners },
    { key: 'totalLeads', label: 'Total Leads', value: stats.totalLeads },
    { key: 'activation', label: 'Aktivasi', value: stats.activation },
    { key: 'totalCommission', label: 'Total Komisi', value: stats.totalCommission },
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
