import Link from 'next/link';
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

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: Megaphone, label: 'Kampanye', href: '/kampanye' },
  { icon: Users, label: 'Audiens & Segmentasi', href: '/audiens' },
  { icon: UserPlus, label: 'Prospek (Leads)', href: '/prospek' },
  { icon: Tags, label: 'Penawaran & Kupon', href: '/kupon' },
  { icon: FileText, label: 'Landing Page & Form', href: '/landing' },
  { icon: Share2, label: 'Referral & Partner', href: '/referral' },
  { icon: FolderOpen, label: 'Pustaka Aset', href: '/assets' },
  { icon: BarChart2, label: 'Analitik & Atribusi', href: '/analytics' },
  { icon: FlaskConical, label: 'Eksperimen (A/B Test)', href: '/experiments' },
  { icon: Settings, label: 'Pengaturan', href: '/settings' },
];

export default function Sidebar({ isOpen, onClose }) {
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
