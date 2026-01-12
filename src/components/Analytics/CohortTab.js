import styles from './Analytics.module.css';

export default function CohortTab({ data }) {
  if (!data) return null;

  const getColor = (value) => {
    if (value === 100) return '#BFDBFE'; // Blue-200
    if (value >= 75) return '#BBF7D0';   // Green-200
    if (value >= 60) return '#FEF08A';   // Yellow-200
    return '#FED7AA';                    // Orange-200
  };

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Analisis Cohort (Retention)</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.cohortTable}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Cohort</th>
              {data.headers.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.name}>
                <td style={{ textAlign: 'left', fontWeight: 500, fontSize: '0.875rem' }}>{row.name}</td>
                {row.values.map((value, i) => (
                  <td key={i}>
                    <div 
                      className={styles.cohortCell}
                      style={{ 
                        backgroundColor: getColor(value),
                        color: '#1E293B' // Dark text for contrast
                      }}
                    >
                      {value}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
