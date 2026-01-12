import { File, Video, Image as ImageIcon } from 'lucide-react';
import styles from './Assets.module.css';

export default function AssetGrid({ assets, onAssetClick }) {
  const renderIcon = (type) => {
    if (type === 'video') return <Video size={32} color="#94A3B8" />;
    if (type === 'image') return <ImageIcon size={32} color="#94A3B8" />;
    return <File size={32} color="#94A3B8" />;
  };

  return (
    <div className={styles.assetGrid}>
      {assets.map(asset => (
        <div key={asset.id} className={styles.assetCard}>
          <div className={styles.previewWrapper}>
            {asset.imageUrl ? (
               <img src={asset.imageUrl} alt={asset.title} className={styles.assetImage} />
            ) : (
               renderIcon(asset.type)
            )}
            
            <div className={styles.hoverOverlay}>
              <button 
                className={styles.detailBtn}
                onClick={() => onAssetClick(asset)}
              >
                Lihat Detail
              </button>
            </div>
          </div>
          
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{asset.title}</h3>
            <div className={styles.cardMeta}>
              <span>{asset.size}</span>
              <span>{asset.date}</span>
            </div>
            <div className={styles.tags}>
              {asset.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
