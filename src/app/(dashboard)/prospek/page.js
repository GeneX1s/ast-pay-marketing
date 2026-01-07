'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Plus, Upload } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import ProspekBoard from '@/components/Prospek/ProspekBoard';
import LeadDetailSidebar from '@/components/Prospek/LeadDetailSidebar';
import Toast from '@/components/UI/Toast';
import styles from '@/components/Prospek/Prospek.module.css';

export default function ProspekPage() {
    const { data: leads, mutate } = useSWR('/api/leads', fetcher, {
        fallbackData: [],
        revalidateOnFocus: false
    });

    const [selectedLead, setSelectedLead] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '' });

    const handleCardClick = (lead) => {
        setSelectedLead(lead);
    };

    const handleCloseSidebar = () => {
        setSelectedLead(null);
    };

    const handleSaveLead = async (updatedLead) => {
        // Optimistic update
        const newLeads = leads.map(l => l.id === updatedLead.id ? updatedLead : l);
        mutate(newLeads, false);

        setSelectedLead(null); // Close sidebar
        setToast({ show: true, message: 'Data prospek berhasil disimpan' });

        try {
            await fetch('/api/leads', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLead)
            });
        } catch (err) {
            console.error(err);
            mutate(); // Revert on error
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Prospek (Leads)</h1>
                    <p className={styles.subtitle}>Kelola prospek dalam tampilan Kanban</p>
                </div>

                <div className={styles.headerActions}>
                    <button className={styles.btnSecondary}>
                        <Upload size={18} />
                        Impor CSV
                    </button>
                    <button className={styles.btnPrimary}>
                        <Plus size={18} />
                        Tambah Prospek
                    </button>
                </div>
            </div>

            <ProspekBoard
                leads={leads || []}
                onCardClick={handleCardClick}
            />

            <LeadDetailSidebar
                isOpen={!!selectedLead}
                onClose={handleCloseSidebar}
                lead={selectedLead}
                onSave={handleSaveLead}
            />

            {toast.show && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
}
