import styles from './Analytics.module.css';

export default function TopCampaigns({ campaigns }) {
  if (!campaigns) return null;

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Top Performing Campaigns</h3>
      <div className={styles.campaignList}>
        {campaigns.map((campaign, index) => (
          <div key={index} className={styles.campaignItem}>
            <div>
              <div className={styles.campaignName}>{campaign.name}</div>
              <div className={styles.campaignMeta}>
                {campaign.leads} • {campaign.cvr}
              </div>
            </div>
            <div className={`${styles.campaignStat} ${campaign.isPositive ? styles.positive : styles.negative}`}>
              {campaign.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
