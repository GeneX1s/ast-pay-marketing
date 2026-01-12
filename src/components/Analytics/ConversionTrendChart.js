'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Analytics.module.css';

export default function ConversionTrendChart({ data }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
           setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!data || data.length === 0) return null;

  // Chart dimensions
  const height = 300;
  const padding = 40;
  
  // Only render chart if we have a valid width
  const shouldRenderChart = width > 0;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => Math.max(d.leads, d.conversions, d.paid)));
  
  // Dynamic xScale based on current width
  const xScale = (index) => padding + (index * (width - 2 * padding) / (data.length - 1));
  const yScale = (value) => height - padding - (value * (height - 2 * padding) / maxValue);

  // Generate SVG paths
  const createPath = (key) => {
    return data.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(i)},${yScale(d[key])}`
    ).join(' ');
  };

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Tren Konversi</h3>
      <div className={styles.chartContainer} ref={containerRef}>
        {shouldRenderChart && (
          <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg}>
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => (
              <line 
                key={i}
                x1={padding} 
                y1={height - padding - (tick * (height - 2 * padding))} 
                x2={width - padding} 
                y2={height - padding - (tick * (height - 2 * padding))} 
                className={styles.gridLine}
              />
            ))}
            
            {/* Y Axis Labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => (
              <text 
                key={i}
                x={padding - 10} 
                y={height - padding - (tick * (height - 2 * padding))} 
                textAnchor="end" 
                fontSize="10" 
                fill="#94A3B8"
                dy="3"
              >
                {Math.round(tick * maxValue)}
              </text>
            ))}

            {/* X Axis Labels */}
            {data.map((d, i) => (
              <text 
                key={i}
                x={xScale(i)} 
                y={height - padding + 20} 
                textAnchor="middle" 
                fontSize="10" 
                fill="#94A3B8"
              >
                {d.date}
              </text>
            ))}

            {/* Paths with Animation */}
            {/* Note: We recreate paths here to use the new width */}
            <path d={createPath('leads')} stroke="#3B82F6" className={styles.chartPath} />
            <path d={createPath('conversions')} stroke="#10B981" className={styles.chartPath} style={{ animationDelay: '0.2s' }} />
            <path d={createPath('paid')} stroke="#F59E0B" className={styles.chartPath} style={{ animationDelay: '0.4s' }} />

            {/* Interactive Dots */}
            {data.map((d, i) => (
              <g 
                 key={i} 
                 onMouseEnter={() => setActiveTooltip({ index: i, x: xScale(i), y: yScale(d.leads), data: d })}
                 onMouseLeave={() => setActiveTooltip(null)}
              >
                <circle cx={xScale(i)} cy={yScale(d.leads)} r="4" stroke="#3B82F6" className={styles.chartDot} />
                <circle cx={xScale(i)} cy={yScale(d.conversions)} r="4" stroke="#10B981" className={styles.chartDot} />
                <circle cx={xScale(i)} cy={yScale(d.paid)} r="4" stroke="#F59E0B" className={styles.chartDot} />
                {/* Invisible rect for better hover area */}
                <rect x={xScale(i) - 10} y={padding} width="20" height={height - 2 * padding} fill="transparent" />
              </g>
            ))}
          </svg>
        )}

        {/* Tooltip */}
        {activeTooltip && (
          <div 
            className={styles.tooltip} 
            style={{ left: Math.min(activeTooltip.x - 60, width - 150), top: activeTooltip.y - 100 }}
          >
            <span className={styles.tooltipDate}>{activeTooltip.data.date}</span>
            <div className={styles.tooltipRow} style={{ color: '#3B82F6' }}>
              <span>Leads :</span>
              <span>{activeTooltip.data.leads}</span>
            </div>
            <div className={styles.tooltipRow} style={{ color: '#10B981' }}>
              <span>Sign-ups :</span>
              <span>{activeTooltip.data.conversions}</span>
            </div>
            <div className={styles.tooltipRow} style={{ color: '#F59E0B' }}>
              <span>Paid :</span>
              <span>{activeTooltip.data.paid}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3B82F6' }}></div> Leads
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }}></div> Sign-ups
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B' }}></div> Paid
        </div>
      </div>
    </div>
  );
}
