import { ExternalLink, MoreHorizontal } from 'lucide-react';
import styles from './LandingPage.module.css';

export default function LandingPageTable({ pages }) {
  if (!pages) return null;

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Daftar Landing Page</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tujuan</th>
            <th>URL</th>
            <th>Leads Masuk</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td style={{ fontWeight: 500 }}>{page.name}</td>
              <td style={{ color: 'var(--text-secondary)' }}>
                <span style={{ 
                  backgroundColor: '#F1F5F9', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.75rem', 
                  fontWeight: 500 
                }}>
                  {page.goal}
                </span>
              </td>
              <td>
                <div className={styles.urlCell}>
                  {page.url}
                  <ExternalLink size={14} />
                </div>
              </td>
              <td>{page.leads}</td>
              <td>
                <span className={styles[page.statusType]}>
                  {page.status}
                </span>
              </td>
              <td>
                <div className={styles.actionBtn}>
                   Detail
                   <ExternalLink size={14} color="#64748B"/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
