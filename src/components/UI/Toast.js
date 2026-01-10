'use client';

import { CheckCircle } from 'lucide-react';
import styles from './UI.module.css';
import { useEffect } from 'react';

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={styles.toast}>
      <CheckCircle size={20} color="var(--success)" />
      <span>{message}</span>
    </div>
  );
}
