import { Users, Edit2, Trash2 } from 'lucide-react';
import styles from './Audiens.module.css';

export default function AudiensTable({ segments, onDelete }) {
    return (
        <div className={styles.tableContainer}>
            <h3 className={styles.tableHeader}>Segmen Tersimpan</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nama Segmen</th>
                        <th>Jumlah Target</th>
                        <th>Kriteria</th>
                        <th>Terakhir Update</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {segments.map((segment) => (
                        <tr key={segment.id}>
                            <td>
                                <div className={styles.segmentName}>
                                    <Users size={18} className={styles.segmentIcon} />
                                    {segment.name}
                                </div>
                            </td>
                            <td>
                                <span className={styles.countBadge}>{segment.count}</span>
                            </td>
                            <td>
                                <div className={styles.criteriaList}>
                                    {segment.criteria.slice(0, 2).map((crit, idx) => (
                                        <span key={idx} className={styles.criteriaTag}>
                                            {crit}
                                        </span>
                                    ))}
                                    {segment.criteria.length > 2 && (
                                        <span className={styles.moreTag}>
                                            +{segment.criteria.length - 2}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className={styles.lastUpdate}>{segment.lastUpdate}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                        onClick={() => onDelete(segment.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Empty state if needed */}
                    {segments.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                Belum ada segmen yang dibuat.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
