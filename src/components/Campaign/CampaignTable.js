'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { Eye, Pause, Play, XCircle } from 'lucide-react';
import styles from './Campaign.module.css';
import { fetcher } from '@/utils/fetcher';

import { useState, useEffect } from 'react';

export default function CampaignTable() {
  const { data: initialData, error, isLoading } = useSWR('/api/campaigns', fetcher);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (initialData) {
      setCampaigns(initialData);
    }
  }, [initialData]);

  const handleToggleStatus = (id) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === id) {
        const isPaused = campaign.statusType === 'paused';
        return {
          ...campaign,
          status: isPaused ? 'Aktif' : 'Jeda',
          statusType: isPaused ? 'active' : 'paused'
        };
      }
      return campaign;
    }));
  };

  const handleEndCampaign = (id) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: 'Berakhir',
          statusType: 'ended' // Assuming 'ended' or 'gray' style exists, checking CSS next
        };
      }
      return campaign;
    }));
  };

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
                  <Link href={`/kampanye/${row.id}`} className={styles.actionBtn}>
                    <Eye className={styles.icon} />
                    Lihat Detail
                  </Link>
                  {row.statusType === 'paused' ? (
                    <button className={styles.actionBtn} onClick={() => handleToggleStatus(row.id)}>
                      <Play className={styles.icon} />
                      Aktifkan
                    </button>
                  ) : row.statusType === 'active' ? (
                    <button className={styles.actionBtn} onClick={() => handleToggleStatus(row.id)}>
                      <Pause className={styles.icon} />
                      Jeda
                    </button>
                  ) : null}

                  {row.statusType !== 'ended' && (
                    <button className={styles.actionBtn} onClick={() => handleEndCampaign(row.id)}>
                      <XCircle className={styles.icon} />
                      Akhiri
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
