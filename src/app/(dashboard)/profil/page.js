'use client';

import { useState } from 'react';
import { Camera, User, Mail, Briefcase, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EditProfileModal from '@/components/Profile/EditProfileModal';
import Toast from '@/components/UI/Toast';
import styles from '@/components/Profile/Profile.module.css';

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Default phone number since it's not in our initial auth mock
    const phone = user?.phone || '+62 812-3456-7890';

    const handleSaveProfile = (newData) => {
        updateProfile(newData);
        setIsEditModalOpen(false);
        setShowToast(true);
    };

    if (!user) return null;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Profil</h2>
            <p className={styles.subtitle}>Kelola informasi profil Anda</p>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Informasi Profil</h3>

                <div className={styles.header}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}>{user.avatar || 'A'}</div>
                        <button className={styles.cameraIcon}>
                            <Camera size={14} />
                        </button>
                    </div>
                    <div className={styles.mainInfo}>
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.role}>{user.role}</div>
                        <div className={styles.email}>{user.email}</div>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <div className={styles.label}>
                            <User size={16} />
                            Nama Lengkap
                        </div>
                        <div className={styles.value}>{user.name}</div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.label}>
                            <Mail size={16} />
                            Email
                        </div>
                        <div className={styles.value}>{user.email}</div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.label}>
                            <Briefcase size={16} />
                            Jabatan
                        </div>
                        <div className={styles.value}>{user.role}</div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.label}>
                            <Phone size={16} />
                            Nomor Telepon
                        </div>
                        <div className={styles.value}>{phone}</div>
                    </div>
                </div>

                <button
                    className={styles.editBtn}
                    onClick={() => setIsEditModalOpen(true)}
                >
                    Edit Profil
                </button>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={{ ...user, phone }}
                onSave={handleSaveProfile}
            />

            {showToast && (
                <Toast
                    message="Profil berhasil diperbarui"
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}
