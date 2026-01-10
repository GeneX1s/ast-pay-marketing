import { Copy } from 'lucide-react';
import styles from './Referral.module.css';

export default function ReferralTable({ partners }) {
  if (!partners) return null;

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Daftar Partner</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama Partner</th>
            <th>Kode Referral</th>
            <th>Leads</th>
            <th>Aktivasi</th>
            <th>Komisi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner.id}>
              <td>
                <div className={styles.partnerCell}>
                  <span className={styles.partnerName}>{partner.name}</span>
                  <span className={styles.partnerEmail}>{partner.email}</span>
                </div>
              </td>
              <td>
                <div className={styles.codeCell}>
                  {partner.code}
                  <button className={styles.copyBtn}>
                    <Copy size={14} />
                  </button>
                </div>
              </td>
              <td>{partner.leads}</td>
              <td style={{ color: '#166534', fontWeight: 500 }}>{partner.activation}</td>
              <td style={{ color: '#2563EB', fontWeight: 500 }}>{partner.commission}</td>
              <td>
                <span className={styles[partner.statusType]}>
                  {partner.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
