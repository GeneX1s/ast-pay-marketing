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

export default function Dashboard() {
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
        <StatCard 
          icon={Users}
          label="Prospek"
          value="2,845"
          trend="up"
          trendValue="+12.5%"
          subLabel="Prospek"
        />
        <StatCard 
          icon={UserPlus}
          label="Pendaftar"
          value="1,234"
          trend="up"
          trendValue="+8.2%"
          subLabel="Pendaftar"
        />
        <StatCard 
          icon={Store}
          label="Merchant Aktif"
          value="567"
          trend="up"
          trendValue="+15.3%"
          subLabel="Merchant Aktif"
        />
        <StatCard 
          icon={TrendingUp}
          label="Konversi Berbayar"
          value="23.4%"
          trend="up"
          trendValue="+2.1%"
          subLabel="Konversi Berbayar"
        />
        <StatCard 
          icon={DollarSign}
          label="Pendapatan Teratribusi"
          value="Rp 45.2M"
          trend="up"
          trendValue="+18.7%"
          subLabel="Pendapatan Teratribusi"
        />
        <StatCard 
          icon={Target}
          label="CAC"
          value="Rp 125K"
          trend="down"
          trendValue="-5.3%"
          subLabel="CAC"
        />
        <StatCard 
          icon={BarChart}
          label="ROI/ROAS"
          value="4.2x"
          trend="up"
          trendValue="+0.8x"
          subLabel="ROI/ROAS"
        />
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
      
      <CampaignList />
    </div>
  );
}
