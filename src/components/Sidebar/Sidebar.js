import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  UserPlus,
  Tags,
  FileText,
  Share2,
  FolderOpen,
  BarChart2,
  FlaskConical,
  Settings,
  X
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t.sidebar.dashboard, href: '/dashboard', active: true },
    { icon: Megaphone, label: t.sidebar.campaigns, href: '/kampanye' },
    { icon: Users, label: t.sidebar.audience, href: '/audiens' },
    { icon: UserPlus, label: t.sidebar.leads, href: '/prospek' },
    { icon: Tags, label: t.sidebar.offers, href: '/kupon' },
    { icon: FileText, label: t.sidebar.landingPage, href: '/landing-page' },
    { icon: Share2, label: t.sidebar.referral, href: '/referral' },
    { icon: FolderOpen, label: t.sidebar.assets, href: '/assets' },
    { icon: BarChart2, label: t.sidebar.analytics, href: '/analytics' },
    { icon: FlaskConical, label: t.sidebar.experiments, href: '/experiments' },
    { icon: Settings, label: t.sidebar.settings, href: '/settings' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>AST PAY</h1>
          <span className={styles.subtitle}>Panel Marketing Internal</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
            onClick={onClose}
          >
            <item.icon size={20} className={styles.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
