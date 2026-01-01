import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './CampaignList.module.css';

const campaigns = [
  {
    id: 1,
    title: 'Promo Akhir Tahun 2024',
    status: 'Aktif',
    statusType: 'active',
    stats: '1,213 prospek • 20% konversi • Rp 15M budget',
  },
  {
    id: 2,
    title: 'Campaign Merchant Baru',
    status: 'Aktif',
    statusType: 'active',
    stats: '632 prospek • 22% konversi • Rp 12M budget',
  },
  {
    id: 3,
    title: 'Referral Program Q4',
    status: 'Aktif',
    statusType: 'black',
    stats: '456 prospek • 17% konversi • Rp 8M budget',
  },
  {
    id: 4,
    title: 'Webinar Series Marketing',
    status: 'Selesai',
    statusType: 'gray',
    stats: '432 prospek • 15% konversi • Rp 5M budget',
  },
];

export default function CampaignList({ campaigns }) {
  if (!campaigns) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kampanye Teratas</h3>
        <Link href="/kampanye" className={styles.viewAll}>
          Lihat Semua
        </Link>
      </div>

      <div className={styles.list}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className={styles.item}>
            <div className={styles.content}>
              <div className={styles.topRow}>
                <span className={styles.campaignTitle}>{campaign.title}</span>
                <span className={`${styles.badge} ${styles[campaign.statusType]}`}>
                  {campaign.status}
                </span>
              </div>
              <div className={styles.stats}>
                {campaign.stats}
              </div>
            </div>
            <button className={styles.detailBtn}>
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
