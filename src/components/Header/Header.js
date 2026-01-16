import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LogoutModal from '../auth/LogoutModal';
import styles from './Header.module.css';
import dropdownStyles from './HeaderDropdown.module.css';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Kampanye WA Payday aktif', message: 'Kampanye WhatsApp Payday telah diaktifkan dan berjalan', time: '5 menit lalu', read: false },
    { id: 2, title: '5 prospek baru dari Landing Page', message: 'Landing Page "Daftar Gratis" mendapat 5 prospek baru', time: '15 menit lalu', read: false },
    { id: 3, title: 'Kupon ASTNEW50 dipakai 20x', message: 'Kupon ASTNEW50 telah digunakan 20 kali hari ini', time: '1 jam lalu', read: false },
  ]);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  const handleMarkAllRead = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <button className={styles.menuBtn} onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Cari..." 
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.notificationWrapper} ref={notifRef}>
              <button className={styles.iconBtn} onClick={() => setIsNotifOpen(!isNotifOpen)}>
                <Bell size={20} />
                {unreadCount > 0 && <span className={styles.badge} />}
              </button>

              {isNotifOpen && (
                  <div className={styles.notifDropdown}>
                      <div className={styles.notifHeader}>
                          <div className={styles.notifTitle}>
                              <h3>Notifikasi</h3>
                              <span>{unreadCount} belum dibaca</span>
                          </div>
                          <button className={styles.closeNotif} onClick={() => setIsNotifOpen(false)}>
                              <X size={16} />
                          </button>
                      </div>
                      
                      {unreadCount > 0 && (
                          <button className={styles.markReadBtn} onClick={handleMarkAllRead}>
                              <span style={{ marginRight: '6px' }}>✓</span> Tandai semua dibaca
                          </button>
                      )}

                      <div className={styles.notifList}>
                          {notifications.map(notif => (
                              <div key={notif.id} className={`${styles.notifItem} ${!notif.read ? styles.unread : ''}`}>
                                  <div className={styles.notifDot} />
                                  <div className={styles.notifContent}>
                                      <h4>{notif.title}</h4>
                                      <p>{notif.message}</p>
                                      <span className={styles.notifTime}>{notif.time}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>

          <div className={styles.profileWrapper} ref={profileRef}>
            <button 
              className={styles.profileBtn}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className={styles.avatar}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.name || 'Admin Marketing'}</span>
                <span className={styles.userRole}>{user?.role || 'Marketing Manager'}</span>
              </div>
              <ChevronDown size={16} />
            </button>

            {isProfileOpen && (
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
