import styles from './Analytics.module.css';

export default function CampaignTab({ data }) {
  if (!data) return null;

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Performa Kampanye</h3>
      <table className={styles.campaignTable}>
        <thead>
          <tr>
            <th>Kampanye</th>
            <th>Leads</th>
            <th>CVR</th>
            <th>Budget</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className={styles.campaignNameCell}>{item.name}</td>
              <td style={{ fontWeight: 500 }}>{item.leads}</td>
              <td className={styles.cvrCell}>{item.cvr}</td>
              <td>{item.budget}</td>
              <td className={styles.roiCell}>{item.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
