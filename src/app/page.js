'use client';

import useSWR from 'swr';
import { 
  Users, 
  UserPlus, 
  Store, 
  TrendingUp, 
  DollarSign, 
  Target, 
  BarChart 
} from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import FunnelChart from '@/components/Dashboard/FunnelChart';
import CampaignList from '@/components/Dashboard/CampaignList';
import styles from '../components/Dashboard/Dashboard.module.css';
import { fetcher } from '@/utils/fetcher';

const iconMap = {
  Users,
  UserPlus,
  Store,
  TrendingUp,
  DollarSign,
  Target,
  BarChart,
};

export default function Dashboard() {
  const { data, error, isLoading } = useSWR('/api/dashboard', fetcher);

  if (error) return <div className={styles.wrapper}>Failed to load</div>;
  if (isLoading) return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.subtitle}>Ringkasan performa marketing</p>
        </div>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>+ Buat Kampanye</button>
          <button className={styles.btn}>Buat Kupon</button>
          <button className={styles.btn}>Impor Prospek</button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {data.stats.map((stat) => {
          const IconComponent = iconMap[stat.icon];
          return (
            <StatCard 
              key={stat.id}
              icon={IconComponent}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendValue={stat.trendValue}
              subLabel={stat.subLabel}
            />
          );
        })}
      </div>

      <div className={styles.chartsGrid}>
        <FunnelChart />
        <div className={styles.trendContainer}>
          <h3 className={styles.chartTitle}>Tren 30 Hari Terakhir</h3>
          <div className={styles.placeholderChart}>
            <p>Grafik tren akan ditampilkan di sini</p>
            {/* Simple SVG Line Placeholder */}
             <svg viewBox="0 0 500 150" className={styles.svgChart}>
                <polyline 
                   points="0,150 50,120 100,130 150,80 200,90 250,50 300,70 350,40 400,60 450,20 500,50"
                   fill="none"
                   stroke="#0066FF"
                   strokeWidth="3"
                />
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                </linearGradient>
                <polygon 
                   points="0,150 50,120 100,130 150,80 200,90 250,50 300,70 350,40 400,60 450,20 500,50 500,150"
                   fill="url(#gradient)"
                />
             </svg>
          </div>
        </div>
      </div>
      
      <CampaignList campaigns={data.topCampaigns} />
    </div>
  );
}
