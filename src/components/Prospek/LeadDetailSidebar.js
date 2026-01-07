import { useState, useEffect } from 'react';
import { X, Building2, Mail, Phone, Calendar, User, Search } from 'lucide-react';
import styles from './Prospek.module.css';

export default function LeadDetailSidebar({ isOpen, onClose, lead, onSave }) {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (lead) {
            setNotes(lead.notes || '');
        }
    }, [lead]);

    if (!isOpen || !lead) return null;

    const handleSave = () => {
        onSave({ ...lead, notes });
    };

    // Mock function to update status locally before save
    const handleStatusChange = (newStatus) => {
        onSave({ ...lead, status: newStatus, notes }); // Immediate save for status change
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.sidebarContainer} onClick={e => e.stopPropagation()}>
                <div className={styles.sidebarHeader}>
                    <h3 className={styles.sidebarTitle}>Detail Prospek</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.sidebarContent}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{lead.name}</h2>
                        <div className={styles.detailRow}>
                            <Building2 className={styles.icon} />
                            {lead.company}
                        </div>
                        <div className={styles.detailRow}>
                            <Mail className={styles.icon} />
                            {lead.email}
                        </div>
                        <div className={styles.detailRow}>
                            <Phone className={styles.icon} />
                            {lead.phone}
                        </div>
                        <div className={styles.detailRow}>
                            <Calendar className={styles.icon} />
                            Dibuat: {lead.createdDate}
                        </div>
                    </div>

                    <h4 className={styles.sectionTitle}>Informasi Lead</h4>
                    <div className={styles.infoGrid}>
                        <div>
                            <div className={styles.infoLabel}>Sumber</div>
                            <div className={styles.infoValue}>{lead.source}</div>
                        </div>
                        <div>
                            <div className={styles.infoLabel}>Nilai Estimasi</div>
                            <div className={styles.infoValue} style={{ color: '#2563eb' }}>{lead.value}</div>
                        </div>
                        <div>
                            <div className={styles.infoLabel}>PIC</div>
                            <div className={styles.infoValue}>{lead.pic}</div>
                        </div>
                        <div>
                            <div className={styles.infoLabel}>Status</div>
                            <span className={styles.statusBadge}>
                                {lead.status}
                            </span>
                        </div>
                    </div>

                    <h4 className={styles.sectionTitle}>Catatan</h4>
                    <textarea
                        className={styles.notesArea}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tambahkan catatan..."
                    />
                </div>

                <div className={styles.sidebarFooter}>
                    <h4 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Ubah Status</h4>

                    <div className={styles.statusActions}>
                        <button className={styles.statusBtn} onClick={() => handleStatusChange('Dihubungi')}>Dihubungi</button>
                        <button className={styles.statusBtn} onClick={() => handleStatusChange('Demo')}>Demo</button>
                    </div>
                    <div className={styles.statusActions}>
                        <button className={styles.statusBtn} onClick={() => handleStatusChange('Negosiasi')}>Negosiasi</button>
                        <button className={`${styles.statusBtn} ${styles.statusBtnActive}`} onClick={() => handleStatusChange('Won')}>Tandai Menang</button>
                    </div>
                    <div className={styles.statusActions}>
                        <button className={`${styles.statusBtn} ${styles.statusBtnLost}`} style={{ width: '100%' }}>Tandai Kalah</button>
                    </div>

                    <button className={styles.saveBtn} onClick={handleSave}>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
