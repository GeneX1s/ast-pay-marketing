'use client';

import useSWR from 'swr';
import { Eye, Pause, Play, XCircle } from 'lucide-react';
import styles from './Campaign.module.css';
import { fetcher } from '@/utils/fetcher';

export default function CampaignTable() {
  const { data: campaigns, error, isLoading } = useSWR('/api/campaigns', fetcher);

  if (error) return <div className={styles.tableContainer}>Failed to load</div>;
  if (isLoading) return <div className={styles.tableContainer}>Loading...</div>;

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
