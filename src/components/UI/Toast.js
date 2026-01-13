'use client';

import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import styles from './UI.module.css';
import { useEffect } from 'react';

export default function Toast({ message, onClose, type = 'success', duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle size={20} color="#D97706" />;
      case 'error': return <XCircle size={20} color="#DC2626" />;
      case 'success':
      default: return <CheckCircle size={20} color="var(--success)" />;
    }
  };

  const getStyle = () => {
     switch (type) {
      case 'warning': return { borderLeft: '4px solid #D97706' };
      case 'error': return { borderLeft: '4px solid #DC2626' };
      default: return {};
    }
  };

  return (
    <div className={styles.toast} style={getStyle()}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
}
