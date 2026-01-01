import CampaignTable from '@/components/Campaign/CampaignTable';
import styles from '@/components/Campaign/Campaign.module.css';

export const metadata = {
  title: 'Kampanye Marketing - AST PAY',
  description: 'Kelola semua kampanye marketing',
};

export default function KampanyePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Kampanye</h2>
          <p className={styles.subtitle}>Kelola semua kampanye marketing</p>
        </div>
        <div>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>+ Buat Kampanye</button>
        </div>
      </div>

      <CampaignTable />
    </div>
  );
}
