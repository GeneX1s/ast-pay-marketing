import { ArrowLeft, Pause, Play, Edit, XCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './CampaignDetail.module.css';

export default function CampaignHeader({ campaign, onToggleStatus, onEndCampaign }) {
    const isEnded = campaign.status === 'Berakhir';
    const isActive = campaign.status === 'Aktif';
    return (
        <div className={styles.header}>
            <div className={styles.titleSection}>
                <div className={styles.topRow}>
                    <Link href="/kampanye" className={styles.backButton}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>{campaign.name}</h1>
                    <span className={styles.statusBadge}>{campaign.status}</span>
                </div>
                <p className={styles.subtitle}>
                    {campaign.type} • {campaign.startDate} - {campaign.endDate}
                </p>
            </div>
            {isEnded ? (
                <div style={{ color: '#ef4444', fontWeight: 500 }}>
                    Kampanye Berakhir
                </div>
            ) : (
                <div className={styles.actions}>
                    <button className={styles.btn} onClick={onToggleStatus}>
                        {isActive ? (
                            <>
                                <Pause size={16} />
                                Jeda
                            </>
                        ) : (
                            <>
                                <Play size={16} />
                                Aktifkan
                            </>
                        )}
                    </button>
                    <button className={styles.btn}>
                        <Edit size={16} />
                        Edit
                    </button>
                    <button
                        className={styles.btn}
                        onClick={onEndCampaign}
                        style={{ color: '#ef4444', borderColor: '#fee2e2', backgroundColor: '#fef2f2' }}
                    >
                        <XCircle size={16} />
                        Akhiri
                    </button>
                </div>
            )}
        </div>
    );
}
