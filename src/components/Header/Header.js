import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LogoutModal from '../auth/LogoutModal';
import styles from './Header.module.css';
import dropdownStyles from './HeaderDropdown.module.css';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <>
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

          <div
            className={styles.profile}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            <div className={styles.avatar}>{user?.avatar || 'A'}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Admin Marketing'}</span>
              <span className={styles.userRole}>{user?.role || 'Marketing Manager'}</span>
            </div>
            <ChevronDown size={16} />

            {isDropdownOpen && (
              <div className={dropdownStyles.dropdown}>
                <Link href="/profil" className={dropdownStyles.dropdownItem} style={{ display: 'block' }}>Profil</Link>
                <button className={dropdownStyles.dropdownItem}>Pengaturan Akun</button>
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '0.25rem 0' }}></div>
                <button
                  className={`${dropdownStyles.dropdownItem} ${dropdownStyles.dropdownItemDanger}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogoutClick();
                  }}
                >
                  Keluar (Logout)
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
