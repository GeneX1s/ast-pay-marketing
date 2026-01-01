import { Eye, Pause, Play, XCircle } from 'lucide-react';
import styles from './Campaign.module.css';

const campaigns = [
  {
    id: 1,
    name: 'Promo Akhir Tahun 2024',
    channel: 'Email + Social',
    audience: '5.234',
    leads: '1243',
    conversion: '28%',
    cost: 'Rp 15M',
    status: 'Aktif',
    statusType: 'active',
  },
  {
    id: 2,
    name: 'Campaign Merchant Baru',
    channel: 'Ads + Email',
    audience: '3.892',
    leads: '892',
    conversion: '22%',
    cost: 'Rp 12M',
    status: 'Aktif',
    statusType: 'active',
  },
  {
    id: 3,
    name: 'Referral Program Q4',
    channel: 'Referral',
    audience: '2.654',
    leads: '654',
    conversion: '31%',
    cost: 'Rp 8M',
    status: 'Aktif',
    statusType: 'active',
  },
  {
    id: 4,
    name: 'Webinar Series Marketing',
    channel: 'Email + Webinar',
    audience: '1.432',
    leads: '432',
    conversion: '19%',
    cost: 'Rp 5M',
    status: 'Jeda',
    statusType: 'paused',
  },
];

export default function CampaignTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama Kampanye</th>
            <th>Channel</th>
            <th>Audiens</th>
            <th>Leads</th>
            <th>Konversi</th>
            <th>Pengeluaran</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((row) => (
            <tr key={row.id}>
              <td className={styles.campaignName}>{row.name}</td>
              <td>{row.channel}</td>
              <td>{row.audience}</td>
              <td>{row.leads}</td>
              <td>{row.conversion}</td>
              <td>{row.cost}</td>
              <td>
                <span className={`${styles.badge} ${styles[row.statusType]}`}>
                  {row.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionBtn}>
                    <Eye className={styles.icon} />
                    Lihat Detail
                  </button>
                  {row.statusType === 'paused' ? (
                       <button className={styles.actionBtn}>
                        <Play className={styles.icon} />
                        Aktifkan
                      </button>
                  ) : (
                      <button className={styles.actionBtn}>
                        <Pause className={styles.icon} />
                        Jeda
                      </button>
                  )}
                 
                  <button className={styles.actionBtn}>
                    <XCircle className={styles.icon} />
                    Akhiri
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
