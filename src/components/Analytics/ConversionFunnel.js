import styles from './Analytics.module.css';

export default function ConversionFunnel({ data }) {
  if (!data) return null;

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Funnel Konversi</h3>
      <div className={styles.funnelContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.funnelRow}>
            <span className={styles.funnelLabel}>{item.label}</span>
            <div className={styles.funnelBarWrapper}>
              <div 
                className={styles.funnelBar} 
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }} 
              />
              <span className={styles.funnelValue}>
                {item.value.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
