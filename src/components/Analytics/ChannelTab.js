'use client';

import { useState } from 'react';
import styles from './Analytics.module.css';

export default function ChannelTab({ data }) {
  if (!data) return null;

  // Find max value for scaling bar chart
  const maxLeads = Math.max(...data.map(d => d.leads));

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.sectionTitle}>Performa per Channel</h3>
      
      {/* Bar Chart */}
      <div className={styles.channelChartContainer}>
        {data.map((item) => (
          <div key={item.name} className={styles.barGroup}>
            <div 
              className={styles.bar} 
              style={{ 
                height: `${(item.leads / maxLeads) * 100}%`,
                backgroundColor: item.color 
              }}
            >
              <div className={styles.barTooltip}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</div>
                <div style={{ color: '#3B82F6' }}>Leads: {item.leads}</div>
              </div>
            </div>
            <span className={styles.barLabel}>{item.name}</span>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Detail Channel</h3>
      <div className={styles.channelDetailList}>
        {data.map((item) => (
          <div key={item.name} className={styles.channelDetailItem}>
             <div className={styles.channelInfo}>
               <span className={styles.channelName}>{item.name}</span>
               <span className={styles.channelSpend}>{item.spend}</span>
             </div>
             <div className={styles.progressBarTrack}>
               <div 
                 className={styles.progressBarFill} 
                 style={{ width: `${(item.leads / maxLeads) * 100}%` }}
               />
             </div>
             <div className={styles.channelStats}>
               <span>{item.leads} leads</span> • <span>{item.cvr}% CVR</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
