import styles from './FunnelChart.module.css';

const funnelData = [
  { label: 'Pengunjung', value: '12,500', width: '100%', color: '#0066FF' },
  { label: 'Prospek', value: '2,845 (22.8%)', width: '22.8%', color: '#3B82F6' },
  { label: 'Pendaftar', value: '1,234 (43.4%)', width: '43.4%', color: '#60A5FA', relativeWidth: '43.4%' },
  { label: 'Berbayar', value: '289 (23.4%)', width: '23.4%', color: '#10B981', relativeWidth: '23.4%' },
];

export default function FunnelChart() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Funnel Konversi</h3>
      <div className={styles.chart}>
        {funnelData.map((item, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.label}>{item.label}</span>
            <div className={styles.barContainer}>
              <div 
                className={styles.bar} 
                style={{ 
                  width: item.width, 
                  backgroundColor: item.color 
                }} 
              />
              <span className={styles.value} style={{ left: '1rem', color: 'white' }}>
                 {/* Text inside bar if wide enough, else outside. For simplicity, just absolute or flex */}
                 {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
