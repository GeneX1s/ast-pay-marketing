import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Cari..." className={styles.input} />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        
        <div className={styles.profile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin Marketing</span>
            <span className={styles.userRole}>Marketing Manager</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
