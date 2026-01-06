import { BarChart2, Users, Target, Rocket } from 'lucide-react';
import styles from './CampaignDetail.module.css';

export default function CampaignStats({ stats }) {
    const statItems = [
        {
            id: 1,
            label: 'Impressions',
            value: stats.impressions,
            subtext: `CTR: ${stats.ctr}`,
            icon: BarChart2,
            trend: null
        },
        {
            id: 2,
            label: 'Leads',
            value: stats.leads,
            subtext: stats.leadsChange,
            icon: Users,
            trend: 'positive'
        },
        {
            id: 3,
            label: 'Conversions',
            value: stats.conversions,
            subtext: `CVR: ${stats.cvr}`,
            icon: Target,
            trend: null,
            iconColor: '#a855f7' // Purple
        },
        {
            id: 4,
            label: 'ROI',
            value: stats.roi,
            subtext: `CAC: ${stats.cac}`,
            icon: Rocket,
            trend: 'positive'
        }
    ];

    return (
        <div className={styles.statsGrid}>
            {statItems.map((item) => (
                <div key={item.id} className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div>
                            <div className={styles.statValue}>{item.value}</div>
                            <div className={styles.statLabel}>{item.label}</div>
                        </div>
                        <item.icon size={20} color={item.iconColor || '#0066ff'} />
                    </div>
                    <div className={`${styles.statSubtext} ${item.trend === 'positive' ? styles.trendPositive : ''}`}>
                        {item.subtext}
                    </div>
                </div>
            ))}
        </div>
    );
}
