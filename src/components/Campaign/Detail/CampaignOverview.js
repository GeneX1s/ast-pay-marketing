import styles from './CampaignDetail.module.css';

export default function CampaignOverview({ campaign }) {
    const percentage = (campaign.spent / campaign.budget) * 100;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <>
            <div className={styles.overviewGrid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Informasi Kampanye</h3>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Tipe Kampanye</span>
                        <span className={styles.infoValue}>{campaign.type}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Status</span>
                        <span className={styles.infoValue} style={{ color: '#10b981' }}>{campaign.status}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Target Audiens</span>
                        <span className={styles.infoValue}>{campaign.targetAudience}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Jumlah Target</span>
                        <span className={styles.infoValue}>{campaign.targetCount}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Periode</span>
                        <span className={styles.infoValue}>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Budget & Spending</h3>

                    <div className={styles.budgetRow}>
                        <span className={styles.budgetLabel}>Total Budget</span>
                        <span className={styles.budgetValue}>{formatCurrency(campaign.budget)}</span>
                    </div>
                    <div className={styles.budgetRow}>
                        <span className={styles.budgetLabel}>Terpakai</span>
                        <span className={styles.budgetValue} style={{ color: '#0066ff' }}>{formatCurrency(campaign.spent)}</span>
                    </div>

                    <div className={styles.progressContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>

                    <div className={styles.spendingInfo}>
                        {percentage.toFixed(1)}% dari total budget
                    </div>

                    <div className={styles.remainingBudget}>
                        <span>Sisa Budget</span>
                        <span className={styles.remainingValue}>{formatCurrency(campaign.budget - campaign.spent)}</span>
                    </div>
                </div>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Deskripsi Kampanye</h3>
                <p className={styles.descriptionText}>
                    {campaign.description}
                </p>
            </div>
        </>
    );
}
