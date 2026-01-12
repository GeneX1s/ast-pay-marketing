'use client';

import { useState } from 'react';
import styles from './Analytics.module.css';
import { ArrowRight } from 'lucide-react';

export default function AttributionTab({ data }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  if (!data) return null;

  // Pie Chart Logic
  const pieSize = 250;
  const radius = pieSize / 2;
  const center = pieSize / 2;
  let currentAngle = 0;

  const renderPieSegment = (segment, total) => {
    const angle = (segment.value / total) * 360;
    const x1 = center + radius * Math.cos((Math.PI * currentAngle) / 180);
    const y1 = center + radius * Math.sin((Math.PI * currentAngle) / 180);
    const x2 = center + radius * Math.cos((Math.PI * (currentAngle + angle)) / 180);
    const y2 = center + radius * Math.sin((Math.PI * (currentAngle + angle)) / 180);
    
    // SVG path command for arc
    const largeArcFlag = angle > 180 ? 1 : 0;
    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    currentAngle += angle;

    return (
      <path
        key={segment.id}
        d={pathData}
        fill={segment.color}
        className={styles.pieSegment}
        onMouseEnter={() => setHoveredSegment(segment)}
        onMouseLeave={() => setHoveredSegment(null)}
        style={{ transformOrigin: 'center', transition: 'transform 0.2s' }}
        transform={hoveredSegment?.id === segment.id ? 'scale(1.05)' : 'scale(1)'}
      />
    );
  };

  const totalPieValue = data.pie.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={styles.attributionContainer}>
      {/* Model Atribusi */}
      <div className={styles.chartSection}>
        <h3 className={styles.sectionTitle}>Model Atribusi</h3>
        <div className={styles.pieChartWrapper}>
          <svg width={pieSize} height={pieSize} className={styles.pieSvg}>
            {data.pie.map(segment => renderPieSegment(segment, totalPieValue))}
          </svg>
           {/* Center Text (making it a donut) not strictly requested but design implies chart focus */}
           {hoveredSegment && (
             <div className={styles.pieLabel}>
               {hoveredSegment.label}
             </div>
           )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {data.pie.map(segment => (
                <div key={segment.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: segment.color }} />
                    {segment.label.split(':')[0]}
                </div>
            ))}
        </div>
      </div>

      {/* Perbandingan Model */}
      <div className={styles.chartSection}>
        <h3 className={styles.sectionTitle}>Perbandingan Model</h3>
        <div className={styles.modelComparison}>
          {data.comparison.map(model => (
            <div key={model.model} className={styles.modelRow}>
              <div className={styles.modelLabel}>
                <span>{model.model}</span>
                <span>{model.value}%</span>
              </div>
              <div className={styles.modelBarTrack}>
                <div 
                  className={styles.modelBarFill} 
                  style={{ width: `${model.value}%`, backgroundColor: model.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Journey - Full Width */}
      <div className={styles.chartSection} style={{ gridColumn: 'span 2' }}>
         <h3 className={styles.sectionTitle}>Customer Journey</h3>
         <p style={{ fontSize: '0.875rem', color: '#64748B' }}>Touchpoint rata-rata sebelum konversi: <span style={{ fontWeight: 600, color: '#0F172A' }}>5.2</span></p>
         <div className={styles.journeyContainer}>
           {data.journey.map((step, index) => (
             <div key={step.step} style={{ display: 'flex', alignItems: 'center' }}>
               <div className={`${styles.journeyStep} ${styles[step.type]}`}>
                 {step.step}
               </div>
               {index < data.journey.length - 1 && (
                 <ArrowRight size={16} className={styles.journeyArrow} style={{ margin: '0 0.5rem' }} />
               )}
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
