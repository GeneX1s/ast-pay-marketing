import styles from './Experiments.module.css';
import { Play, Pause } from 'lucide-react';

export default function ExperimentTable({ experiments, onToggleStatus, onViewDetail }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Selesai': return styles.statusSelesai;
      case 'Berjalan': return styles.statusBerjalan;
      case 'Jeda': return styles.statusJeda;
      default: return styles.statusDraft;
    }
  };

  return (
    <div className={styles.tableSection}>
      <h3 className={styles.sectionTitle}>Daftar Eksperimen</h3>
      <table className={styles.experimentTable}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Target</th>
            <th>Varian A/B</th>
            <th>Status</th>
            <th>Mulai</th>
            <th>Hasil</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {experiments.map((exp) => (
            <tr key={exp.id}>
              <td style={{ fontWeight: 500 }}>{exp.name}</td>
              <td style={{ color: '#64748B' }}>{exp.target}</td>
              <td>
                <div className={styles.variantCell}>
                  {exp.variants.map((v, i) => (
                    <span key={i}>{v.name}</span>
                  ))}
                </div>
              </td>
              <td>
                <span className={`${styles.statusBadge} ${getStatusClass(exp.status)}`}>
                  {exp.status}
                </span>
              </td>
              <td style={{ fontSize: '0.875rem' }}>{exp.startDate || '-'}</td>
              <td>
                <div className={styles.variantCell}>
                  {exp.variants.map((v, i) => (
                    <span key={i} style={{ display: 'flex', gap: '4px' }}>
                       <span style={{ fontWeight: 600 }}>{v.name.split(':')[0]}:</span> {v.ctr} CTR
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  {(exp.status === 'Berjalan' || exp.status === 'Draft' || exp.status === 'Jeda') && (
                    <button 
                      className={styles.actionBtn} 
                      onClick={() => onToggleStatus(exp.id)}
                      title={exp.status === 'Berjalan' ? 'Pause' : 'Start'}
                    >
                      {exp.status === 'Berjalan' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                  )}
                  <button 
                    className={styles.detailBtn}
                    onClick={() => onViewDetail(exp)}
                  >
                    Detail
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
