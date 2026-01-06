import { Check } from 'lucide-react';
import { useEffect } from 'react';
import styles from '../Profile/Profile.module.css'; // Using shared styles for simplicity

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.toast}>
            <Check size={16} className={styles.checkIcon} />
            <span className={styles.toastText}>{message}</span>
        </div>
    );
}
