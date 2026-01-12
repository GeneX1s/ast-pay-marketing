import { X, Copy, Download, File, Video, Image as ImageIcon } from 'lucide-react';
import styles from './Assets.module.css';

export default function AssetSidebar({ asset, onClose, isOpen }) {
  if (!isOpen || !asset) return null;

  const renderPreview = (type) => {
    if (type === 'image' && asset.imageUrl) {
      return <img src={asset.imageUrl} alt={asset.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
    }
    if (type === 'video') return <Video size={64} color="#94A3B8" />;
    return <File size={64} color="#94A3B8" />;
  };

  return (
    <>
      <div className={styles.sidebarOverlay} onClick={onClose} />
      <div className={styles.sidebarPanel}>
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Detail Aset</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.previewLarge}>
            {renderPreview(asset.type)}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{asset.title}</h2>
            <div className={styles.tags}>
              {asset.tags && asset.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Tipe</span>
            <span className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{asset.type}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Ukuran</span>
            <span className={styles.detailValue}>{asset.size}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Kategori</span>
            <span className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{asset.category}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Dibuat</span>
            <span className={styles.detailValue}>{asset.date}</span>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <span className={styles.detailLabel}>URL Aset</span>
            <div className={styles.urlBox}>
              <input type="text" value={asset.url} readOnly className={styles.urlInput} />
              <button className={styles.copyBtn}>
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <button className={styles.downloadBtn}>
            <Download size={18} />
            Unduh Aset
          </button>
        </div>
      </div>
    </>
  );
}
