import { Copy } from 'lucide-react';
import styles from './Coupon.module.css';

export default function CouponTable({ coupons }) {
  if (!coupons) return null;

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Daftar Kupon</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Tipe</th>
            <th>Nilai</th>
            <th>Periode</th>
            <th>Status</th>
            <th>Dipakai</th>
            <th>Target</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>
                <div className={styles.codeCell}>
                  {coupon.code}
                  <button className={styles.copyBtn}>
                    <Copy size={14} />
                  </button>
                </div>
              </td>
              <td>{coupon.type}</td>
              <td style={{ color: '#2563EB', fontWeight: 500 }}>{coupon.value}</td>
              <td>{coupon.period}</td>
              <td>
                <span className={styles[coupon.statusType]}>
                  {coupon.status}
                </span>
              </td>
              <td>
                <div className={styles.progressWrapper}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                    />
                  </div>
                  <span className={styles.progressText}>
                    {coupon.used} / {coupon.limit}
                  </span>
                </div>
              </td>
              <td>
                <span className={styles.targetBadge}>{coupon.target}</span>
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
