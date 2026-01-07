'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Plus } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import AudiensTable from '@/components/Audiens/AudiensTable';
import CreateSegmentModal from '@/components/Audiens/CreateSegmentModal';
import Toast from '@/components/UI/Toast';
import styles from '@/components/Audiens/Audiens.module.css';

export default function AudiensPage() {
    const { data: initialData, mutate } = useSWR('/api/segments', fetcher, {
        fallbackData: [],
        revalidateOnFocus: false
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = (message) => {
        setToast({ show: true, message });
    };

    const handleCreateSegment = async (segmentData) => {
        // Optimistic update or wait for API
        setIsModalOpen(false);

        try {
            // In a real app we POST to API
            const res = await fetch('/api/segments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(segmentData)
            });
            const newSegment = await res.json();

            // Update local SWR cache
            mutate([...(initialData || []), newSegment], false);
            showToast('Segmen berhasil dibuat');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSegment = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus segmen ini?')) return;

        // Optimistic update
        const newData = initialData.filter(s => s.id !== id);
        mutate(newData, false);

        try {
            await fetch('/api/segments', { method: 'DELETE' });
            showToast('Segmen berhasil dihapus');
        } catch (err) {
            console.error(err);
            mutate(initialData); // Revert on error
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.pageTitle}>Audiens & Segmentasi</h1>
                    <p className={styles.subtitle}>Buat dan kelola segmen audiens untuk kampanye Anda</p>
                </div>
                <button className={styles.createBtn} onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    Buat Segmen
                </button>
            </div>

            <AudiensTable
                segments={initialData || []}
                onDelete={handleDeleteSegment}
            />

            <CreateSegmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateSegment}
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
