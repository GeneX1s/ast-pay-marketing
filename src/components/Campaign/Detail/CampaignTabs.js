import styles from './CampaignDetail.module.css';

export default function CampaignTabs({ activeTab, onTabChange }) {
    const tabs = [
        'Overview',
        'Performa',
        'Audiens',
        'Konten',
        'Pengaturan'
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
