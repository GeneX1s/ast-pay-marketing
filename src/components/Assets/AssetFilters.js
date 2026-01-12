import { Image, FileText, Video, Hexagon } from 'lucide-react';
import styles from './Assets.module.css';

const icons = {
  banner: Image,
  copywriting: FileText,
  video: Video,
  logo: Hexagon
};

export default function AssetFilters({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'banner', label: 'Banner' },
    { id: 'copywriting', label: 'Copywriting' },
    { id: 'video', label: 'Video' },
    { id: 'logo', label: 'Logo' }
  ];

  return (
    <div className={styles.filterContainer}>
      {filters.map(filter => {
        const Icon = icons[filter.id];
        return (
          <div 
            key={filter.id}
            className={`${styles.filterPill} ${currentFilter === filter.id ? styles.active : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            {Icon && <Icon size={14} />}
            {filter.label}
            <span className={styles.countBadge}>{counts[filter.id] || 0}</span>
          </div>
        );
      })}
    </div>
  );
}
