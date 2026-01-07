import { Mail, Monitor, User } from 'lucide-react';
import styles from './Prospek.module.css';

const COLUMNS = [
    { id: 'Prospek Baru', title: 'Prospek Baru', style: styles.headerBlue },
    { id: 'Dihubungi', title: 'Dihubungi', style: styles.headerYellow },
    { id: 'Demo', title: 'Demo', style: styles.headerPurple },
    { id: 'Negosiasi', title: 'Negosiasi', style: styles.headerOrange },
];

export default function ProspekBoard({ leads, onCardClick }) {
    const getLeadsByStatus = (status) => {
        return leads.filter(lead => lead.status === status);
    };

    return (
        <div className={styles.boardContainer}>
            {COLUMNS.map(col => {
                const colLeads = getLeadsByStatus(col.id);

                return (
                    <div key={col.id} className={styles.column}>
                        <div className={`${styles.columnHeader} ${col.style}`}>
                            {col.title}
                            <span className={styles.countBadge}>{colLeads.length}</span>
                        </div>

                        <div className={styles.cardList}>
                            {colLeads.map(lead => (
                                <div
                                    key={lead.id}
                                    className={styles.card}
                                    onClick={() => onCardClick(lead)}
                                >
                                    <div className={styles.cardName}>{lead.name}</div>
                                    <div className={styles.cardCompany}>{lead.company}</div>

                                    <div className={styles.cardInfo}>
                                        <Mail size={14} />
                                        {lead.email}
                                    </div>
                                    <div className={styles.cardInfo}>
                                        {/* Simplified icon logic based on source */}
                                        <Monitor size={14} />
                                        {lead.source}
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.value}>{lead.value}</span>
                                        <span className={styles.pic}>{lead.pic}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
