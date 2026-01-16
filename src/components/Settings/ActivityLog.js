'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Settings.module.css';
import { useState, useMemo } from 'react';

const MOCK_LOGS = [
  { id: 'LOG-001', time: '2026-01-11 09:15:23', user: 'Budi Santoso', role: 'Staff Sales', action: 'Login', detail: 'Login berhasil ke sistem', ip: '192.168.1.101', status: 'Berhasil' },
  { id: 'LOG-002', time: '2026-01-11 09:16:45', user: 'Budi Santoso', role: 'Staff Sales', action: 'Create Submission', detail: 'Membuat pengajuan baru SUB-001', ip: '192.168.1.101', status: 'Berhasil' },
  { id: 'LOG-003', time: '2026-01-11 09:30:12', user: 'Siti Aminah', role: 'Staff Sales', action: 'Login', detail: 'Login berhasil ke sistem', ip: '192.168.1.102', status: 'Berhasil' },
  { id: 'LOG-004', time: '2026-01-11 09:45:33', user: 'Ahmad Yani', role: 'Supervisor', action: 'Approve Submission', detail: 'Menyetujui pengajuan SUB-001', ip: '192.168.1.103', status: 'Berhasil' },
  { id: 'LOG-005', time: '2026-01-11 10:00:21', user: 'Dewi Lestari', role: 'Staff Sales', action: 'Update Profile', detail: 'Memperbarui informasi profil', ip: '192.168.1.104', status: 'Berhasil' },
  { id: 'LOG-006', time: '2026-01-11 10:15:44', user: 'Eko Prasetyo', role: 'Staff Sales', action: 'Upload Document', detail: 'Mengunggah dokumen KTP', ip: '192.168.1.105', status: 'Berhasil' },
  { id: 'LOG-007', time: '2026-01-11 10:30:55', user: 'Fitri Handayani', role: 'Supervisor', action: 'Review Submission', detail: 'Meninjau pengajuan SUB-002', ip: '192.168.1.106', status: 'Berhasil' },
  { id: 'LOG-008', time: '2026-01-11 10:45:12', user: 'Gunawan', role: 'Staff Sales', action: 'Delete Draft', detail: 'Menghapus draft pengajuan', ip: '192.168.1.107', status: 'Berhasil' },
  { id: 'LOG-009', time: '2026-01-11 11:00:33', user: 'Hendra Wijaya', role: 'Staff Sales', action: 'Login Failed', detail: 'Percobaan login gagal - password salah', ip: '192.168.1.108', status: 'Gagal' },
  { id: 'LOG-010', time: '2026-01-11 11:15:44', user: 'Indah Permata', role: 'Supervisor', action: 'Export Data', detail: 'Mengekspor data pengajuan ke Excel', ip: '192.168.1.109', status: 'Berhasil' },
  { id: 'LOG-011', time: '2026-01-11 11:30:11', user: 'Joko Susilo', role: 'Admin', action: 'System Update', detail: 'Melakukan update sistem minor', ip: '192.168.1.110', status: 'Berhasil' }
];

export default function ActivityLog() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter Data
  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter(log => 
      Object.values(log).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + rowsPerPage);

  const getStatusBadge = (status) => {
      return (
        <span className={`${styles.statusBadge} ${status === 'Gagal' ? styles.statusError : styles.statusSuccess}`}>
            {status}
        </span>
      );
  };

  return (
    <div className={styles.settingsSection}>
      <div className={styles.toolbar}>
        <div>
           <h3 className={styles.sectionTitle}>{t.settings.activity.title}</h3>
           <p className={styles.subtitle}>{t.settings.activity.subtitle}</p>
        </div>
        
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder={t.settings.activity.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t.settings.activity.table.id}</th>
              <th>{t.settings.activity.table.time}</th>
              <th>{t.settings.activity.table.user}</th>
              <th>{t.settings.activity.table.role}</th>
              <th>{t.settings.activity.table.action}</th>
              <th>{t.settings.activity.table.detail}</th>
              <th>{t.settings.activity.table.ip}</th>
              <th>{t.settings.activity.table.status}</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td style={{ fontSize: '0.75rem', color: '#64748B' }}>{log.time}</td>
                <td style={{ fontWeight: 500 }}>{log.user}</td>
                <td>{log.role}</td>
                <td style={{ fontWeight: 500 }}>{log.action}</td>
                <td style={{ color: '#64748B' }}>{log.detail}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{log.ip}</td>
                <td>{getStatusBadge(log.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationStart}>
             <div className={styles.pageInfo}>{t.settings.activity.pagination.rowsPerPage}</div>
             <select 
                className={styles.rowsSelect}
                value={rowsPerPage}
                onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
             >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
             </select>
        </div>
        
        <div className={styles.pageControls}>
            <div className={styles.pageInfo} style={{ marginRight: '1rem' }}>
                {t.settings.activity.pagination.showing} {Math.min(startIndex + 1, filteredLogs.length)}-{Math.min(startIndex + rowsPerPage, filteredLogs.length)} {t.settings.activity.pagination.of} {filteredLogs.length}
            </div>
            <button 
                className={styles.pageBtn} 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
            >
                <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                    key={page} 
                    className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
             <button 
                className={styles.pageBtn} 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
            >
                <ChevronRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}
